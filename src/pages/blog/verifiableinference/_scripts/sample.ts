// Sample responses to one prompt from any OpenAI-compatible chat endpoint.
//
//   node sample.ts --model accounts/fireworks/models/glm-5p3 --prompt "Name an animal. Just the name." \
//     --n 32 --extra '{"top_p":1,"top_k":0}' --out glm53.samples.json
//   node sample.ts --url https://api.surplusintelligence.ai/v1/chat/completions --key-env SURPLUS_API_KEY \
//     --model glm-5.3 --extra '{"provider":"fusioncode"}' --prompt "..." --n 12 --out fusion.samples.json
//
// Add '"logprobs":true,"top_logprobs":5' to --extra to keep the provider's own logprobs for kl.ts, and
// '"raw_output":true' (Fireworks) or '"return_token_ids":true' (vLLM) to keep token ids for kl.ts --scorer-url.

import { parseArgs } from 'node:util';
import {
  env,
  FIREWORKS_CHAT,
  pool,
  postJson,
  toPosition,
  writeJson,
  type Sample,
  type Samples,
} from './lib.ts';

const { values: args } = parseArgs({
  options: {
    url: { type: 'string', default: FIREWORKS_CHAT },
    'key-env': { type: 'string', default: 'FIREWORKS_API_KEY' },
    model: { type: 'string' },
    prompt: { type: 'string' },
    n: { type: 'string', default: '8' },
    extra: { type: 'string', default: '{}' },
    concurrency: { type: 'string', default: '8' },
    out: { type: 'string' },
  },
});
if (!args.model || !args.prompt || !args.out) throw new Error('need --model, --prompt, --out');
const { url, model, prompt } = args;
const key = env(args['key-env']);
const extra = JSON.parse(args.extra);

// Some providers cache by request body (Fusion Code ignores seed), so every request gets its own max_tokens
const maxTokensBase = 16000 + Math.floor(Math.random() * 10000);

const results = await pool(
  Array.from({ length: +args.n }),
  +args.concurrency,
  async (_, i): Promise<Sample | null> => {
    let resp;
    try {
      resp = await postJson(url, key, {
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 1,
        max_tokens: maxTokensBase + i,
        ...extra,
      });
    } catch (e) {
      // one flaky request shouldn't throw away the rest
      console.error(i, 'failed:', String(e).slice(0, 200));
      return null;
    }
    const choice = resp.choices[0];
    const { message } = choice;
    const logprobs = choice.logprobs?.content;
    const promptIds = resp.prompt_token_ids ?? choice.raw_output?.prompt_token_ids;
    const ids = choice.token_ids ?? choice.raw_output?.completion_token_ids;
    const sample: Sample = {
      id: resp.id ?? null,
      fingerprint: resp.system_fingerprint ?? null,
      reasoning: message.reasoning_content ?? message.reasoning ?? '',
      content: message.content ?? '',
      ...(logprobs && { logprobs: logprobs.map(toPosition) }),
      promptTokens: resp.usage?.prompt_tokens,
      completionTokens: resp.usage?.completion_tokens,
      ...(promptIds && ids && { promptIds, ids }),
    };
    console.error(
      i,
      sample.id,
      `${sample.reasoning.length} reasoning chars`,
      JSON.stringify(sample.content.slice(0, 60)),
    );
    return sample;
  },
);
const samples = results.filter((s) => s != null);
console.error(`${samples.length}/${results.length} succeeded`);
writeJson(args.out, { prompt, url, model, extra, samples } satisfies Samples);
