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
    alias:
    //   [{ find: '@', replacement: path.resolve(__dirname, './src')},
    //   { find: '@pages', replacement: path.resolve(__dirname, './src/components/pages')},
    //   { find: '@organisms', replacement: path.resolve(__dirname, './src/components/organisms')},
    //   { find: '@molecules', replacement: path.resolve(__dirname, './src/components/molecules')},
    //   { find: '@atoms', replacement: path.resolve(__dirname, './src/components/atoms')},
    //   { find: '@utils', replacement: path.resolve(__dirname, './src/utils')},
    //   { find: '@services', replacement: path.resolve(__dirname, './src/services')},
    //   { find: '@fonts', replacement: path.resolve(__dirname, './src/assets/fonts')},
    //   { find: '@images', replacement: path.resolve(__dirname, './src/assets/images')},
    // ],
{
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@organisms': path.resolve(__dirname, './src/components/organisms'),
      '@molecules': path.resolve(__dirname, './src/components/molecules'),
      '@atoms': path.resolve(__dirname, './src/components/atoms'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@fonts': path.resolve(__dirname, './src/assets/fonts'),
      '@images': path.resolve(__dirname, './src/assets/images'),
    },
  },
  plugins: [react()],
  build: {
    minify: false
  }
})
