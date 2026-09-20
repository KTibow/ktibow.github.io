// Estimate KL(provider || reference) from the provider's own logprobs (sample.ts with "logprobs":true).
//
//   node kl.ts --in pareto-p0.samples.json --in pareto-p1.samples.json \
//     --model accounts/fireworks/models/glm-5p3-flash --out pareto.kl.json
//
// The provider reported log p(token) for every token it generated. Forcing the same response through the reference
// with echo gives log q(token). Under the provider's own sampling, the average of log p - log q over its tokens is an
// unbiased estimate of KL(provider || reference) per token. Running a reference's own samples through this gives the
// noise floor (batching and numerics make even identical deployments disagree a little).
//
// For a model Fireworks can't echo, --scorer-url scores the samples' exact token ids with any vLLM-compatible
// completions endpoint's prompt_logprobs instead (samples need token ids, see sample.ts):
//
//   node kl.ts --in fireworks-p0.samples.json --scorer-url https://model.inferx.net/endpoints/v1/completions \
//     --scorer-key-env INFERX_API_KEY --tokenizer tokenizer.json --model deepseek-v4.1-flash --out fw.kl.json
//
// The lower-variance estimate (klBitsPerToken) uses both sides' top 5 at each position instead: tokens in both top 5s
// keep their own probabilities, and everything else is one "other" bucket whose mass each side knows (1 minus what it
// listed). KL over those buckets is exact, and never more than the true KL.

import { parseArgs } from 'node:util';
import {
  echoPositions,
  env,
  loadVocab,
  pool,
  promptLogprobPositions,
  readJson,
  STOP_TOKENS,
  writeJson,
  type Position,
  type Samples,
} from './lib.ts';

const { values: args } = parseArgs({
  options: {
    in: { type: 'string', multiple: true },
    model: { type: 'string' },
    'scorer-url': { type: 'string' },
    'scorer-key-env': { type: 'string' },
    // score each response this many times and average the reference's distributions: its run-to-run wobble is
    // measurement noise, not a difference between deployments
    'scorer-repeats': { type: 'string', default: '1' },
    tokenizer: { type: 'string' },
    concurrency: { type: 'string', default: '8' },
    out: { type: 'string' },
  },
});
if (!args.in?.length || !args.model || !args.out) throw new Error('need --in, --model, --out');
const reference = args.model;
const scorerUrl = args['scorer-url'];
if (scorerUrl && (!args['scorer-key-env'] || !args.tokenizer))
  throw new Error('--scorer-url needs --scorer-key-env and --tokenizer');
const scorerKey = scorerUrl && env(args['scorer-key-env']!);
const vocab = scorerUrl && loadVocab(args.tokenizer!);

/** Pairs of matching indices: common prefix and suffix, then an LCS over whatever differs in between. */
const align = (a: string[], b: string[]) => {
  let pre = 0;
  while (pre < a.length && pre < b.length && a[pre] == b[pre]) pre++;
  let suf = 0;
  while (suf < a.length - pre && suf < b.length - pre && a.at(-1 - suf) == b.at(-1 - suf)) suf++;
  const pairs: [number, number][] = Array.from({ length: pre }, (_, i) => [i, i]);
  const n = a.length - pre - suf;
  const m = b.length - pre - suf;
  const dp = new Uint32Array((n + 1) * (m + 1));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i * (m + 1) + j] =
        a[pre + i] == b[pre + j]
          ? dp[(i + 1) * (m + 1) + j + 1] + 1
          : Math.max(dp[(i + 1) * (m + 1) + j], dp[i * (m + 1) + j + 1]);
  for (let i = 0, j = 0; i < n && j < m; ) {
    if (a[pre + i] == b[pre + j]) pairs.push([pre + i++, pre + j++]);
    else if (dp[(i + 1) * (m + 1) + j] >= dp[i * (m + 1) + j + 1]) i++;
    else j++;
  }
  for (let k = suf; k > 0; k--) pairs.push([a.length - k, b.length - k]);
  return pairs;
};

const lookup = (pos: Position, token: string) => pos.top.find(([t]) => t == token)?.[1];

