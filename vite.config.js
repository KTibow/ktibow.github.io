import fg from "fast-glob";
import { writeFile } from "fs/promises";
import { defineConfig } from "vite";

const html = await fg(["**/*.html", "!build/**/*", "!public/**/*"]);

/** @type {import("vite").Plugin} */
const sitemapPlugin = {
  name: "sitemap-plugin",
  async closeBundle() {
    const blogs = await fg(["blog/**/*.html"]);
    const pages = [...blogs]
      .map(
        (path) => "https://ktibow.github.io/" + path.replace(/index\.html$/, "")
      )
      .join("\n");
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
  plugins: [sitemapPlugin],
});
