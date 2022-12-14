/// <reference lib="webworker" />

const CACHE_BASE = 'bomberman-cache'
const CACHE_VERSION = 1
const CACHE_NAME = `${CACHE_BASE}-v${CACHE_VERSION}`

const HTTP_STATUS_OK = 200
const RESPONSE_TYPE_NORMAL = 'basic'

const URLS = [
  '/index.html',
  '/bomberman.png',
  '/assets/app.js',
  '/assets/game.js',
  '/assets/index.browser.js',
  '/assets/arrows.png',
  '/assets/background.png',
  '/assets/style.css',
  '/assets/logo.png',
  '/assets/main_logo.png',
  '/assets/PressStart2P.ttf',
  '/assets/sprite.webp',
  '/assets/yandex_id.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      .catch((error) => {
        throw new Error(error)
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .map((key) => {
          const isKeyToDelete = key.startsWith(CACHE_BASE) && key !== CACHE_NAME
          return isKeyToDelete ? caches.delete(key) : null
        })
        .filter(Boolean)
    ))
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  const { pathname } = new URL(request.url)
  const isResponseFromUrlList = URLS.includes(pathname)

  if (!isResponseFromUrlList) {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }

        const fetchRequest = request.clone()

        return fetch(fetchRequest)
          .then((response) => {
            const isOk = response.status === HTTP_STATUS_OK
            const isResponseNormal = response.type === RESPONSE_TYPE_NORMAL

            if (!response || !isOk || !isResponseNormal) {
              return response
            }

            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, responseToCache))

            return response
          })
      })
  )
})
