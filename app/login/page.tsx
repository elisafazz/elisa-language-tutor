'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.replace('/')
      router.refresh()
    } else {
      const body = await res.json().catch(() => ({}))
      setError(body.error || 'login failed')
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white border border-line rounded-2xl p-8 shadow-sm"
      >
        <h1 className="font-serif text-3xl text-ink mb-2">Lingua</h1>
        <p className="text-sm text-muted mb-6">
          Italian + Spanish travel prep. Enter password.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          inputMode="text"
          className="w-full px-4 py-3 border border-line rounded-lg bg-cream text-ink focus:outline-none focus:border-sage"
          placeholder="password"
        />
        {error && <p className="mt-3 text-sm text-terra">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-5 w-full py-3 rounded-lg bg-ink text-cream font-medium hover:bg-sage-deep transition-colors disabled:opacity-50"
        >
          {busy ? 'checking...' : 'unlock'}
        </button>
      </form>
    </main>
  )
}
