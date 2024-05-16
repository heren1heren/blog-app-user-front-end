import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
const __dirname = import.meta.dirname;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },

  test: { globals: true, setupFiles: './tests/setup.js', environment: 'jsdom' },
});
