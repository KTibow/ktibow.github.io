import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { functionsMixins } from "vite-plugin-functions-mixins";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 5173,
  },
  trailingSlash: "always",
  prefetch: true,
  integrations: [mdx(), sitemap({ filter: (p) => !p.includes("noindex") }), svelte()],
  vite: {
    plugins: [functionsMixins()],
  },
});
