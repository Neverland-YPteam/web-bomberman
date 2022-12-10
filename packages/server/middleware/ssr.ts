import path from 'path'
import fs from 'fs'
import type { Request, Response } from 'express'
import serialize from 'serialize-javascript'
import type { IRequest } from '../types/request'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from '../dist/ssr/entry-server.cjs'

const SSR_COMMENT_CSS = '<!--ssr-css-->'
const SSR_COMMENT_APP = '<!--ssr-outlet-->'
const SSR_COMMENT_STATE = '<!--ssr-state-->'
const GLOBAL_STATE_KEY = '__PRELOADED_STATE__'

export default (req: Request, res: Response) => {
  const { initialState, authMiddlewareStatus } = req as IRequest

  const result = render({ path: req.originalUrl })

  const css = path.resolve(__dirname, '../dist/client/assets/style.css')
  const cssString = fs.readFileSync(css, 'utf-8')

  const template = path.resolve(__dirname, '../dist/client/index.html')
  const htmlString = fs.readFileSync(template, 'utf-8')

  const stateString = serialize(initialState).replace(/</g, '\\\u003c')

  const newString = htmlString
    .replace(SSR_COMMENT_CSS, `<style>${cssString}</style>`)
    .replace(SSR_COMMENT_APP, result)
    .replace(SSR_COMMENT_STATE, `<script>window.${GLOBAL_STATE_KEY}=${stateString}</script>`)

  res.status(authMiddlewareStatus).send(newString)
}
