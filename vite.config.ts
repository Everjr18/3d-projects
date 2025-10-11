import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'node:path';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
