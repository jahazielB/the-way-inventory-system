import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    mkcert()
  ],
  server: {
    https: true,
    host: '0.0.0.0',   // allows access from other devices (0.0.0.0)
    port: 5173    // optional, set port manually if you want
  }
})
