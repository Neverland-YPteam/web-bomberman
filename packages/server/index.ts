import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import { dbConnect } from './db'
import router from './router'
import { API_LOCAL_URL_PATH } from './api/http'
import { authMiddleware, proxyMiddleware, ssrMiddleware } from './middleware'

dotenv.config()

const PORT = process.env.SERVER_PORT || 3001

;(async () => {
  try {
    await dbConnect()
  } catch (err) {
    console.error('DB connect error:', err)
  }

  const app = express()

  app.use(cors())
  app.use(cookieParser())
  app.use(API_LOCAL_URL_PATH, proxyMiddleware)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.resolve(__dirname, './dist/client'), { index: false }))
  app.use(router)
  app.use('*', authMiddleware, ssrMiddleware)

  app.listen(PORT, () => {
    console.log(` ➜ 🎸 Server is listening on port: ${PORT}`)
  })
})()
