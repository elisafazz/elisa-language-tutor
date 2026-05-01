'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FavoriteStar from '@/components/FavoriteStar'

interface Warmup {
  itemId: string
  nativeText: string
  english: string
  audioUrl: string | null
  notes?: string
  difficulty: number
}

export default function WarmupPage() {
  const [items, setItems] = useState<Warmup[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [reps, setReps] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    fetch('/api/warmups')
      .then((r) => r.json())
      .then((data) => setItems(data.items as Warmup[]))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
  }, [])

  function play() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  function shadow() {
    if (!items) return
    const item = items[idx]
    setReps((r) => ({ ...r, [item.itemId]: (r[item.itemId] ?? 0) + 1 }))
    play()
  }

  function next() {
    if (!items) return
    setIdx((i) => (i + 1) % items.length)
  }

  function prev() {
    if (!items) return
    setIdx((i) => (i - 1 + items.length) % items.length)
  }

  if (error) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
        <Link href="/" className="text-sm text-muted">← Back</Link>
        <p className="text-terra text-sm mt-6">Could not load warmups: {error}</p>
      </main>
    )
  }

  if (!items) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
        <Link href="/" className="text-sm text-muted">← Back</Link>
        <p className="text-muted text-sm mt-6">Loading…</p>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
        <Link href="/" className="text-sm text-muted">← Back</Link>
        <p className="text-muted text-sm mt-6">No warmups yet.</p>
      </main>
    )
  }

  const item = items[idx]
  const rep = reps[item.itemId] ?? 0
  const totalReps = Object.values(reps).reduce((a, b) => a + b, 0)

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-6">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back
        </Link>
        <span className="text-xs text-muted">
          {idx + 1} / {items.length} · {totalReps} reps
        </span>
      </header>

      <h1 className="font-serif text-2xl text-ink mb-2">Warmup</h1>
      <p className="text-sm text-muted mb-6">
        Tongue twisters wake up your mouth. Listen, then say it three times.
      </p>

      <section className="bg-white border border-line rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase tracking-wide text-muted">
            difficulty {item.difficulty}/3
          </span>
          <FavoriteStar itemId={item.itemId} size="sm" />
        </div>
        {item.audioUrl && <audio ref={audioRef} src={item.audioUrl} preload="auto" />}
        <p className="text-2xl text-ink font-serif text-center leading-relaxed">
          {item.nativeText}
        </p>
        <p className="text-sm text-muted text-center mt-3">{item.english}</p>
        {item.notes && (
          <p className="text-xs text-muted italic text-center mt-2">{item.notes}</p>
        )}
      </section>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={play}
          className="py-3 rounded-lg bg-ink text-cream font-medium"
        >
          ▶ Play
        </button>
        <button
          onClick={shadow}
          className="py-3 rounded-lg border border-sage/40 text-sage font-medium"
        >
          I said it ({rep})
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={prev}
          className="py-3 rounded-lg border border-line text-muted text-sm"
        >
          ← Prev
        </button>
        <button
          onClick={next}
          className="py-3 rounded-lg border border-line text-ink text-sm"
        >
          Next →
        </button>
      </div>
    </main>
  )
}
