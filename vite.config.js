// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'RomanticAnimations', // this becomes window.RomanticAnimations
      fileName: 'romantic-animations',
      formats: ['umd']
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
