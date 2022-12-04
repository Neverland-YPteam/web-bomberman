import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from './dist/ssr/entry-server.cjs'

import express from 'express'
import { dbConnect } from './db'
import router from './router'

const PORT = process.env.SERVER_PORT || 3001

const SSR_COMMENT_CSS = '<!--ssr-css-->'
const SSR_COMMENT_APP = '<!--ssr-outlet-->'

;(async () => {
  try {
    await dbConnect()
  } catch (err) {
    console.error('DB connect error:', err)
  }

  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.resolve(__dirname, './dist/client'), { index: false }))
  app.use(router)

  app.get('*', ({ originalUrl }, res) => {
    const result = render({ path: originalUrl })

    const css = path.resolve(__dirname, './dist/client/assets/style.css')
    const cssString = fs.readFileSync(css, 'utf-8')

    const template = path.resolve(__dirname, './dist/client/index.html')
    const htmlString = fs.readFileSync(template, 'utf-8')

    const newString = htmlString
      .replace(SSR_COMMENT_CSS, `<style>${cssString}</style>`)
      .replace(SSR_COMMENT_APP, result)

    res.send(newString)
  })

  app.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
  })
})()
