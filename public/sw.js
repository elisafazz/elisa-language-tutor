const CACHE = 'lingua-v5'
const OFFLINE_ROUTES = ['/', '/study-guide', '/study-guide/flashcards']
const OFFLINE_ROUTE_SET = new Set(OFFLINE_ROUTES)

function pathnameFor(request) {
  const url = new URL(request.url)
  const path = url.pathname.endsWith('/') && url.pathname !== '/'
    ? url.pathname.slice(0, -1)
    : url.pathname
  return { url, path }
}

async function cacheResponse(request, response) {
  if (!response || !response.ok) return
  if (typeof request !== 'string' && request.method !== 'GET') return
  const cache = await caches.open(CACHE)
  await cache.put(request, response.clone())
}

async function cachedOfflineRoute(path) {
  return caches.match(path, { ignoreSearch: true })
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(OFFLINE_ROUTES))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return

  const { url, path } = pathnameFor(e.request)
  if (url.origin !== self.location.origin) return

  const isOfflineRoute = OFFLINE_ROUTE_SET.has(path)
  const isNextAsset = url.pathname.startsWith('/_next/')
  if (!isOfflineRoute && !isNextAsset) return

  e.respondWith(
    (async () => {
      const cached = await caches.match(e.request, { ignoreSearch: true })

      if (e.request.mode === 'navigate' && isOfflineRoute) {
        try {
          const response = await fetch(e.request)
          await cacheResponse(path, response)
          return response
        } catch {
          return (await cachedOfflineRoute(path)) || cached
        }
      }

      if (isNextAsset) {
        if (cached) return cached
        const response = await fetch(e.request)
        await cacheResponse(e.request, response)
        return response
      }

      try {
        const response = await fetch(e.request)
        await cacheResponse(path, response)
        return response
      } catch {
        return cached || (await cachedOfflineRoute(path))
      }
    })()
  )
})
