import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

export function flattenSitemapPlugin(): Plugin {
  let rootDirectory = process.cwd();
  let outputDirectory = 'dist';
  let didRegisterHandler = false;

  return {
    name: 'flatten-sitemap-plugin',
    apply: 'build',
    configResolved(config) {
      rootDirectory = config.root;
      outputDirectory = config.build.outDir;
    },
    closeBundle() {
      if (didRegisterHandler) return;
      didRegisterHandler = true;

      process.once('exit', () => {
        const outDirectory = path.resolve(rootDirectory, outputDirectory);
        const firstSitemapPath = path.join(outDirectory, 'sitemap-0.xml');
        if (!fs.existsSync(firstSitemapPath)) return;

        const secondSitemapPath = path.join(outDirectory, 'sitemap-1.xml');
        if (fs.existsSync(secondSitemapPath)) {
          throw new Error(
            `Refusing to flatten sitemap index: found ${secondSitemapPath}. This build produced more than one sitemap chunk.`,
          );
        }

        const sitemapIndexPath = path.join(outDirectory, 'sitemap-index.xml');
        fs.renameSync(firstSitemapPath, sitemapIndexPath);
      });
    },
  };
}
