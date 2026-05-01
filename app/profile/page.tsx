'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface CardSummary {
  total: number
  learning: number
  review: number
  relearning: number
  due: number
  lapses: number
}

interface Stats {
  italian: CardSummary
  spanish: CardSummary
  favorites: number
  corpus: Record<string, number>
  weakTopics: { key: string; lapses: number; total: number }[]
}

const TRIP_DATE = new Date('2026-05-16T00:00:00')
function daysUntilTrip() {
  const diff = TRIP_DATE.getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function ProfilePage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => setStats(data as Stats))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
  }, [])

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' })
    window.location.href = '/login'
  }

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-6">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back
        </Link>
        <button onClick={logout} className="text-xs text-muted hover:text-ink">
          Log out
        </button>
      </header>

      <h1 className="font-serif text-3xl text-ink mb-1">Progress</h1>
      <p className="text-sm text-muted mb-6">
        {daysUntilTrip()} days until Italy.
      </p>

      {error && <p className="text-terra text-sm mb-4">Could not load: {error}</p>}

      {!stats && !error && <p className="text-muted text-sm">Loading…</p>}

      {stats && (
        <>
          <section className="mb-6">
            <h2 className="text-xs uppercase tracking-wide text-muted mb-2">
              Italian
            </h2>
            <div className="bg-white border border-line rounded-2xl p-4">
              <div className="grid grid-cols-3 gap-3">
                <Stat label="Started" value={stats.italian.total} />
                <Stat label="Due now" value={stats.italian.due} />
                <Stat label="Lapses" value={stats.italian.lapses} />
              </div>
              <p className="text-xs text-muted mt-3">
                {stats.italian.learning} learning · {stats.italian.review} review · {stats.italian.relearning} relearning
              </p>
              <p className="text-xs text-muted mt-1">
                Corpus: {stats.corpus.totalItalian} items
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xs uppercase tracking-wide text-muted mb-2">
              Spanish
            </h2>
            <div className="bg-white border border-line rounded-2xl p-4">
              <div className="grid grid-cols-3 gap-3">
                <Stat label="Started" value={stats.spanish.total} />
                <Stat label="Due now" value={stats.spanish.due} />
                <Stat label="Lapses" value={stats.spanish.lapses} />
              </div>
              <p className="text-xs text-muted mt-3">
                Corpus: {stats.corpus.totalSpanish} items
              </p>
            </div>
          </section>

          {stats.weakTopics.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs uppercase tracking-wide text-muted mb-2">
                Weak topics
              </h2>
              <div className="bg-white border border-line rounded-2xl p-4 space-y-2">
                {stats.weakTopics.map((t) => (
                  <div key={t.key} className="flex justify-between text-sm">
                    <span className="text-ink">{t.key.replace(':', ' · ')}</span>
                    <span className="text-terra">
                      {t.lapses} {t.lapses === 1 ? 'lapse' : 'lapses'} / {t.total} cards
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mb-6">
            <h2 className="text-xs uppercase tracking-wide text-muted mb-2">
              Favorites
            </h2>
            <Link
              href="/favorites"
              className="block bg-white border border-line rounded-2xl p-4 hover:bg-cream/50"
            >
              <p className="text-sm text-ink">
                {stats.favorites} {stats.favorites === 1 ? 'item' : 'items'} saved
              </p>
              <p className="text-xs text-muted mt-1">Tap to open</p>
            </Link>
          </section>
        </>
      )}
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-2xl text-ink font-serif">{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-muted">{label}</p>
    </div>
  )
}
