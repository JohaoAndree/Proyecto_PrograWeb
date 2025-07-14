import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'Proyecto_PrograWeb'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
