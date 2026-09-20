// Force sampled responses through a Fireworks model and save every scored position's top 5 logprobs.
// Score a model's own samples under itself to get a self-compression curve.
//
//   node score.ts --in fusion.samples.json --model accounts/fireworks/models/glm-5p3 --out fusion.glm53.json

import { parseArgs } from 'node:util';
import {
  echoPositions,
  pool,
  readJson,
  realizedBits,
  writeJson,
  type Samples,
  type Scored,
} from './lib.ts';

const { values: args } = parseArgs({
  options: {
    in: { type: 'string' },
    model: { type: 'string' },
    // a response with no reasoning can't be compared against a thinking model's curve
    'keep-no-reasoning': { type: 'boolean', default: false },
    concurrency: { type: 'string', default: '8' },
    out: { type: 'string' },
  },
});
if (!args.in || !args.model || !args.out) throw new Error('need --in, --model, --out');
const scorer = args.model;
const { prompt, url, model, samples } = readJson<Samples>(args.in);

const kept = args['keep-no-reasoning'] ? samples : samples.filter((s) => s.reasoning);
if (kept.length < samples.length)
  console.error(`skipping ${samples.length - kept.length} without reasoning`);

const paths = await pool(kept, +args.concurrency, async (sample) => {
  const positions = await echoPositions(scorer, prompt, sample);
  const bits = realizedBits(positions);
  console.error(sample.id, `${bits.toFixed(1)} bits over ${positions.length} positions`);
  return { id: sample.id, bits, positions };
});
writeJson(args.out, { prompt, scorer, source: { url, model }, paths } satisfies Scored);