/** Mean of several scorings of the same tokens, in probability space. */
const averagePositions = (runs: Position[][]): Position[] =>
  runs[0].map((first, i) => {
    const top = new Map<string, number>();
    let realized = 0;
    for (const run of runs) {
      realized += Math.exp(run[i].logprob!) / runs.length;
      for (const [t, lp] of run[i].top) top.set(t, (top.get(t) ?? 0) + Math.exp(lp) / runs.length);
    }
    return {
      token: first.token,
      logprob: Math.log(realized),
      top: [...top].sort((a, b) => b[1] - a[1]).map(([t, p]) => [t, Math.log(p)] as [string, number]),
    };
  });

type Top = [string, number][];
// rounded logprobs can make the listed mass reach 1, so keep leftover mass from hitting 0
const leftover = (mass: number) => Math.max(1 - mass, 1e-9);
const listedMass = (top: Top) => top.reduce((s, [, lp]) => s + Math.exp(lp), 0);

// Per-position KL estimates in nats, each using both sides' top 5:
/** Tokens in both top 5s, plus one bucket for everything else. Exact for those buckets, so never above true KL. */
const sharedOtherKl = (pTop: Top, qTop: Top) => {
  const q = new Map(qTop);
  let kl = 0;
  let pShared = 0;
  let qShared = 0;
  for (const [t, lp] of pTop) {
    const lq = q.get(t);
    if (lq == null) continue;
    kl += Math.exp(lp) * (lp - lq);
    pShared += Math.exp(lp);
    qShared += Math.exp(lq);
  }
  const pOther = leftover(pShared);
  const qOther = leftover(qShared);
  return kl + pOther * Math.log(pOther / qOther);
};
/** Provider tokens the reference didn't list get the reference's whole leftover mass; leftovers compared directly. */
const routedKl = (pTop: Top, qTop: Top) => {
  const q = new Map(qTop);
  const qOther = leftover(listedMass(qTop));
  const pOther = leftover(listedMass(pTop));
  let kl = pOther * Math.log(pOther / qOther);
  for (const [t, lp] of pTop) kl += Math.exp(lp) * (lp - (q.get(t) ?? Math.log(qOther)));
  return kl;
};
/** Provider's top 5 only; tokens the reference didn't list get the reference's 5th logprob. */
const flooredKl = (pTop: Top, qTop: Top) => {
  const q = new Map(qTop);
  const floor = Math.min(...qTop.map(([, lq]) => lq));
  return pTop.reduce((s, [t, lp]) => s + Math.exp(lp) * (lp - (q.get(t) ?? floor)), 0);
};

const jobs = args.in.flatMap((path) => {
  const { prompt, url, model, samples } = readJson<Samples>(path);
  return samples
    .filter((s) => s.logprobs?.length && (!scorerUrl || s.ids))
    .map((sample) => ({ prompt, url, model, sample }));
});
if (!jobs.length) throw new Error('no samples with logprobs');

