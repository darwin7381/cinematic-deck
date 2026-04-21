import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path: '/cinematic-deck/v2/' on GitHub Pages, '/' on local dev.
// Root GH Pages still serves v1 — we'll eventually publish v2 under /v2/.
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isProduction ? '/cinematic-deck/v2/' : '/',
  server: {
    port: 5180,  // v1 runs on 5173/5174
    strictPort: false,
  },
  build: {
    target: 'es2022',
  },
})
