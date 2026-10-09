import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Mantém as bibliotecas de animação/carrossel fora do bundle principal,
    // melhorando o cache entre deploys.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('swiper') || id.includes('yet-another-react-lightbox')) return 'gallery'
          if (id.includes('framer-motion')) return 'motion'
        },
      },
    },
  },
})
