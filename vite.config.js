// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'demo',              // 👈 sets 'demo' as root
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    open: true
  }
});
