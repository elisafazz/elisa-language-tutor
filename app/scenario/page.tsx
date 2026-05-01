'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface ScenarioMeta {
  id: string
  setting: string
  role: string
  topic: string
  register: string
  region?: string
  difficulty: number
}

interface Turn {
  role: 'assistant' | 'user'
  content: string
  gloss?: string
  correction?: string | null
}

const ROLE_LABELS: Record<string, string> = {
  waiter: 'Waiter',
  barista: 'Barista',
  'hotel-clerk': 'Hotel clerk',
  'taxi-driver': 'Taxi driver',
  pharmacist: 'Pharmacist',
  'shop-clerk': 'Shop clerk',
  'customs-officer': 'Customs officer',
  'stranger-on-street': 'Passerby',
  'train-station-attendant': 'Train station attendant',
}

export default function ScenarioPage() {
  const [scenarios, setScenarios] = useState<ScenarioMeta[] | null>(null)
  const [active, setActive] = useState<ScenarioMeta | null>(null)
  const [turns, setTurns] = useState<Turn[]>([])
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetch('/api/scenarios?language=italian')
      .then((r) => r.json())
      .then((data) => setScenarios(data.scenarios as ScenarioMeta[]))
      .catch(() => setScenarios([]))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [turns.length])

  async function start(scenario: ScenarioMeta) {
    setActive(scenario)
    setTurns([])
    setError(null)
    setPending(true)
    try {
      const res = await fetch('/api/grade-scenario', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ scenarioId: scenario.id, opening: true, history: [] }),
      })
      if (!res.ok) throw new Error(`scenario ${res.status}`)
      const data = await res.json()
      setTurns([{ role: 'assistant', content: data.role, gloss: data.gloss }])
      setTimeout(() => inputRef.current?.focus(), 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setPending(false)
    }
  }

  async function send() {
    if (!active || !draft.trim() || pending) return
    const userTurn: Turn = { role: 'user', content: draft.trim() }
    const nextTurns = [...turns, userTurn]
    setTurns(nextTurns)
    setDraft('')
    setPending(true)
    try {
      const res = await fetch('/api/grade-scenario', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          scenarioId: active.id,
          history: nextTurns.map((t) => ({ role: t.role, content: t.content })),
        }),
      })
      if (!res.ok) throw new Error(`scenario ${res.status}`)
      const data = await res.json()
      setTurns([
        ...nextTurns.slice(0, -1),
        { ...userTurn, correction: data.correction || null },
        { role: 'assistant', content: data.role, gloss: data.gloss },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setPending(false)
    }
  }

  function endScenario() {
    setActive(null)
    setTurns([])
    setDraft('')
  }

  if (!active) {
    return (
      <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6">
          <Link href="/" className="text-sm text-muted hover:text-ink">
            ← Back
          </Link>
        </header>
        <h1 className="font-serif text-2xl text-ink mb-2">Pick a scenario</h1>
        <p className="text-sm text-muted mb-6">
          Speak Italian with someone you might actually meet.
        </p>
        {scenarios === null && <p className="text-muted text-sm">Loading…</p>}
        {scenarios && scenarios.length === 0 && (
          <p className="text-muted text-sm">No scenarios yet.</p>
        )}
        {scenarios && scenarios.length > 0 && (
          <div className="space-y-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => start(s)}
                className="w-full text-left p-4 rounded-xl border border-line bg-white hover:bg-cream/50 transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-medium text-ink">
                    {ROLE_LABELS[s.role] || s.role}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-muted">
                    {s.register} · {s.difficulty}/3
                  </span>
                </div>
                <p className="text-sm text-muted mt-1">{s.setting}</p>
              </button>
            ))}
          </div>
        )}
      </main>
    )
  }

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto flex flex-col">
      <header className="flex items-center justify-between mb-4">
        <button onClick={endScenario} className="text-sm text-muted hover:text-ink">
          ← End
        </button>
        <span className="text-xs uppercase tracking-wide text-muted">
          {ROLE_LABELS[active.role] || active.role}
        </span>
      </header>

      <p className="text-xs text-muted mb-4 italic">{active.setting}</p>

      <section className="space-y-3 flex-1 mb-4">
        {turns.map((t, i) => (
          <div key={i}>
            {t.role === 'assistant' ? (
              <div className="bg-white border border-line rounded-2xl p-4">
                <p className="text-base text-ink font-serif">{t.content}</p>
                {t.gloss && (
                  <p className="text-xs text-muted mt-2">{t.gloss}</p>
                )}
              </div>
            ) : (
              <div className="bg-ink text-cream rounded-2xl p-4 ml-8">
                <p className="text-base">{t.content}</p>
                {t.correction && (
                  <p className="text-xs text-gold mt-2">{t.correction}</p>
                )}
              </div>
            )}
          </div>
        ))}
        {pending && <p className="text-xs text-muted italic">Thinking…</p>}
        <div ref={bottomRef} />
      </section>

      {error && <p className="text-terra text-xs mb-2">{error}</p>}

      <section className="sticky bottom-0 bg-cream pt-2 pb-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send()
            }}
            placeholder="Reply in Italian"
            autoCapitalize="none"
            autoCorrect="off"
            className="flex-1 px-4 py-3 rounded-lg border border-line bg-white text-ink text-base focus:outline-none focus:border-ink"
            disabled={pending}
          />
          <button
            onClick={send}
            disabled={!draft.trim() || pending}
            className="px-5 py-3 rounded-lg bg-ink text-cream font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </section>
    </main>
  )
}
