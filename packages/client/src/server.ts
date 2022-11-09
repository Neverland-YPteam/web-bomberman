import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import express from 'express'
// import { ViteDevServer } from 'vite';

const port = Number(process.env.SERVER_PORT) || 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

export async function createServer() {
  const resolve = (p: string) => path.resolve(__dirname, p)

  // let vite: ViteDevServer

  app.use((await import('compression')).default())
  app.use(
    (await import('serve-static')).default(resolve('dist/client'), {
      index: false,
    })
  );

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    const template = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), 'utf-8');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const render = (await import('../dist/server/entry-server.js')).SSRender;

    const appHtml = await render(url);
    const html = template.replace(`<!--app-html-->`, appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })

  return { app };
}

createServer().then(({ app }) =>
  app.listen(port, () => {
    console.log('Server start!!') })
)
