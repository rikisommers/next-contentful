import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AwComponents',
      fileName: (format) => `aw-components.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'Lit'
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});