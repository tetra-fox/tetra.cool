import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      api: "modern-compiler",
      scss: {
        additionalData: '@use "/src/variables.scss" as *;'
      }
    }
  }
});
