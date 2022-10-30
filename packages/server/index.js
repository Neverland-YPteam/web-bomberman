// import dotenv from 'dotenv'
// import cors from 'cors'
// dotenv.config()
//
// import express from 'express'
//
// const app = express()
// app.use(cors())
// const port = Number(process.env.SERVER_PORT) || 3001
//
// app.get('/', (_, res) => {
//   res.json('👋 Howdy from the server :)')
// })
//
// app.listen(port, () => {
//   console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
// })

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import express from 'express'

const port = Number(process.env.SERVER_PORT) || 3001

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

export async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p)

  const vite = null

  app.use((await import('compression')).default())
  app.use(
    (await import('serve-static')).default(resolve('dist/client'), {
      index: false,
    })
  );

  app.use('*', async (_req, res) => {
    const url = '/';

    const template = fs.readFileSync(resolve('../dist/client/index.html'), 'utf-8');
    const render = (await import('../dist/server/entry-server.js')).SSRender;

    const appHtml = render(url);
    const html = template.replace(`<!--app-html-->`, appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(port, () => {
    console.log('Server start!!') })
)

