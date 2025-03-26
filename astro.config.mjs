// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  outDir: './dist',
  vite: {
    build: {
      rollupOptions: {
        preserveEntrySignatures: 'strict',
      }
    },
    plugins: [tailwindcss()]
  }
});