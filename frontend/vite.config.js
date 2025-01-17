import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/',
  server: {
    port: 5173,
    open: true,
    host: true, // Add this to allow network access
    strictPort: true, // Don't try another port if 5173 is taken
    proxy: {
      // Add proxy configuration if you need to call your backend
      '/api': {
        target: 'http://localhost:3000', // Your Express server URL
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clean the output directory before build
  },
});




