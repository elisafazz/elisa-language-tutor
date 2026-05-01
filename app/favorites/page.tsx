'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import FavoriteStar from '@/components/FavoriteStar'

interface FavItem {
  itemId: string
  nativeText: string
  english: string
  audioUrl: string | null
  topic: string
  register: string
  region?: string
  type: string
  notes?: string
  language: string
}

export default function FavoritesPage() {
  const [items, setItems] = useState<FavItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map())

  useEffect(() => {
    fetch('/api/favorites/list')
      .then((r) => r.json())
      .then((data) => setItems(data.items as FavItem[]))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
  }, [])

  const filtered = useMemo(() => {
    if (!items) return []
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(
      (i) =>
        i.nativeText.toLowerCase().includes(q) ||
        i.english.toLowerCase().includes(q) ||
        i.topic.toLowerCase().includes(q)
    )
  }, [items, query])

  const grouped = useMemo(() => {
    const map = new Map<string, FavItem[]>()
    for (const item of filtered) {
      const key = `${item.language}:${item.topic}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(item)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  function play(itemId: string) {
    const el = audioRefs.current.get(itemId)
    if (el) {
      el.currentTime = 0
      el.play().catch(() => {})
    }
  }

  if (error) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
        <Link href="/" className="text-sm text-muted">← Back</Link>
        <p className="text-terra text-sm mt-6">Could not load favorites: {error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-6">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back
        </Link>
        <span className="text-xs text-muted">
          {items ? `${items.length} saved` : '...'}
        </span>
      </header>

      <h1 className="font-serif text-2xl text-ink mb-4">Favorites</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
        className="w-full px-4 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-ink mb-4"
      />

      {!items && <p className="text-muted text-sm">Loading…</p>}

      {items && items.length === 0 && (
        <div className="space-y-2">
          <p className="text-muted text-sm">No favorites yet.</p>
          <p className="text-muted text-xs">
            Tap the ☆ on any drill item to save it here.
          </p>
        </div>
      )}

      {items && items.length > 0 && filtered.length === 0 && (
        <p className="text-muted text-sm">No matches.</p>
      )}

      <div className="space-y-6">
        {grouped.map(([key, groupItems]) => {
          const [lang, topic] = key.split(':')
          return (
            <section key={key}>
              <h2 className="text-xs uppercase tracking-wide text-muted mb-2">
                {lang} · {topic}
              </h2>
              <div className="space-y-2">
                {groupItems.map((item) => (
                  <div
                    key={item.itemId}
                    className="bg-white border border-line rounded-xl p-3"
                  >
                    {item.audioUrl && (
                      <audio
                        ref={(el) => {
                          if (el) audioRefs.current.set(item.itemId, el)
                          else audioRefs.current.delete(item.itemId)
                        }}
                        src={item.audioUrl}
                        preload="metadata"
                      />
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-base text-ink font-serif">
                          {item.nativeText}
                        </p>
                        <p className="text-sm text-muted mt-0.5">{item.english}</p>
                        {item.notes && (
                          <p className="text-xs text-muted italic mt-1">{item.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {item.audioUrl && (
                          <button
                            onClick={() => play(item.itemId)}
                            className="px-2 py-1 text-sm text-ink"
                            aria-label="Play"
                          >
                            ▶
                          </button>
                        )}
                        <FavoriteStar itemId={item.itemId} initial size="sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
