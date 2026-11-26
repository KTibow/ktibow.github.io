// Snapshot what OpenRouter says about each provider in providers.ts into data.json.
//
//   node src/lib/openrouter/fetch.ts
//
// Keyless GETs only. Re-running merges into the existing file instead of replacing it: a provider
// OpenRouter no longer lists keeps its last metadata (and gets delistedSince), and usage days are
// merged by date, so history can outlive OpenRouter's 90-day window and a shut-down provider.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { providers } from './providers.ts';

const OUT = new URL('./data.json', import.meta.url);
const UA = 'ktibow.github.io provider stats fetch';

export type Meta = {
  name: string;
  headquarters: string | null;
  datacenters: string[] | null;
  privacyPolicyUrl: string | null;
  termsOfServiceUrl: string | null;
  statusPageUrl: string | null;
  training: boolean | null;
  retainsPrompts: boolean | null;
  retentionDays: number | null;
  zdrEndpoints: number;
};
export type ProviderData = {
  meta: Meta;
  metaFetchedAt: string;
  /** First fetch that found the provider missing from OpenRouter's list, not the delisting itself */
  delistedSince?: string;
  /** date -> model permaslug (or "Others") -> tokens; full UTC days only */
  usage: Record<string, Record<string, number>>;
  usageFetchedAt?: string;
};
export type Data = {
  fetchedAt: string;
  /** keyed by OpenRouter provider slug */
  providers: Record<string, ProviderData>;
  /** model permaslug -> display name, kept after models are delisted too */
  modelNames: Record<string, string>;
  /** model permaslug -> public id ("deepseek/deepseek-v4.1-flash"), also kept after delisting */
  modelIds: Record<string, string>;
};

let last = 0;
const get = async (path: string) => {
  const wait = last + 350 - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  for (let attempt = 0; ; attempt++) {
    last = Date.now();
    const r = await fetch('https://openrouter.ai' + path, {
      headers: { 'user-agent': UA, accept: 'application/json' },
    });
    if (r.ok) return ((await r.json()) as { data: any }).data;
    if (r.status == 404) return undefined;
    if (attempt < 3 && (r.status == 429 || r.status >= 500)) {
      await new Promise((res) => setTimeout(res, 3000 * (attempt + 1)));
      continue;
    }
    throw new Error(`${r.status} on ${path}`);
  }
};

const now = new Date().toISOString();
const today = now.slice(0, 10);
const old: Data = existsSync(OUT)
  ? JSON.parse(readFileSync(OUT, 'utf8'))
  : { fetchedAt: now, providers: {}, modelNames: {}, modelIds: {} };
const data: Data = {
  fetchedAt: now,
  providers: {},
  modelNames: { ...old.modelNames },
  modelIds: { ...old.modelIds },
};

const listed: any[] = await get('/api/v1/providers');
const frontend: any[] = await get('/api/frontend/v1/all-providers');
const zdr: any[] = await get('/api/v1/endpoints/zdr');
// Variants (":free", batch, ...) share a canonical slug; name it after the plain id
const models: any[] = await get('/api/v1/models');
for (const m of models.toSorted((a, b) => b.id.length - a.id.length)) {
  data.modelNames[m.canonical_slug] = m.name;
  data.modelIds[m.canonical_slug] = m.id;
}

for (const info of Object.values(providers)) {
  const slug = info.orSlug;
  if (!slug) continue;
  const prev = old.providers[slug];
  const l = listed.find((p) => p.slug == slug);
  const f = frontend.find((p) => p.slug == slug);

  let entry: ProviderData;
  if (l && f) {
    entry = {
      meta: {
        name: f.displayName ?? l.name,
        headquarters: l.headquarters ?? null,
        datacenters: l.datacenters?.length ? l.datacenters : null,
        privacyPolicyUrl: l.privacy_policy_url ?? null,
        termsOfServiceUrl: l.terms_of_service_url ?? null,
        statusPageUrl: l.status_page_url ?? null,
        training: f.dataPolicy?.training ?? null,
        retainsPrompts: f.dataPolicy?.retainsPrompts ?? null,
        retentionDays: f.dataPolicy?.retentionDays ?? null,
        zdrEndpoints: zdr.filter((e) => e.tag.split('/')[0] == slug).length,
      },
      metaFetchedAt: now,
      usage: {},
    };
  } else if (prev) {
    console.warn(`${slug}: not listed anymore, keeping metadata from ${prev.metaFetchedAt}`);
    entry = { ...prev, delistedSince: prev.delistedSince ?? now, usage: {} };
  } else {
    console.warn(`${slug}: not listed and no earlier snapshot, skipping`);
    continue;
  }

  const chart = await get(`/api/frontend/v1/stats/provider-token-chart?provider=${slug}`);
  const days: Record<string, Record<string, number>> = {};
  for (const { x, ys } of chart?.chartData ?? []) {
    const date = x.slice(0, 10);
    if (date < today) days[date] = ys; // today is still partial
  }
  // Newer days win; days OpenRouter no longer returns are kept from the old file.
  entry.usage = Object.fromEntries(
    Object.entries({ ...prev?.usage, ...days }).sort(([a], [b]) => a.localeCompare(b)),
  );
  if (Object.keys(days).length) entry.usageFetchedAt = now;
  else if (prev?.usageFetchedAt) entry.usageFetchedAt = prev.usageFetchedAt;

  data.providers[slug] = entry;
  console.log(slug, Object.keys(entry.usage).length, 'days');
}

writeFileSync(OUT, JSON.stringify(data, null, 1) + '\n');
