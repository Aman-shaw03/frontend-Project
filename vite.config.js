import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api": "http://localhost:8000/api/v1",
      // now every api request that hit on /api will be redirect to this localhost 8000
    }
  }
})
