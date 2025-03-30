import fg from "fast-glob";
import { mkdir, writeFile } from "fs/promises";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import("vite").Plugin} */
const sitemapPlugin = {
  name: "sitemap-plugin",
  async closeBundle() {
    const blogs = await fg(["src/routes/blog/**/+page.svelte"]);
    const pages = [...blogs].map(
      (path) => `https://ktibow.github.io/${path.split("/").slice(2, -1).join("/")}/`,
    );
    pages.push("https://ktibow.github.io/");
    pages.push("https://ktibow.github.io/blog/");
    pages.push("https://ktibow.github.io/expertise/");
    try {
      await mkdir("build");
    } catch {}
    await writeFile("build/sitemap.txt", pages.join("\n"));
  },
};

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), sitemapPlugin],
});
