import { createProxyMiddleware } from 'http-proxy-middleware'
import { API_LOCAL_URL_PATH, API_YANDEX_URL_BASE, API_YANDEX_URL_PATH } from '../api/http'

const PATH_REWRITE_KEY = `^${API_LOCAL_URL_PATH}`
const REQUEST_TIMEOUT_MS = 5000

export default createProxyMiddleware({
  pathRewrite: {
    [PATH_REWRITE_KEY]: API_YANDEX_URL_PATH,
  },
  target: `${API_YANDEX_URL_BASE}`,
  changeOrigin: true,
  cookieDomainRewrite: '',
  secure: false,
  timeout: REQUEST_TIMEOUT_MS,
})
