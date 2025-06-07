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
      // Node.js core module polyfills
      'crypto': 'crypto-browserify',
      'stream': 'readable-stream',
      'assert': 'assert/', // Trailing slash is important
      'buffer': 'buffer/', // Trailing slash is important
      'process': 'process/browser',
      // Optional: Add more if specific errors arise for these
      // 'url': 'url/',
      // 'http': 'stream-http',
      // 'https': 'https-browserify',
      // 'zlib': 'browserify-zlib',
    },
  },
  // Define global variables for Buffer and process, often needed by polyfills
  define: {
    'global.Buffer': 'global.Buffer || require("buffer").Buffer',
    'global.process': 'global.process || require("process/browser")',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      // Optionally, inject Buffer and process for the pre-bundling phase if needed
      // inject: [require.resolve('buffer/'), require.resolve('process/browser')],
    },
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
