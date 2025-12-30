import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // polyfill global
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,   // polyfill Buffer
          process: true,  // polyfill process
        }),
      ],
    },
  },
  server: {
    port: 3000,  // <--- add this to run Vite dev server on port 3000
  },
});
