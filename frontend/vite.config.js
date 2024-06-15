import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log("Vite configuration loaded");

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group dependencies from node_modules into a vendor chunk
            return 'vendor';
          }
          // Further split large dependencies into separate chunks if needed
          if (id.includes('react')) {
            return 'react';
          }
          if (id.includes('lodash')) {
            return 'lodash';
          }
        }
      }
    }
  }
});