'use client'

import { useEffect, useState } from 'react'
import type { Language } from '@/lib/content/types'
import { readClientLanguage, writeClientLanguage } from '@/lib/language'

const OPTIONS: { id: Language; label: string }[] = [
  { id: 'italian', label: 'IT' },
  { id: 'spanish', label: 'ES' },
]

export default function LanguageToggle() {
  const [lang, setLang] = useState<Language>('italian')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLang(readClientLanguage())
    setMounted(true)
  }, [])

  function pick(next: Language) {
    setLang(next)
    writeClientLanguage(next)
  }

  if (!mounted) {
    return <div className="h-8 w-20" aria-hidden />
  }

  return (
    <div className="inline-flex rounded-full bg-white border border-line p-0.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => pick(opt.id)}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            lang === opt.id
              ? 'bg-ink text-cream'
              : 'text-muted hover:text-ink'
          }`}
          aria-pressed={lang === opt.id}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
