import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import raw from 'vite-plugin-raw'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    raw({
      fileRegex: /\.md$/,
    }),
  ],
})
