// vite.demo.config.js
import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

export default defineConfig({
  base: './', // Ensures assets are loaded with relative paths, perfect for GitHub Pages
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    outDir: 'demo-dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
  },
});
