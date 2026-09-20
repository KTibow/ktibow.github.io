// Render results from kl.ts as distributions on one chart, one value per response, as an SVG for the post's
// .distribution-chart CSS. --metric picks the value:
//   reference  bits per token the reference needs for the response (its information content, per token)
//   kl         KL divergence per token, from both sides' top 5 plus an "other" bucket at each position
//   routed     like kl, but unlisted provider tokens get the reference's whole leftover mass
//   floored    like kl, but unlisted provider tokens get the reference's 5th logprob
//   mc         reference bits minus the provider's own bits, per token (noisier, can dip below 0)
//
// Two series overlay on one baseline; more than two stack as a ridgeline, one row each, sharing the axis. Give the
// series in the order they should read, best first. --color names an m3 color family per series.
//
//   node render-kl.ts --a fireworks.kl.json --a-label "Fireworks" --b pareto.kl.json --b-label "Pareto" \
//     --metric kl --out kl.svg
//   node render-kl.ts --in inferx.kl.json --label "InferX (itself)" --color neutral \
//     --in kitani.kl.json --label "Kitani" --color error --metric kl --out kitani.svg

import { writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { readJson } from './lib.ts';

const { values: args } = parseArgs({
  options: {
    a: { type: 'string' },
    'a-label': { type: 'string' },
    b: { type: 'string' },
    'b-label': { type: 'string' },
    in: { type: 'string', multiple: true },
    label: { type: 'string', multiple: true },
    color: { type: 'string', multiple: true },
    metric: { type: 'string', default: 'kl' },
    // what to call the model everything was scored under, in the axis label
    'reference-label': { type: 'string', default: 'the real model' },
    // replaces the axis label outright, for when the positions scored need saying
    axis: { type: 'string' },
    // ridgeline only: "shared" keeps one density scale for every row, "row" scales each row to its own peak
    peak: { type: 'string', default: 'shared' },
    // ridgeline only: how much room the row labels need, in the same units as the chart (default: estimated)
    'label-width': { type: 'string' },
    out: { type: 'string' },
  },
});
const ref = args['reference-label'];
const metrics = {
  reference: { key: 'referenceBitsPerToken', axis: `bits per token to compress with ${ref}` },
  kl: { key: 'klBitsPerToken', axis: `KL divergence from ${ref} (bits per token)` },
  routed: { key: 'routedBitsPerToken', axis: `KL divergence from ${ref} (bits per token)` },
  floored: { key: 'flooredBitsPerToken', axis: `KL divergence from ${ref} (bits per token)` },
  mc: { key: 'mcBitsPerToken', axis: `extra bits per token to compress with ${ref}` },
} as const;
const metric = metrics[args.metric as keyof typeof metrics];
if (!metric) throw new Error(`--metric must be one of ${Object.keys(metrics)}`);

const palette = {
  primary: ['primary-container', 'primary'],
  secondary: ['secondary-container', 'secondary'],
  tertiary: ['tertiary-container', 'tertiary'],
  error: ['error-container', 'error'],
  neutral: ['surface-container-highest', 'outline'],
} as const;
const defaultOrder = ['primary', 'tertiary', 'secondary', 'error', 'neutral'] as const;

type KL = { reference: string; responses: Record<string, number>[] };
const inputs = args.a
  ? [
      { file: args.a, label: args['a-label'] },
      { file: args.b!, label: args['b-label'] },
    ]
  : (args.in ?? []).map((file, i) => ({ file, label: args.label?.[i] }));
if (!inputs.length || inputs.some((s) => !s.file || !s.label))
  throw new Error('need --in and --label per series (or the two-series --a/--a-label/--b/--b-label)');

const series = inputs.map(({ file, label }, i) => {
  const name = args.color?.[i] ?? defaultOrder[i % defaultOrder.length];
  const color = palette[name as keyof typeof palette];
  if (!color) throw new Error(`--color must be one of ${Object.keys(palette)}`);
  const kl = readJson<KL>(file);
  return {
    label: label!,
    fill: color[0],
    stroke: color[1],
    xs: kl.responses.map((r) => r[metric.key]),
  };
});

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const sd = (xs: number[]) => Math.sqrt(mean(xs.map((x) => (x - mean(xs)) ** 2)));
// gaussian KDE, Silverman bandwidth
const kde = (xs: number[]) => {
  const sorted = [...xs].sort((a, b) => a - b);
  const iqr = sorted[Math.floor(sorted.length * 0.75)] - sorted[Math.floor(sorted.length * 0.25)];
  const h = 0.9 * Math.min(sd(xs), iqr / 1.34 || sd(xs)) * xs.length ** -0.2;
  const at = (x: number) =>
    xs.reduce((s, xi) => s + Math.exp(-0.5 * ((x - xi) / h) ** 2), 0) /
    (xs.length * h * Math.sqrt(2 * Math.PI));
  return { h, at };
};
for (const s of series)
  console.error(
    `${s.label}: ${s.xs.length} responses, mean ${mean(s.xs).toFixed(4)} bits/token, ` +
      `range ${Math.min(...s.xs).toFixed(4)} to ${Math.max(...s.xs).toFixed(4)}`,
  );

const ridge = series.length > 2;
const W = 16;
const H = 6.5; // overlay height
const R = 1.5; // ridgeline row height
const kdes = series.map((s) => kde(s.xs));
const lo = Math.min(...series.flatMap((s, k) => s.xs.map((x) => x - 3 * kdes[k].h)));
const hi = Math.max(...series.flatMap((s, k) => s.xs.map((x) => x + 3 * kdes[k].h)));
const step = [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5].find(
  (s) => (hi - lo) / s <= 8,
)!;
// bits and KL can't go below 0, so the kernel's tails get cut there; only mc can be negative
const xMin = args.metric == 'mc' ? Math.min(0, Math.floor(lo / step) * step) : 0;
const xMax = Math.ceil(hi / step) * step;
const N = 400;
const grid = Array.from({ length: N + 1 }, (_, i) => xMin + ((xMax - xMin) * i) / N);
const curves = kdes.map((k) => grid.map(k.at));
const peaks = curves.map((c) => Math.max(...c));
const shared = Math.max(...peaks);
const sx = (x: number) => +(((x - xMin) / (xMax - xMin)) * W).toFixed(3);
const decimals = Math.max(0, -Math.floor(Math.log10(step)));

// every row shows its mean; the response count only earns a place when the series don't agree on it
const sameCount = series.every((s) => s.xs.length == series[0].xs.length);
// enough decimals for the smallest mean to keep two significant digits, whatever the axis needs
const meanDecimals = Math.max(2, 1 - Math.floor(Math.log10(Math.min(...series.map((s) => mean(s.xs))))));
const rowLabels = series.map((s) => [
  s.label,
  `mean ${mean(s.xs).toFixed(meanDecimals)}${sameCount ? '' : `, n=${s.xs.length}`}`,
]);
// text is 0.4 units tall and the widest glyphs (tabular digits) run about 0.6em
const labelWidth =
  +(args['label-width'] ?? '0') ||
  Math.max(...rowLabels.flat().map((t) => t.length * 0.24)) + 0.25;
const top = ridge ? -((series.length - 1) * R + 1.4) : -(H + 0.6);
const left = ridge ? -(labelWidth + 0.3) : -0.5;
const lines = [
  `<svg class="distribution-chart" viewBox="${left} ${top} ${W - left + 0.5} ${-top + 1.4}">`,
  `  <line class="axis" x1="0" y1="0" x2="${W}" y2="0"></line>`,
];
for (let x = xMin; x <= xMax + step / 2; x += step) {
  lines.push(`  <line class="axis" x1="${sx(x)}" y1="0" x2="${sx(x)}" y2="0.1"></line>`);
  // + 0 turns -0 into 0 so the label doesn't read "-0.00"
  const label = (+x.toFixed(decimals) + 0).toFixed(decimals);
  lines.push(`  <text x="${sx(x)}" y="0.5" text-anchor="middle">${label}</text>`);
}
lines.push(`  <text x="${W / 2}" y="1.1" text-anchor="middle">${args.axis ?? metric.axis}</text>`);

if (ridge) {
  // one row per series, top to bottom in the order given, the last sitting on the axis
  series.forEach((s, k) => {
    const base = -(series.length - 1 - k) * R;
    const scale = (args.peak == 'row' ? peaks[k] : shared) / (R * 0.83);
    const sy = (d: number) => +(base - d / scale).toFixed(3);
    const edge = `M${grid.map((x, i) => `${sx(x)} ${sy(curves[k][i])}`).join(' L')}`;
    if (base != 0)
      lines.push(`  <line class="axis" x1="0" y1="${base}" x2="${W}" y2="${base}"></line>`);
    lines.push(
      `  <path d="${edge} L${W} ${base} L0 ${base} Z" fill="var(--m3c-${s.fill})" fill-opacity="0.75"></path>`,
    );
    lines.push(
      `  <path d="${edge}" fill="none" stroke="var(--m3c-${s.stroke})" stroke-width="0.04"></path>`,
    );
    lines.push(`  <text x="-0.25" y="${base - 0.52}" text-anchor="end">${rowLabels[k][0]}</text>`);
    lines.push(`  <text x="-0.25" y="${base - 0.06}" text-anchor="end">${rowLabels[k][1]}</text>`);
  });
} else {
  const sy = (d: number) => +((-d / shared) * H * 0.75).toFixed(3);
  series.forEach((s, k) => {
    const edge = `M${grid.map((x, i) => `${sx(x)} ${sy(curves[k][i])}`).join(' L')}`;
    lines.push(
      `  <path d="${edge} L${W} 0 L0 0 Z" fill="var(--m3c-${s.fill})" fill-opacity="0.6"></path>`,
    );
    lines.push(
      `  <path d="${edge}" fill="none" stroke="var(--m3c-${s.stroke})" stroke-width="0.04"></path>`,
    );
  });
  // legend, one row per series (labels can be long), above the curves' peak
  series.forEach((s, k) => {
    const y = -H + k * 0.5;
    lines.push(
      `  <rect x="0" y="${y - 0.3}" width="0.3" height="0.3" fill="var(--m3c-${s.fill})" stroke="var(--m3c-${s.stroke})" stroke-width="0.04"></rect>`,
    );
    lines.push(`  <text x="0.45" y="${y}">${s.label}, ${s.xs.length} responses</text>`);
  });
}
lines.push(`</svg>`);

const svg = lines.join('\n') + '\n';
if (args.out) writeFileSync(args.out, svg);
else process.stdout.write(svg);
