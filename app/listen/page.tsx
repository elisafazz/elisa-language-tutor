'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Rating } from 'ts-fsrs'

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
  state: number
  reps: number
}

interface GradeResult {
  verdict: 'correct' | 'almost' | 'wrong'
  rating: number
  feedback: string
  expectedAnswer: string
}

type Phase = 'loading' | 'listening' | 'graded' | 'done' | 'error'

const LANGUAGE = 'italian'

export default function ListenPage() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [card, setCard] = useState<DrillCard | null>(null)
  const [typed, setTyped] = useState('')
  const [grading, setGrading] = useState(false)
  const [grade, setGrade] = useState<GradeResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [seenIds, setSeenIds] = useState<string[]>([])
  const [stats, setStats] = useState({ correct: 0, almost: 0, wrong: 0 })
  const [showAnswer, setShowAnswer] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const progressChainRef = useRef<Promise<unknown>>(Promise.resolve())

  const fetchNext = useCallback(async (excludeIds: string[]) => {
    setPhase('loading')
    setTyped('')
    setGrade(null)
    setShowAnswer(false)
    setError(null)
    try {
      const params = new URLSearchParams({ language: LANGUAGE })
      if (excludeIds.length) params.set('exclude', excludeIds.slice(-30).join(','))
      const res = await fetch(`/api/next-drill?${params.toString()}`)
      if (!res.ok) throw new Error(`next-drill ${res.status}`)
      const data = await res.json()
      if (!data.item) {
        setPhase('done')
        return
      }
      setCard(data.item as DrillCard)
      setPhase('listening')
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setPhase('error')
    }
  }, [])

  useEffect(() => {
    fetchNext([])
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

  async function submit() {
    if (!card || grading || !typed.trim()) return
    setGrading(true)
    try {
      const res = await fetch('/api/grade-typed', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          itemId: card.itemId,
          typedAnswer: typed,
        }),
      })
      if (!res.ok) throw new Error(`grade ${res.status}`)
      const result = (await res.json()) as GradeResult
      setGrade(result)
      setStats((s) => ({
        ...s,
        correct: s.correct + (result.verdict === 'correct' ? 1 : 0),
        almost: s.almost + (result.verdict === 'almost' ? 1 : 0),
        wrong: s.wrong + (result.verdict === 'wrong' ? 1 : 0),
      }))
      setPhase('graded')
      queueProgressWrite(card.itemId, result.rating)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setPhase('error')
    } finally {
      setGrading(false)
    }
  }

  function override(rating: Rating) {
    if (!card) return
    setStats((s) => {
      if (!grade) return s
      const flip = (from: keyof typeof s, to: keyof typeof s) => ({
        ...s,
        [from]: Math.max(0, s[from] - 1),
        [to]: s[to] + 1,
      })
      if (rating === Rating.Good && grade.verdict !== 'correct')
        return flip(grade.verdict === 'almost' ? 'almost' : 'wrong', 'correct')
      if (rating === Rating.Hard && grade.verdict !== 'almost')
        return flip(grade.verdict === 'correct' ? 'correct' : 'wrong', 'almost')
      if (rating === Rating.Again && grade.verdict !== 'wrong')
        return flip(grade.verdict === 'correct' ? 'correct' : 'almost', 'wrong')
      return s
    })
    queueProgressWrite(card.itemId, rating)
    advance()
  }

  function advance() {
    if (!card) return
    const nextSeen = [...seenIds, card.itemId]
    setSeenIds(nextSeen)
    fetchNext(nextSeen)
  }

  function playAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
    inputRef.current?.focus()
  }

  const verdictColor =
    grade?.verdict === 'correct'
      ? 'text-sage'
      : grade?.verdict === 'almost'
      ? 'text-gold'
      : 'text-terra'

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-6">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back
        </Link>
        <span className="text-xs text-muted">
          {stats.correct + stats.almost + stats.wrong} done · {stats.correct} ✓ {stats.almost} ~ {stats.wrong} ✗
        </span>
      </header>

      {phase === 'loading' && <p className="text-muted">Loading next drill…</p>}

      {phase === 'error' && (
        <div className="space-y-3">
          <p className="text-terra text-sm">Something broke: {error}</p>
          <button
            onClick={() => fetchNext(seenIds)}
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
            No items due. Tomorrow there&apos;ll be more — that&apos;s how the schedule works.
          </p>
          <Link href="/" className="inline-block px-4 py-2 rounded-lg bg-ink text-cream text-sm">
            Back to dashboard
          </Link>
        </div>
      )}

      {(phase === 'listening' || phase === 'graded') && card && (
        <>
          <section className="mb-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-muted mb-3">
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

            {card.audioUrl ? (
              <audio ref={audioRef} src={card.audioUrl} preload="auto" />
            ) : (
              <p className="text-xs text-terra mb-2">Audio not available for this item.</p>
            )}

            <button
              onClick={playAudio}
              className="w-full py-4 rounded-xl bg-ink text-cream font-medium text-base active:bg-ink/80"
            >
              ▶ Play audio
            </button>

            {phase === 'listening' && !showAnswer && (
              <button
                onClick={() => setShowAnswer(true)}
                className="mt-2 text-xs text-muted underline"
              >
                Show Italian text
              </button>
            )}

            {(showAnswer || phase === 'graded') && (
              <p className="mt-3 text-lg text-ink font-serif">{card.nativeText}</p>
            )}
            {card.notes && (showAnswer || phase === 'graded') && (
              <p className="mt-1 text-xs text-muted italic">{card.notes}</p>
            )}
          </section>

          {phase === 'listening' && (
            <section className="space-y-3">
              <input
                ref={inputRef}
                type="text"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submit()
                }}
                placeholder="Type the English meaning"
                autoCapitalize="off"
                autoCorrect="off"
                className="w-full px-4 py-3 rounded-lg border border-line bg-white text-ink text-base focus:outline-none focus:border-ink"
                disabled={grading}
              />
              <div className="flex gap-2">
                <button
                  onClick={submit}
                  disabled={!typed.trim() || grading}
                  className="flex-1 py-3 rounded-lg bg-ink text-cream font-medium disabled:opacity-50"
                >
                  {grading ? 'Grading…' : 'Submit'}
                </button>
                <button
                  onClick={() => override(Rating.Again)}
                  disabled={grading}
                  className="px-4 py-3 rounded-lg border border-line text-muted text-sm"
                >
                  Skip
                </button>
              </div>
            </section>
          )}

          {phase === 'graded' && grade && (
            <section className="space-y-4">
              <div>
                <p className={`text-sm font-medium ${verdictColor}`}>
                  {grade.verdict === 'correct'
                    ? 'Correct'
                    : grade.verdict === 'almost'
                    ? 'Almost'
                    : 'Missed it'}
                </p>
                <p className="text-sm text-muted mt-1">{grade.feedback}</p>
              </div>

              <div className="text-sm text-ink">
                <span className="text-xs uppercase tracking-wide text-muted">You typed</span>
                <p className="mt-0.5">{typed || <em className="text-muted">(empty)</em>}</p>
                <span className="block mt-2 text-xs uppercase tracking-wide text-muted">
                  Expected
                </span>
                <p className="mt-0.5">{grade.expectedAnswer}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => override(Rating.Again)}
                  className="py-2.5 rounded-lg border border-terra/40 text-terra text-sm"
                >
                  Mark wrong
                </button>
                <button
                  onClick={() => override(Rating.Hard)}
                  className="py-2.5 rounded-lg border border-gold/40 text-gold text-sm"
                >
                  Mark almost
                </button>
                <button
                  onClick={() => override(Rating.Good)}
                  className="py-2.5 rounded-lg border border-sage/40 text-sage text-sm"
                >
                  Mark correct
                </button>
                <button
                  onClick={advance}
                  className="py-2.5 rounded-lg bg-ink text-cream text-sm font-medium"
                >
                  Next →
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}
