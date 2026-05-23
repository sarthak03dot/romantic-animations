import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { readFileSync } from 'fs';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
);

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist'
    })
  ],

  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },

  build: {
    lib: {
      entry: 'src/index.js',
      name: 'RomanticAnimations',
      fileName: (format) =>
        format === 'umd'
          ? 'romantic-animations.umd.js'
          : 'romantic-animations.es.js',
      formats: ['es', 'umd'],
    },

    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',

    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
});