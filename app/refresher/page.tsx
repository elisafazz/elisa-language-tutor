'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { italianRefresher, type RefresherDrill } from '@/lib/content/italian-refresher'

type Category = 'all' | RefresherDrill['category']
type Phase = 'asking' | 'shown'

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'register-shift', label: 'tu → Lei' },
  { id: 'gender', label: 'Gender' },
  { id: 'past-tense', label: 'Past tense' },
  { id: 'numbers', label: 'Numbers' },
]

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:'"()]/g, '')
    .replace(/\s+/g, ' ')
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function RefresherPage() {
  const [category, setCategory] = useState<Category>('all')
  const [phase, setPhase] = useState<Phase>('asking')
  const [typed, setTyped] = useState('')
  const [stats, setStats] = useState({ shown: 0, right: 0, wrong: 0 })
  const inputRef = useRef<HTMLInputElement | null>(null)

  const queue = useMemo(() => {
    const filtered =
      category === 'all'
        ? italianRefresher
        : italianRefresher.filter((d) => d.category === category)
    return shuffle(filtered)
  }, [category, stats.shown])

  const drill = queue[0]

  function check() {
    if (!drill || !typed.trim()) return
    const t = normalize(typed)
    const all = [drill.answer, ...(drill.altAnswers ?? [])].map(normalize)
    const correct = all.includes(t)
    setStats((s) => ({
      shown: s.shown + 1,
      right: s.right + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }))
    setPhase('shown')
  }

  function next() {
    setTyped('')
    setPhase('asking')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function changeCategory(c: Category) {
    setCategory(c)
    setTyped('')
    setPhase('asking')
    setStats({ shown: 0, right: 0, wrong: 0 })
  }

  if (!drill) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
        <Link href="/" className="text-sm text-muted">← Back</Link>
        <p className="text-muted text-sm mt-6">No drills.</p>
      </main>
    )
  }

  const correct = phase === 'shown' && stats.right > 0 && (
    [drill.answer, ...(drill.altAnswers ?? [])].map(normalize).includes(normalize(typed))
  )

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-6">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back
        </Link>
        <span className="text-xs text-muted">
          {stats.shown} done · {stats.right} ✓ {stats.wrong} ✗
        </span>
      </header>

      <h1 className="font-serif text-2xl text-ink mb-2">Refresher</h1>
      <p className="text-sm text-muted mb-4">
        Quick drills on the things heritage speakers most often miss.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => changeCategory(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs ${
              category === c.id
                ? 'bg-ink text-cream'
                : 'bg-white border border-line text-muted'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <section className="bg-white border border-line rounded-2xl p-6 mb-4">
        <p className="text-xs uppercase tracking-wide text-muted mb-2">
          {drill.category}
        </p>
        <p className="text-lg text-ink font-serif">{drill.prompt}</p>
        {drill.hint && (
          <p className="text-xs text-muted italic mt-1">{drill.hint}</p>
        )}
      </section>

      {phase === 'asking' && (
        <section className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') check()
            }}
            placeholder="Type your answer"
            autoCapitalize="off"
            autoCorrect="off"
            className="w-full px-4 py-3 rounded-lg border border-line bg-white text-ink text-base focus:outline-none focus:border-ink"
          />
          <button
            onClick={check}
            disabled={!typed.trim()}
            className="w-full py-3 rounded-lg bg-ink text-cream font-medium disabled:opacity-50"
          >
            Check
          </button>
        </section>
      )}

      {phase === 'shown' && (
        <section className="space-y-3">
          <div>
            <p className={`text-sm font-medium ${correct ? 'text-sage' : 'text-terra'}`}>
              {correct ? 'Correct' : 'Not quite'}
            </p>
            <div className="mt-2 text-sm">
              <p className="text-xs uppercase tracking-wide text-muted">You typed</p>
              <p className="text-ink mt-0.5">{typed}</p>
              <p className="text-xs uppercase tracking-wide text-muted mt-2">Answer</p>
              <p className="text-ink mt-0.5 font-serif">{drill.answer}</p>
              {drill.notes && (
                <p className="text-xs text-muted italic mt-2">{drill.notes}</p>
              )}
            </div>
          </div>
          <button
            onClick={next}
            className="w-full py-3 rounded-lg bg-ink text-cream font-medium"
          >
            Next →
          </button>
        </section>
      )}
    </main>
  )
}
