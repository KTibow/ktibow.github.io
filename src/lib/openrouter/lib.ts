import type { Data, Meta, ProviderData } from './fetch.ts';
import rawData from './data.json';
import { formatTokens } from './format.ts';
import { providers, type ProviderKey } from './providers.ts';

export { formatTokens, providers, type ProviderKey };
export const data = rawData as unknown as Data;

/** OpenRouter's snapshot of a provider, if it's (or was) on OpenRouter */
export const usageOf = (key: ProviderKey): ProviderData | undefined => {
  const slug = providers[key].orSlug;
  return slug ? data.providers[slug] : undefined;
};

/** Badges with something to show open a dialog; the rest just link to the provider's site */
export const hasDialog = (key: ProviderKey) => !!usageOf(key) || 'blurb' in providers[key];
export const dialogId = (key: ProviderKey) => `provider-${key}`;

/**
 * Which badges a page rendered, so <ProviderDialogs /> only renders their dialogs. Lives on
 * Astro.locals, which is per page.
 */
export const dialogRegistry = (locals: object) =>
  ((locals as { providerDialogs?: { used: Set<ProviderKey>; rendered: boolean } }).providerDialogs ??=
    { used: new Set(), rendered: false });

const regions = new Intl.DisplayNames(['en'], { type: 'region' });
const region = (code: string) => {
  try {
    return regions.of(code) ?? code;
  } catch {
    return code;
  }
};
export const dateLabel = (iso: string) =>
  new Date(iso.slice(0, 10) + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

export const modelName = (permaslug: string) => {
  const [base, variant] = permaslug.split(':');
  const known = data.modelNames[base];
  // "DeepSeek: DeepSeek V4.1 Flash" -> "DeepSeek V4.1 Flash"; unknown ids lose their date suffix
  const name = known
    ? known.replace(/^[^:]+: /, '')
    : base
        .split('/')
        .pop()!
        .replace(/-\d{8}$/, '');
  return variant && !name.includes(`(${variant})`) ? `${name} (${variant})` : name;
};

/** Public id ("deepseek/deepseek-v4.1-flash") for a permaslug ("deepseek/deepseek-v4.1-flash-20260910") */
export const modelId = (permaslug: string) => {
  const base = permaslug.split(':')[0];
  return data.modelIds?.[base] ?? base.replace(/-\d{8}$/, '');
};

// Volume helpers, for claims in prose. OpenRouter's provider chart only names a provider's top
// models each day and lumps the rest into "Others", so anything filtered by model is a lower bound.

/**
 * Public ids or permaslugs (variants like ":free" match their base model), or a predicate on the
 * permaslug. "Others" never matches.
 */
export type ModelFilter = string | string[] | ((permaslug: string) => boolean);
export type VolumeQuery = {
  models?: ModelFilter;
  /** Inclusive YYYY-MM-DD bounds */
  from?: string;
  to?: string;
};

export const modelMatcher = (filter?: ModelFilter): ((permaslug: string) => boolean) => {
  if (!filter) return () => true;
  if (typeof filter == 'function') return (m) => m != 'Others' && filter(m);
  const wanted = new Set(typeof filter == 'string' ? [filter] : filter);
  return (m) =>
    m != 'Others' && (wanted.has(m) || wanted.has(m.split(':')[0]) || wanted.has(modelId(m)));
};

/** Days with data in range, oldest first */
export const daysOf = (key: ProviderKey, { from, to }: VolumeQuery = {}) =>
  Object.keys(usageOf(key)?.usage ?? {})
    .sort()
    .filter((d) => (!from || d >= from) && (!to || d <= to));

/** Tokens per day in range, after the model filter */
export const dailySeries = (key: ProviderKey, q: VolumeQuery = {}) => {
  const usage = usageOf(key)?.usage ?? {};
  const match = modelMatcher(q.models);
  return daysOf(key, q).map((date) => ({
    date,
    tokens: Object.entries(usage[date])
      .filter(([m]) => match(m))
      .reduce((a, [, v]) => a + v, 0),
  }));
};

export const totalTokens = (key: ProviderKey, q: VolumeQuery = {}) =>
  dailySeries(key, q).reduce((a, d) => a + d.tokens, 0);

/** Mean tokens/day over the days in range that have data */
export const averageDailyTokens = (key: ProviderKey, q: VolumeQuery = {}) => {
  const days = dailySeries(key, q);
  return days.length ? days.reduce((a, d) => a + d.tokens, 0) / days.length : undefined;
};

/** Mean over the last `days` days with data */
export const recentDailyTokens = (key: ProviderKey, days = 7, q: Omit<VolumeQuery, 'from'> = {}) => {
  const recent = daysOf(key, q).slice(-days);
  return recent.length ? averageDailyTokens(key, { ...q, from: recent[0] }) : undefined;
};

/** Fraction of the provider's tokens in range that matched the model filter */
export const shareOf = (key: ProviderKey, q: VolumeQuery) => {
  const all = totalTokens(key, { ...q, models: undefined });
  return all ? totalTokens(key, q) / all : undefined;
};

/** Last day with any tokens, e.g. to date a delisting */
export const lastActiveDay = (key: ProviderKey) =>
  dailySeries(key)
    .filter((d) => d.tokens > 0)
    .at(-1)?.date;

// Worded like OpenRouter's own provider list
const dataPolicy = (m: Meta) => {
  if (m.training) return 'Trains';
  if (m.retainsPrompts == false) return 'ZDR';
  if (m.retentionDays) return `${m.retentionDays} day retention`;
  return 'Retention for unknown length';
};

/** The at-a-glance facts: shown on hover, at the top of the dialog, and as the no-JS title */
export const basics = (key: ProviderKey): { rows: [string, string][]; source?: string } => {
  const p = usageOf(key);
  if (!p) return { rows: [] };
  const m = p.meta;
  const rows: [string, string][] = [
    ['Headquarters', m.headquarters ? region(m.headquarters) : 'Not listed'],
    ['Datacenters', m.datacenters ? m.datacenters.map(region).join(', ') : 'Not listed'],
    ['Data policy', dataPolicy(m)],
  ];
  // A delisted provider's last days are zeros, so average the week before its traffic stopped
  const last = lastActiveDay(key);
  const daily = recentDailyTokens(key, 7, { to: last });
  if (daily != undefined) rows.push(['Volume', `${formatTokens(daily)} tokens/day (7-day avg)`]);
  if (p.delistedSince) rows.push(['Delisted', last ? `Last traffic ${dateLabel(last)}` : 'Yes']);
  return { rows, source: `Per OpenRouter, ${dateLabel(p.metaFetchedAt)}` };
};

export const plainSummary = (key: ProviderKey) => {
  const info = providers[key];
  const { rows, source } = basics(key);
  return rows.length
    ? [source + ':', ...rows.map(([k, v]) => `${k}: ${v}`)].join('\n')
    : 'blurb' in info
      ? info.blurb
      : '';
};
