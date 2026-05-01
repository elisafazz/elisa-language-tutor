import Link from 'next/link'

const TRIP_DATE = new Date('2026-05-16T00:00:00')

function daysUntilTrip() {
  const now = new Date()
  const diff = TRIP_DATE.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const MODES = [
  { id: 'listen', label: 'Listen', sub: 'Hear it. Type the meaning.', href: '/listen' },
  { id: 'scenario', label: 'Scenario', sub: 'Order a coffee. Check in. Get directions.', href: '/scenario', primary: true },
  { id: 'vocab', label: 'Vocab', sub: 'Flashcards with shadowing.', href: '/vocab' },
  { id: 'refresher', label: 'Refresher', sub: 'Grammar, gender, formal Lei.', href: '/refresher' },
  { id: 'warmup', label: 'Warmup', sub: 'Tongue twisters. Wake up the mouth.', href: '/warmup' },
  { id: 'favorites', label: 'Favorites', sub: 'Saved phrases.', href: '/favorites' },
]

export default function Dashboard() {
  const days = daysUntilTrip()
  return (
    <main className="min-h-screen px-5 py-8 max-w-md mx-auto">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-serif text-4xl text-ink">Lingua</h1>
          <p className="text-sm text-muted mt-1">
            {days} {days === 1 ? 'day' : 'days'} until Italy
          </p>
        </div>
        <Link
          href="/profile"
          className="text-xs text-muted hover:text-ink mt-2"
          aria-label="Profile"
        >
          Profile →
        </Link>
      </header>

      <section className="mb-8">
        <p className="text-xs uppercase tracking-wide text-muted mb-3">
          Recommended start
        </p>
        <Link
          href="/warmup"
          className="block p-4 rounded-xl border border-sage/30 bg-sage/5 hover:bg-sage/10 transition-colors"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-base font-medium text-ink">Warmup</span>
            <span className="text-[10px] uppercase tracking-wide text-sage">2 min</span>
          </div>
          <p className="text-sm text-muted mt-1">
            Three tongue twisters to wake up the mouth.
          </p>
        </Link>
      </section>

      <section className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted mb-3">All modes</p>
        {MODES.map((mode) => (
          <Link
            key={mode.id}
            href={mode.href}
            className={`block p-4 rounded-xl border transition-colors ${
              mode.primary
                ? 'border-ink bg-white hover:bg-cream/50'
                : 'border-line bg-white hover:bg-cream/50'
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-base font-medium text-ink">{mode.label}</span>
              {mode.primary && (
                <span className="text-[10px] uppercase tracking-wide text-ink">
                  primary
                </span>
              )}
            </div>
            <p className="text-sm text-muted mt-1">{mode.sub}</p>
          </Link>
        ))}
      </section>

      <footer className="mt-12 text-xs text-muted text-center">
        Drill 3 times a day. Audio + production beats reading silently.
      </footer>
    </main>
  )
}
