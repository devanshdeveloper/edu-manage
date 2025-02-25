import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import Markdown from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Markdown.plugin({
      mode: ["html", "toc", "markdown"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
