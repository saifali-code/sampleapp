import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  preview: { port: 4173 },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2019",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Long-lived vendor chunks cache well between deploys; three.js only loads on the home page.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          three: ["three"],
          emailjs: ["@emailjs/browser"]
        }
      }
    }
  }
});
