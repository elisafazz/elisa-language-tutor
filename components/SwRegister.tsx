'use client'

import { useEffect } from 'react'

const OFFLINE_ROUTES = ['/study-guide', '/study-guide/flashcards']

export default function SwRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker.register('/sw.js').then(async () => {
      if (window.location.pathname === '/login') return
      await navigator.serviceWorker.ready
      await Promise.all(
        OFFLINE_ROUTES.map((route) =>
          fetch(route, {
            credentials: 'same-origin',
            cache: 'reload',
          }).catch(() => null)
        )
      )
    }).catch(() => {})
  }, [])

  return null
}
