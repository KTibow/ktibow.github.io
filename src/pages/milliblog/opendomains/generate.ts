import { execSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const tmpDir = '/tmp/open-domains-register';
execSync(
  `if [ -d ${tmpDir}/.git ]; then git -C ${tmpDir} pull; else rm -rf ${tmpDir} && git clone --depth 1 https://github.com/open-domains/register ${tmpDir}; fi`,
  {
    stdio: 'inherit',
  },
);

const domainsDir = join(tmpDir, 'domains');
const entries = readdirSync(domainsDir, { withFileTypes: true });
const domains = entries
  .filter((e) => e.isFile() && !e.name.includes('_') && !e.name.startsWith('*'))
  .map((e) => e.name.replace(/\.json$/, ''))
  .sort();

const outPath = join(import.meta.dirname, 'domains.txt');
writeFileSync(outPath, domains.join('\n') + '\n');
console.log(`Wrote ${domains.length} domains to ${outPath}`);
