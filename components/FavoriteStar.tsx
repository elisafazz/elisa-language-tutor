'use client'

import { useEffect, useState } from 'react'

interface Props {
  itemId: string
  initial?: boolean
  size?: 'sm' | 'md'
}

export default function FavoriteStar({ itemId, initial, size = 'md' }: Props) {
  const [saved, setSaved] = useState(!!initial)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (initial !== undefined) return
    let cancelled = false
    fetch('/api/favorites')
      .then((r) => r.ok ? r.json() : { ids: [] })
      .then((data: { ids?: string[] }) => {
        if (!cancelled) setSaved(!!data.ids?.includes(itemId))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [itemId, initial])

  async function toggle() {
    if (pending) return
    setPending(true)
    const next = !saved
    setSaved(next)
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ itemId, save: next }),
      })
      if (!res.ok) setSaved(!next)
    } catch {
      setSaved(!next)
    } finally {
      setPending(false)
    }
  }

  const dim = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Unfavorite' : 'Favorite'}
      className={`${dim} flex items-center justify-center text-lg transition-opacity ${pending ? 'opacity-50' : ''}`}
    >
      <span className={saved ? 'text-gold' : 'text-line'}>{saved ? '★' : '☆'}</span>
    </button>
  )
}
