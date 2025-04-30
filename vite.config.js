import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Vercel buscará esta carpeta por defecto
    sourcemap: false, // Opcional: desactiva sourcemaps para producción
  },
})
