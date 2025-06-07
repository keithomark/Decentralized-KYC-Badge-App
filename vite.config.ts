import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false // Disable error overlay for better performance
    }
  },
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      '@solana/web3.js',
      '@metaplex-foundation/js',
      '@civic/auth-web3',
      '@civic/auth-web3/react',
      'react',
      'react-dom',
      'react-router-dom'
    ],
    exclude: ['@civic/auth-web3/dist']
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            '@solana/web3.js',
            '@metaplex-foundation/js'
          ],
          'civic': ['@civic/auth-web3', '@civic/auth-web3/react']
        }
      }
    }
  }
});
