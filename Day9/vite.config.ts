import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
      jsxImportSource: undefined,
      babel: {
        plugins: []
      }
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5175,
    hmr: {
      overlay: true,
    },
  },
});
