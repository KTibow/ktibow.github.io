// Give thinking-mode samples the ids kl.ts --scorer-url needs when the provider only returns logprobs for the answer
// after </think> (most OpenRouter providers). The reasoning is re-encoded with the model's own tokenizer to rebuild
// the context, and every sample is checked against the provider's own token counts before it is kept.
//
//   node ids-think.ts --in deepseek-think-p0.samples.json --tokenizer tokenizer.json \
//     --url https://model.inferx.net/endpoints/v1/chat/completions --key-env INFERX_API_KEY \
//     --model deepseek-v4.1-flash --out deepseek-think-p0.ids.json

import { execFileSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { env, loadTokenIds, postJson, readJson, writeJson, type Samples } from './lib.ts';

const { values: args } = parseArgs({
  options: {
    in: { type: 'string' },
    tokenizer: { type: 'string' },
    url: { type: 'string' },
    'key-env': { type: 'string' },
    model: { type: 'string' },
    extra: { type: 'string', default: '{}' },
    out: { type: 'string' },
  },
});
if (!args.in || !args.tokenizer || !args.url || !args['key-env'] || !args.model || !args.out)
  throw new Error('need --in, --tokenizer, --url, --key-env, --model, --out');

/** Encode with the real tokenizer, since a token sequence can't be recovered from text any other way. */
const encode = (texts: string[]): number[][] => {
  const script = `
import json, sys
from tokenizers import Tokenizer
tok = Tokenizer.from_file(sys.argv[1])
texts = json.load(sys.stdin)
json.dump([tok.encode(t, add_special_tokens=False).ids for t in texts], sys.stdout)
`;
  const out = execFileSync(
    'uv',
    ['run', '--quiet', '--with', 'tokenizers', 'python', '-c', script, args.tokenizer!],
    { input: JSON.stringify(texts), maxBuffer: 1 << 28 },
  );
  return JSON.parse(out.toString());
};

const data = readJson<Samples>(args.in);
const endOfThink = loadTokenIds(args.tokenizer).get('</think>');
if (endOfThink == null) throw new Error('no </think> in the tokenizer');

const resp = await postJson(args.url, env(args['key-env']), {
  model: args.model,
  messages: [{ role: 'user', content: data.prompt }],
  max_tokens: 1,
  return_token_ids: true,
  ...JSON.parse(args.extra),
});
const promptIds = resp.prompt_token_ids;
if (!promptIds) throw new Error('no prompt_token_ids in the response');
console.error(`${promptIds.length} prompt tokens`);

/** Where the answer starts and ends in a sample's logprobs: the run of positions that spells out the content. */
const answers = data.samples.map((s) => {
  const all = s.logprobs ?? [];
  // a provider that ends on a stop token lists it after the content, and it isn't part of the answer
  for (const end of [all.length, all.length - 1]) {
    for (let start = end - 1; start >= 0; start--) {
      const text = all
        .slice(start, end)
        .map((p) => p.token)
        .join('');
      if (text == s.content) return { start, end };
      if (text.length > s.content.length) break;
    }
  }
  return null;
});

// samples that already carry an id per logprob position need no re-encoding: split their own ids at </think>
const needsEncoding = (s: (typeof data.samples)[number]) =>
  !(s.ids && s.logprobs && s.ids.length == s.logprobs.length);
const encoded = encode(
  data.samples.flatMap((s) => (needsEncoding(s) ? [s.reasoning, s.content] : ['', ''])),
);
data.samples = data.samples.filter((sample, i) => {
  const span = answers[i];
  const say = (why: string) => (console.error(sample.id, why + ', skipped'), false);
  if (!span) return say("the logprobs don't spell out the content");
  const answer = sample.logprobs!.slice(span.start, span.end);
  // however the prompt length is known, it has to be the template this scorer will use
  const declared = sample.promptIds?.length ?? sample.promptTokens;
  if (declared != null && declared != promptIds.length)
    return say(`formatted the prompt as ${declared} tokens`);

  let context: number[];
  let contentIds: number[];
  if (needsEncoding(sample)) {
    const [reasoningIds, encodedContent] = [encoded[2 * i], encoded[2 * i + 1]];
    context = [...reasoningIds, endOfThink];
    contentIds = encodedContent;
    // the provider's own count is the check on the re-encoded reasoning; a trailing stop token may or may not count
    const generated = context.length + contentIds.length;
    const slack = (sample.completionTokens ?? generated) - generated;
    if (slack != 0 && slack != 1)
      return say(`re-encodes to ${generated} tokens, provider counted ${sample.completionTokens}`);
  } else {
    context = sample.ids!.slice(0, span.start);
    contentIds = sample.ids!.slice(span.start, span.end);
    if (context.at(-1) != endOfThink) return say('the answer does not start after </think>');
  }
  if (contentIds.length != answer.length)
    return say(`the answer is ${answer.length} logprobs but ${contentIds.length} tokens`);
  Object.assign(sample, { promptIds: [...promptIds, ...context], ids: contentIds, logprobs: answer });
  return true;
});
console.error(`${data.samples.length} samples with ids`);
writeJson(args.out, data);
