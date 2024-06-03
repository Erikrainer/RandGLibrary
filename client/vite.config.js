import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://randglibrary.onrender.com/',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})