// filepath: /c:/Users/shres/OneDrive/Desktop/dokanma/dokanma-ecommerce/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/dokanma-ecommerce/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
