'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import { makeSaveId, loadSaved, persistSaved, SAVED_EVENT } from '@/lib/saved-phrases'

type Props = {
  italian: string
  size?: 'sm' | 'md'
  className?: string
}

export default function SaveButton({ italian, size = 'sm', className = '' }: Props) {
  const id = makeSaveId(italian)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const refresh = () => setSaved(loadSaved().has(id))
    refresh()
    window.addEventListener(SAVED_EVENT, refresh)
    return () => window.removeEventListener(SAVED_EVENT, refresh)
  }, [id])

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    const s = loadSaved()
    if (s.has(id)) s.delete(id)
    else s.add(id)
    persistSaved(s)
    setSaved(s.has(id))
  }

  const sizeClass = size === 'md' ? 'text-2xl w-10 h-10' : 'text-lg w-8 h-8'

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove from saved' : 'Save to favorites'}
      className={`${sizeClass} flex items-center justify-center rounded-full hover:bg-cream/50 transition-colors shrink-0 ${
        saved ? 'text-gold' : 'text-muted/40'
      } ${className}`}
    >
      {saved ? '★' : '☆'}
    </button>
  )
}
