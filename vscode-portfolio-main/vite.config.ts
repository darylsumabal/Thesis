import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      // Options for gzip
      algorithm: "gzip",
      threshold: 10240, // Only compress files larger than 10KB
      // Optionally, you can add more settings here
    }),
  ],
});
