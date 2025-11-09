import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://effective-goggles-x5pv5w6w59jw2vp94-4000.app.github.dev', // backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
