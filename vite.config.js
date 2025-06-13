import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    strictPort: false // Allows fallback to another port if 3000 is taken
  },
  preview: {
    port: 3000,
    open: true
  },
  base: '/'
})