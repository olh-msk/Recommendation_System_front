import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    https: false,
    proxy: {
      '/api': {
        target: 'https://localhost:7137',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
