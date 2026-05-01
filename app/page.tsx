const TRIP_DATE = new Date('2026-05-16T00:00:00')

function daysUntilTrip() {
  const now = new Date()
  const diff = TRIP_DATE.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const MODES = [
  { id: 'listen', label: 'Listen', sub: 'Hear it. Type the meaning.' },
  { id: 'scenario', label: 'Scenario', sub: 'Order a coffee. Check in. Get directions.' },
  { id: 'vocab', label: 'Vocab', sub: 'Flashcards with shadowing.' },
  { id: 'refresher', label: 'Refresher', sub: 'Grammar, gender, formal Lei.' },
  { id: 'warmup', label: 'Warmup', sub: 'Tongue twisters. Wake up the mouth.' },
  { id: 'favorites', label: 'Favorites', sub: 'Saved phrases. Offline ready.' },
] as const

export default function Dashboard() {
  const days = daysUntilTrip()
  return (
    <main className="min-h-screen px-5 py-8 max-w-md mx-auto">
      <header className="mb-8">
        <h1 className="font-serif text-4xl text-ink">Lingua</h1>
        <p className="text-sm text-muted mt-1">
          {days} {days === 1 ? 'day' : 'days'} until Italy
        </p>
      </header>

      <section className="mb-8">
        <p className="text-xs uppercase tracking-wide text-muted mb-3">Pick a session</p>
        <div className="flex gap-2">
          {[3, 10, 30].map((m) => (
            <button
              key={m}
              className="flex-1 py-2.5 rounded-lg border border-line bg-white text-ink text-sm font-medium opacity-60 cursor-not-allowed"
              disabled
            >
              {m} min
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        {MODES.map((mode) => (
          <div
            key={mode.id}
            className="block p-4 rounded-xl border border-line bg-white opacity-60 cursor-not-allowed"
            aria-disabled="true"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-base font-medium text-ink">{mode.label}</span>
              <span className="text-[10px] uppercase tracking-wide text-muted">soon</span>
            </div>
            <p className="text-sm text-muted mt-1">{mode.sub}</p>
          </div>
        ))}
      </section>

      <footer className="mt-12 text-xs text-muted text-center">
        Infra is live. Drill modes ship next — start with Listen.
      </footer>
    </main>
  )
}
