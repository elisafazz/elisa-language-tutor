'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Rating } from 'ts-fsrs'
import FavoriteStar from '@/components/FavoriteStar'
import { readClientLanguage } from '@/lib/language'
import type { Language } from '@/lib/content/types'

interface DrillCard {
  itemId: string
  nativeText: string
  expectedEnglish: string
  audioUrl: string | null
  topic: string
  register: string
  region?: string
  difficulty: number
  notes?: string
}

type Phase = 'loading' | 'front' | 'back' | 'done' | 'error'

export default function VocabPage() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [card, setCard] = useState<DrillCard | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [seenIds, setSeenIds] = useState<string[]>([])
  const [stats, setStats] = useState({ shown: 0, shadowed: 0 })
  const [didShadow, setDidShadow] = useState(false)
  const [language, setLanguage] = useState<Language>('italian')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressChainRef = useRef<Promise<unknown>>(Promise.resolve())

  const fetchNext = useCallback(async (excludeIds: string[], lang: Language) => {
    setPhase('loading')
    setDidShadow(false)
    setError(null)
    try {
      const params = new URLSearchParams({ language: lang })
      if (excludeIds.length) params.set('exclude', excludeIds.slice(-30).join(','))
      const res = await fetch(`/api/next-drill?${params.toString()}`)
      if (!res.ok) throw new Error(`next-drill ${res.status}`)
      const data = await res.json()
      if (!data.item) {
        setPhase('done')
        return
      }
      setCard(data.item as DrillCard)
      setPhase('front')
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setPhase('error')
    }
  }, [])

  useEffect(() => {
    const lang = readClientLanguage()
    setLanguage(lang)
    fetchNext([], lang)
  }, [fetchNext])

  function queueProgressWrite(itemId: string, rating: number) {
    progressChainRef.current = progressChainRef.current
      .catch(() => {})
      .then(() =>
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ itemId, rating }),
        })
      )
  }

  function reveal() {
    setPhase('back')
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  function replay() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  function shadow() {
    setDidShadow(true)
    setStats((s) => ({ ...s, shadowed: s.shadowed + 1 }))
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  function rate(rating: Rating) {
    if (!card) return
    queueProgressWrite(card.itemId, rating)
    setStats((s) => ({ ...s, shown: s.shown + 1 }))
    const nextSeen = [...seenIds, card.itemId]
    setSeenIds(nextSeen)
    fetchNext(nextSeen, language)
  }

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-6">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back
        </Link>
        <span className="text-xs text-muted">
          {stats.shown} cards · {stats.shadowed} shadowed
        </span>
      </header>

      {phase === 'loading' && <p className="text-muted">Loading…</p>}

      {phase === 'error' && (
        <div className="space-y-3">
          <p className="text-terra text-sm">Something broke: {error}</p>
          <button
            onClick={() => fetchNext(seenIds, language)}
            className="px-4 py-2 rounded-lg bg-ink text-cream text-sm"
          >
            Try again
          </button>
        </div>
      )}

      {phase === 'done' && (
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-ink">All caught up.</h2>
          <p className="text-muted text-sm">
            No items due. Check back tomorrow or open another mode.
          </p>
          <Link href="/" className="inline-block px-4 py-2 rounded-lg bg-ink text-cream text-sm">
            Back to dashboard
          </Link>
        </div>
      )}

      {(phase === 'front' || phase === 'back') && card && (
        <>
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-muted">
                <span>{card.topic}</span>
                <span>·</span>
                <span>{card.register}</span>
                {card.region && card.region !== 'general' && (
                  <>
                    <span>·</span>
                    <span>{card.region}</span>
                  </>
                )}
              </div>
              <FavoriteStar itemId={card.itemId} size="sm" />
            </div>

            {card.audioUrl && (
              <audio ref={audioRef} src={card.audioUrl} preload="auto" />
            )}

            <div className="bg-white border border-line rounded-2xl p-6 min-h-[160px] flex items-center justify-center text-center">
              {phase === 'front' ? (
                <p className="text-2xl text-ink font-serif">{card.expectedEnglish}</p>
              ) : (
                <div>
                  <p className="text-2xl text-ink font-serif">{card.nativeText}</p>
                  <p className="text-sm text-muted mt-2">{card.expectedEnglish}</p>
                  {card.notes && (
                    <p className="text-xs text-muted italic mt-3">{card.notes}</p>
                  )}
                </div>
              )}
            </div>
          </section>

          {phase === 'front' && (
            <section className="space-y-2">
              <button
                onClick={reveal}
                className="w-full py-4 rounded-xl bg-ink text-cream font-medium text-base"
              >
                Show {language === 'spanish' ? 'Spanish' : 'Italian'} + audio
              </button>
              <p className="text-xs text-muted text-center">
                Try to recall the {language === 'spanish' ? 'Spanish' : 'Italian'} out loud first.
              </p>
            </section>
          )}

          {phase === 'back' && (
            <section className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={replay}
                  className="flex-1 py-3 rounded-lg border border-line text-ink text-sm"
                >
                  ▶ Replay
                </button>
                <button
                  onClick={shadow}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium ${
                    didShadow
                      ? 'bg-sage/20 border border-sage/40 text-sage'
                      : 'bg-cream border border-sage/30 text-sage'
                  }`}
                >
                  {didShadow ? '✓ Said it' : 'I said it'}
                </button>
              </div>

              <p className="text-xs text-muted text-center pt-2">
                How well did you recall it?
              </p>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => rate(Rating.Again)}
                  className="py-3 rounded-lg border border-terra/40 text-terra text-xs font-medium"
                >
                  Again
                </button>
                <button
                  onClick={() => rate(Rating.Hard)}
                  className="py-3 rounded-lg border border-gold/40 text-gold text-xs font-medium"
                >
                  Hard
                </button>
                <button
                  onClick={() => rate(Rating.Good)}
                  className="py-3 rounded-lg border border-sage/40 text-sage text-xs font-medium"
                >
                  Good
                </button>
                <button
                  onClick={() => rate(Rating.Easy)}
                  className="py-3 rounded-lg bg-ink text-cream text-xs font-medium"
                >
                  Easy
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}
