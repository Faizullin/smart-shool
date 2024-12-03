import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: "assets",
  },
  resolve: {
    alias: {
      "@": "/src",
      "readable-stream": "vite-compatible-readable-stream",
    },
  },
  // define: {
  //   global: {},
  // },
});
