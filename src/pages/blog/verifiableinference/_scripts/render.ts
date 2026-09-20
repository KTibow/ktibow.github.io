// Render a self-compression curve plus one line per suspect response, as an SVG for the post
// (styled by the post's .distribution-chart CSS).
//
//   node render.ts --self glm53.glm53.json --suspect fusion.glm53.json \
//     --self-label "GLM 5.3" --suspect-label "Fusion Code" --out glm53.svg
//
// The curve counts every branch, not just the path each sample went down: at each position, every top-5 token
// (plus the leftover mass) is a possible outcome costing -log2 p bits. Convolving those per-position histograms
// along a path gives that path's distribution of total bits, and the curve averages that over all self paths.

import { writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { readJson, type Position, type Scored } from './lib.ts';

const { values: args } = parseArgs({
  options: {
    self: { type: 'string' },
    suspect: { type: 'string' },
    'self-label': { type: 'string' },
    'suspect-label': { type: 'string' },
    // pin the x-axis so several charts share a scale
    'x-max': { type: 'string' },
    out: { type: 'string' },
  },
});
if (!args.self || !args.suspect || !args['self-label'] || !args['suspect-label'])
  throw new Error('need --self, --suspect, --self-label, --suspect-label');
const self = readJson<Scored>(args.self);
const suspect = readJson<Scored>(args.suspect);
if (self.scorer != suspect.scorer)
  throw new Error(`scored by ${self.scorer} and ${suspect.scorer}`);

const BW = 0.1; // bits per bin
const MAX_BITS = 1000;

const stepDist = (top: [string, number][]) => {
  const ps = top.map(([, lp]) => Math.exp(lp));
  const vals = top.map(([, lp]) => -lp / Math.LN2);
  const rest = 1 - ps.reduce((a, b) => a + b, 0);
  if (rest > 1e-9) {
    // unlisted tokens are each at most as likely as the 5th: price them at its surprisal (a lower bound)
    ps.push(rest);
    vals.push(Math.max(...vals));
  }
  // rounded logprobs can overshoot 1 slightly, which compounds over hundreds of positions
  const total = ps.reduce((a, b) => a + b, 0);
  return { vals, ps: ps.map((p) => p / total) };
};

const pathPmf = (positions: Position[]) => {
  const size = MAX_BITS / BW;
  let pmf = new Float64Array(size);
  pmf[0] = 1;
  let reach = 1; // bins that can hold mass so far
  for (const { top } of positions) {
    const { vals, ps } = stepDist(top);
    const next = new Float64Array(size);
    for (let k = 0; k < vals.length; k++) {
      const lo = Math.floor(vals[k] / BW);
      const frac = vals[k] / BW - lo; // split mass between neighbouring bins
      for (let j = 0; j < reach && j + lo + 1 < size; j++) {
        next[j + lo] += ps[k] * (1 - frac) * pmf[j];
        next[j + lo + 1] += ps[k] * frac * pmf[j];
      }
    }
    reach = Math.min(size, reach + Math.ceil(Math.max(...vals) / BW) + 1);
    pmf = next;
  }
  return pmf;
};

// mixture over self paths, as a density per bit
const density = new Float64Array(MAX_BITS / BW);
for (const path of self.paths) {
  const pmf = pathPmf(path.positions);
  for (let i = 0; i < density.length; i++) density[i] += pmf[i] / self.paths.length / BW;
}
const x = (i: number) => i * BW;
const mean = density.reduce((s, d, i) => s + x(i) * d * BW, 0);
const sd = Math.sqrt(density.reduce((s, d, i) => s + (x(i) - mean) ** 2 * d * BW, 0));
const cdf: number[] = [];
density.reduce((s, d, i) => (cdf[i] = s + d * BW), 0);
const quantile = (q: number) => x(cdf.findIndex((c) => c >= q));
// share at or above each bin, summed from the right so tiny tails don't cancel out
const survival = new Float64Array(density.length);
for (let i = density.length - 1, s = 0; i >= 0; i--) survival[i] = s += density[i] * BW;

const suspectBits = suspect.paths.map((p) => p.bits).sort((a, b) => a - b);
console.error(
  `${args['self-label']} self-compression under ${self.scorer} (${self.paths.length} paths): ` +
    `mean ${mean.toFixed(1)} bits, sd ${sd.toFixed(1)}, 5-95% ${quantile(0.05).toFixed(1)}-${quantile(0.95).toFixed(1)}`,
);
for (const bits of suspectBits) {
  const share = survival[Math.min(Math.floor(bits / BW), survival.length - 1)];
  console.error(
    `  ${args['suspect-label']} ${bits.toFixed(1)} bits: ${share.toExponential(2)} of the curve at or above, ` +
      `${((bits - mean) / sd).toFixed(1)} sd`,
  );
}

// display only: 1-bit gaussian smoothing hides the 0.1-bit lattice from near-certain positions
const kernel = Array.from({ length: 81 }, (_, k) => Math.exp(-0.5 * ((k - 40) * BW) ** 2));
const kernelSum = kernel.reduce((a, b) => a + b, 0);
const shown = density.map((_, i) =>
  kernel.reduce((s, w, k) => s + (w / kernelSum) * (density[i + k - 40] ?? 0), 0),
);

// layout, in the same units as the post's other .distribution-chart (0.4 unit text)
const W = 16;
const H = 6.5;
const top = Math.max(quantile(0.999), ...suspectBits) * 1.03;
const step = [5, 10, 20, 25, 50, 100, 200, 250, 500].find((s) => +(args['x-max'] ?? top) / s <= 8)!;
const xMax = args['x-max'] ? +args['x-max'] : Math.ceil(top / step) * step;
const peak = Math.max(...shown);
const sx = (bits: number) => +((bits / xMax) * W).toFixed(3);
const sy = (d: number) => +((-d / peak) * H * 0.7).toFixed(3);

const points: string[] = [];
for (let bits = 0; bits <= xMax; bits += 0.5)
  points.push(`${sx(bits)} ${sy(shown[Math.round(bits / BW)])}`);
const edge = `M${points.join(' L')}`;

const lines = [
  `<svg class="distribution-chart" viewBox="-0.5 ${-(H + 0.6)} ${W + 1} ${H + 2}">`,
  `  <line class="axis" x1="0" y1="0" x2="${W}" y2="0"></line>`,
];
for (let bits = 0; bits <= xMax; bits += step) {
  lines.push(`  <line class="axis" x1="${sx(bits)}" y1="0" x2="${sx(bits)}" y2="0.1"></line>`);
  lines.push(`  <text x="${sx(bits)}" y="0.5" text-anchor="middle">${bits}</text>`);
}
lines.push(`  <text x="${W / 2}" y="1.1" text-anchor="middle">information content (bits)</text>`);
lines.push(`  <path d="${edge} L${W} 0 L0 0 Z" fill="var(--m3c-primary-container)"></path>`);
lines.push(
  `  <path d="${edge}" fill="none" stroke="var(--m3c-primary)" stroke-width="0.04"></path>`,
);
const lineTop = -H * 0.85;
for (const bits of suspectBits) {
  lines.push(
    `  <line x1="${sx(bits)}" y1="0" x2="${sx(bits)}" y2="${lineTop}" stroke="var(--m3c-tertiary)" stroke-width="0.04"></line>`,
  );
}
// legend row above the tops of the lines, so labels never collide with the data
const ly = -H;
lines.push(
  `  <rect x="0" y="${ly - 0.3}" width="0.3" height="0.3" fill="var(--m3c-primary-container)" stroke="var(--m3c-primary)" stroke-width="0.04"></rect>`,
);
lines.push(`  <text x="0.45" y="${ly}">${args['self-label']} self-compression</text>`);
lines.push(
  `  <line x1="${W / 2 + 0.15}" y1="${ly - 0.33}" x2="${W / 2 + 0.15}" y2="${ly + 0.03}" stroke="var(--m3c-tertiary)" stroke-width="0.04"></line>`,
);
lines.push(
  `  <text x="${W / 2 + 0.45}" y="${ly}">${args['suspect-label']}, ${suspectBits.length} responses</text>`,
);
lines.push(`</svg>`);

const svg = lines.join('\n') + '\n';
if (args.out) writeFileSync(args.out, svg);
else process.stdout.write(svg);
