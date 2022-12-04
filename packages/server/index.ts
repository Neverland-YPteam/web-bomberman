import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
dotenv.config()

// @ts-ignore
import { render } from './dist/ssr/entry-server.cjs'

import express from 'express'
import { dbConnect } from './db'
import router from './router'

;(async () => {
  await dbConnect()

  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.resolve(__dirname, './dist/client'), { index: false }))
  app.use(router)

  const port = process.env.SERVER_PORT || 3001

  app.get('*', (_, res) => {
    const result = render()
    const template = path.resolve(__dirname, './dist/client/index.html')
    const htmlString = fs.readFileSync(template, 'utf-8')
    const newString = htmlString.replace('<!--ssr-outlet-->', result)

    res.send(newString)
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
})()
