import path from 'path'
import fs from 'fs'
import type { Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from '../dist/ssr/entry-server.cjs'

const SSR_COMMENT_CSS = '<!--ssr-css-->'
const SSR_COMMENT_APP = '<!--ssr-outlet-->'

export default ({ originalUrl }: Request, res: Response) => {
  const result = render({ path: originalUrl })

  const css = path.resolve(__dirname, '../dist/client/assets/style.css')
  const cssString = fs.readFileSync(css, 'utf-8')

  const template = path.resolve(__dirname, '../dist/client/index.html')
  const htmlString = fs.readFileSync(template, 'utf-8')

  const newString = htmlString
    .replace(SSR_COMMENT_CSS, `<style>${cssString}</style>`)
    .replace(SSR_COMMENT_APP, result)

  res.send(newString)
}
