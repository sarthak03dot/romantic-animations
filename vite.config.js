import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  base: '/romantic-animations/',
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'RomanticAnimations',
      fileName: (format) => {
        if (format === 'umd') return 'romantic-animations.umd.js';
        return 'romantic-animations.es.js';
      },
      formats: ['umd', 'es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Ensure tree-shakable ESM build has correct exports
        exports: 'named',
      },
    },
  },
});
