import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom', 'react-dom/client', 'framer-motion', 'gsap', 'lenis'],
  },
  server: {
    port: 5173,
    host: true,
  },
})
