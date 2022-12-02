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
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
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
      '@fonts': path.resolve(__dirname, './src/assets/fonts'),
      '@images': path.resolve(__dirname, './src/assets/images'),
    }
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        'service-worker': './service-worker.ts',
        sw: './sw.ts',
        game: './src/components/pages/game/scripts/index.ts',
        css: './src/styles/style.css',
      },
      output: {
        entryFileNames: ({ name }) => {
          switch (name) {
            case 'entry-server':
              return '[name].cjs'
            case 'sw':
              return '[name].js'
            case 'game':
              return 'assets/[name].js'
            case 'css':
              return 'assets/[name].css'
            default:
              return 'assets/[name].js'
          }
        },
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
})
