import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        solarSystem: resolve(__dirname, 'solar-system.html'),
        primitives: resolve(__dirname, 'primitives.html'),
        objects3d: resolve(__dirname, 'objects-3d.html'),
        minecraftSkin: resolve(__dirname, 'minecraft-skin.html'),
      },
    },
  },
});
