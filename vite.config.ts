import { glob } from "tinyglobby";
import { mkdir, writeFile } from "node:fs/promises";
import { defineConfig, type Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";

const sitemapPlugin: Plugin = {
  name: "sitemap-plugin",
  async closeBundle() {
    const pages = [];
    (await glob(["src/routes/blog/**/+page.svelte"])).forEach((path) =>
      pages.push(`https://ktibow.github.io/${path.split("/").slice(2, -1).join("/")}/`),
    );
    (await glob(["src/routes/**/humanresearch/**/+page.svelte"])).forEach((path) => {
      const parts = path.split("/");
      pages.push(`https://ktibow.github.io/blog/humanresearch/${parts.at(-2)}/`);
    });
    pages.push("https://ktibow.github.io/");
    pages.push("https://ktibow.github.io/blog/");
    pages.push("https://ktibow.github.io/blog/humanresearch/");
    pages.push("https://ktibow.github.io/nanoblog/");
    pages.push("https://ktibow.github.io/projects/");
    try {
      await mkdir("build");
    } catch {}
    await writeFile("build/sitemap.txt", pages.join("\n"));
  },
};

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), sitemapPlugin],
});
