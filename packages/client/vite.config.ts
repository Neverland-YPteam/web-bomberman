import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@organisms': path.resolve(__dirname, './src/components/organisms'),
      '@molecules': path.resolve(__dirname, './src/components/molecules'),
      '@atoms': path.resolve(__dirname, './src/components/atoms'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
    }
  },
  plugins: [react()],
})