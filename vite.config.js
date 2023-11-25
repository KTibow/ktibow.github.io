import { defineConfig } from "vite";
import fg from "fast-glob";

const html = await fg(["**/*.html", "!build/**/*", "!public/**/*"]);
export default defineConfig({
  appType: "mpa",
  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {
      input: html,
    },
  },
});
