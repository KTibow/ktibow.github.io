import fg from "fast-glob";
import { mkdir, writeFile } from "fs/promises";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const html = await fg(["**/*.html", "!build/**/*", "!public/**/*"]);

/** @type {import("vite").Plugin} */
const sitemapPlugin = {
  name: "sitemap-plugin",
  async closeBundle() {
    const blogs = await fg(["blog/**/*.html"]);
    const pages = [...blogs]
      .map(
        (path) =>
          "https://ktibow.github.io/" + path.replace(/index\.html$/, ""),
      )
      .join("\n");
    try {
      await mkdir("build");
    } catch {}
    await writeFile("build/sitemap.txt", pages);
  },
};

export default defineConfig({
  appType: "mpa",
  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {
      input: html,
    },
  },
  plugins: [sitemapPlugin, tailwindcss()],
});
