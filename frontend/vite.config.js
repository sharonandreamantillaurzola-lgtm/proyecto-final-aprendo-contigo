import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En desarrollo, el proxy reenvía /api al backend (que corre en :3000).
// En producción, Express sirve la carpeta dist/ y monta la API en /api.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
