import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://task-manager-5is3.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'https://task-manager-5is3.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // Ensures correct path resolution for assets
})
