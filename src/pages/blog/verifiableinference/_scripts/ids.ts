// Give samples from a provider that doesn't return token ids (OpenRouter) the ids kl.ts --scorer-url needs: each
// logprob position's bytes map back to one token, and the formatted prompt's ids come from a vLLM server
// (return_token_ids) given the same prompt. Check the provider's prompt token count matches first.
//
//   node ids.ts --in parasail-p0.samples.json --tokenizer tokenizer.json \
//     --url https://model.inferx.net/endpoints/v1/chat/completions --key-env INFERX_API_KEY \
//     --model Qwen3.8-27B-FP8 --extra '{"chat_template_kwargs":{"enable_thinking":false}}' --out parasail-p0.ids.json

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

const data = readJson<Samples>(args.in);
const tokenIds = loadTokenIds(args.tokenizer);
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

for (const sample of data.samples) {
  if (sample.promptTokens != promptIds.length) {
    console.error(sample.id, `formatted the prompt as ${sample.promptTokens} tokens, skipped`);
    continue;
  }
  let logprobs = sample.logprobs ?? [];
  // a trailing stop token with no bytes can't be identified, so it isn't scored
  while (logprobs.length && logprobs.at(-1)!.token == '') logprobs = logprobs.slice(0, -1);
  const ids = logprobs.map((t) => tokenIds.get(t.token));
  const missing = ids.filter((id) => id == null).length;
  if (missing) {
    console.error(sample.id, `${missing} tokens without an id, skipped`);
    continue;
  }
  Object.assign(sample, { logprobs, promptIds, ids });
}
data.samples = data.samples.filter((s) => s.ids);
console.error(`${data.samples.length} samples with ids`);
writeJson(args.out, data);
