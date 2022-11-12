import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import express from 'express'
import { ViteDevServer } from 'vite';

const port = Number(process.env.SERVER_PORT) || 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

export async function createServer(isProd = process.env.NODE_ENV === 'production') {
  const resolve = (p: string) => path.resolve(__dirname, p)

  let vite: ViteDevServer

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })

    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {

    try {
      const url = req.originalUrl;

      let template
      let render

      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).SSRender
      } else {
        template = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), 'utf-8');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        render = (await import('../dist/server/entry-server.js')).SSRender;
      }

      const appHtml = await render(url);
      const html = template.replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      if (!isProd) {
        vite.ssrFixStacktrace(e)
      }

      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app };
}

createServer().then(({ app }) =>
  app.listen(port, () => {
    console.log('Server start!!') })
)