const responses = await pool(jobs, +args.concurrency, async ({ prompt, sample }) => {
  let p = sample.logprobs!;
  let q: Position[];
  let pairs: [number, number][];
  if (vocab) {
    // name the realized token by its id: InferX gives DeepSeek's end of sentence token no bytes
    p = p.map(({ token, logprob, top }, i) => {
      const named = vocab[sample.ids![i]];
      return { token: named, logprob, top: top.map(([t, lp]) => [t == token ? named : t, lp]) };
    });
    // same token ids on both sides, stop token included
    const runs: Position[][] = [];
    for (let i = 0; i < +args['scorer-repeats']; i++)
      runs.push(await promptLogprobPositions(scorerUrl!, scorerKey!, reference, sample, vocab));
    q = runs.length > 1 ? averagePositions(runs) : runs[0];
    if (q.length != p.length) throw new Error(`${sample.id}: ${p.length} logprobs, ${q.length} ids`);
    pairs = p.map((_, i) => [i, i]);
  } else {
    q = await echoPositions(reference, prompt, sample);
    // the reference's last position is the stop decision; the provider's is the stop token it emitted
    const stop = '\u0000stop';
    const pNames = p.map((t, i) => (i == p.length - 1 && STOP_TOKENS.has(t.token) ? stop : t.token));
    const qNames = q.map((t, i) => (i == q.length - 1 ? stop : t.token));
    pairs = align(pNames, qNames);
  }

  let mcBits = 0;
  let klBits = 0;
  let routedBits = 0;
  let flooredBits = 0;
  let pOtherSum = 0;
  let qOtherSum = 0;
  let mismatches = 0;
  let referenceBits = 0;
  let providerBits = 0;
  const perToken: [string, number][] = [];
  // both sides' top 5 at every compared position, so other metrics can be computed without rerunning
  const aligned: { token: string; p: [string, number][]; q: [string, number][] }[] = [];
  for (const [i, j] of pairs) {
    const lp = p[i].logprob!;
    // at the stop position, compare the same stop token the provider emitted
    const lq = q[j].logprob ?? lookup(q[j], p[i].token);
    if (lq == null) continue; // stop token outside the reference's top 5
    const bits = (lp - lq) / Math.LN2;
    mcBits += bits;
    referenceBits -= lq / Math.LN2;
    providerBits -= lp / Math.LN2;
    perToken.push([p[i].token, +bits.toFixed(4)]);
    aligned.push({ token: p[i].token, p: p[i].top, q: q[j].top });
    klBits += sharedOtherKl(p[i].top, q[j].top) / Math.LN2;
    routedBits += routedKl(p[i].top, q[j].top) / Math.LN2;
    flooredBits += flooredKl(p[i].top, q[j].top) / Math.LN2;
    pOtherSum += 1 - listedMass(p[i].top);
    qOtherSum += 1 - listedMass(q[j].top);
    const qListed = new Set(q[j].top.map(([t]) => t));
    if (p[i].top.some(([t]) => !qListed.has(t))) mismatches++;
  }
  const tokens = perToken.length;
  console.error(
    sample.id,
    `${tokens}/${p.length} tokens matched, ${(mcBits / tokens).toFixed(4)} bits/token`,
  );
  return {
    prompt,
    id: sample.id,
    fingerprint: sample.fingerprint,
    tokens,
    unmatched: { provider: p.length - tokens, reference: q.length - tokens },
    mcBits,
    mcBitsPerToken: mcBits / tokens,
    klBitsPerToken: klBits / tokens,
    routedBitsPerToken: routedBits / tokens,
    flooredBitsPerToken: flooredBits / tokens,
    // how much the top-5 estimators have to guess: average unlisted mass, and how often the top 5s differ
    providerOtherMass: pOtherSum / tokens,
    referenceOtherMass: qOtherSum / tokens,
    topMismatchShare: mismatches / tokens,
    // information content of the response, per token, under each side's own logprobs
    referenceBitsPerToken: referenceBits / tokens,
    providerBitsPerToken: providerBits / tokens,
    perToken,
    aligned,
  };
});

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const se = (xs: number[]) => Math.sqrt(mean(xs.map((x) => (x - mean(xs)) ** 2)) / (xs.length - 1));
const totalTokens = responses.reduce((s, r) => s + r.tokens, 0);
console.error(
  `${jobs[0].model} vs ${reference}: ${responses.length} responses, ${totalTokens} tokens\n` +
    `  pooled mc: ${(responses.reduce((s, r) => s + r.mcBits, 0) / totalTokens).toFixed(4)} bits/token\n` +
    `  per response, bits/token:\n` +
    (['mcBitsPerToken', 'klBitsPerToken', 'routedBitsPerToken', 'flooredBitsPerToken'] as const)
      .map((k) => {
        const xs = responses.map((r) => r[k]);
        return `  ${k}: ${mean(xs).toFixed(4)} ± ${se(xs).toFixed(4)} (SE)`;
      })
      .join('\n') +
    `\n  unlisted mass: provider ${mean(responses.map((r) => r.providerOtherMass)).toFixed(4)}, ` +
    `reference ${mean(responses.map((r) => r.referenceOtherMass)).toFixed(4)}; ` +
    `top 5s differ at ${(100 * mean(responses.map((r) => r.topMismatchShare))).toFixed(1)}% of positions`,
);
writeJson(args.out, {
  reference,
  ...(scorerUrl && { scorer: scorerUrl, scorerRepeats: +args['scorer-repeats'] }),
  source: { url: jobs[0].url, model: jobs[0].model },
  responses,
});
