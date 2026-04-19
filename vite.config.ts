import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path: '/cinematic-deck/' on GitHub Pages, '/' on local dev
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isProduction ? '/cinematic-deck/' : '/',
})
