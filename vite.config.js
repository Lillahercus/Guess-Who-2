import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // ide nem szükséges explicit external hozzáadás, hacsak nem akarsz valamit kizárni
    }
  },
  base: './',  // Fontos, hogy relatív base legyen buildhez
})
