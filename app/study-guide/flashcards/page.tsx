'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { buildAllFlashcards, type Flashcard, type FlashcardCategory } from '@/lib/flashcards-data'

type Direction = 'it-en' | 'en-it'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FlashcardsPage() {
  const categories = useMemo<FlashcardCategory[]>(() => buildAllFlashcards(), [])
  const allCardsCategory: FlashcardCategory = useMemo(
    () => ({ id: 'all', label: 'All', cards: categories.flatMap((c) => c.cards) }),
    [categories]
  )

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all')
  const [direction, setDirection] = useState<Direction>('it-en')
  const [shuffled, setShuffled] = useState(false)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [order, setOrder] = useState<number[]>([])

  const activeCategory = selectedCategoryId === 'all'
    ? allCardsCategory
    : categories.find((c) => c.id === selectedCategoryId) ?? allCardsCategory

  // Build the order array whenever category or shuffle changes
  useEffect(() => {
    const base = activeCategory.cards.map((_, i) => i)
    setOrder(shuffled ? shuffle(base) : base)
    setIndex(0)
    setFlipped(false)
  }, [activeCategory, shuffled])

  const card: Flashcard | undefined = activeCategory.cards[order[index]]
  const total = activeCategory.cards.length

  function next() {
    if (index < total - 1) {
      setIndex(index + 1)
      setFlipped(false)
    }
  }
  function prev() {
    if (index > 0) {
      setIndex(index - 1)
      setFlipped(false)
    }
  }
  function reshuffle() {
    setOrder(shuffle(activeCategory.cards.map((_, i) => i)))
    setIndex(0)
    setFlipped(false)
  }

  const front = direction === 'it-en' ? card?.italian : card?.english
  const back = direction === 'it-en' ? card?.english : card?.italian

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto flex flex-col">
      <header className="flex items-center justify-between mb-4">
        <Link href="/study-guide" className="text-sm text-muted hover:text-ink">
          ← Study Guide
        </Link>
        <span className="text-xs text-muted">Flashcards</span>
      </header>

      <div className="mb-4">
        <h1 className="font-serif text-2xl text-ink">Flashcards</h1>
        <p className="text-xs text-muted mt-0.5">Tap card to flip. Works offline.</p>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setDirection('it-en')}
          className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wide ${
            direction === 'it-en' ? 'bg-ink text-cream' : 'bg-white text-muted border border-line'
          }`}
        >
          IT → EN
        </button>
        <button
          onClick={() => setDirection('en-it')}
          className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wide ${
            direction === 'en-it' ? 'bg-ink text-cream' : 'bg-white text-muted border border-line'
          }`}
        >
          EN → IT
        </button>
        <button
          onClick={() => setShuffled((s) => !s)}
          className={`px-3 py-2 rounded-lg text-xs uppercase tracking-wide ${
            shuffled ? 'bg-gold/30 text-ink' : 'bg-white text-muted border border-line'
          }`}
        >
          {shuffled ? 'Shuffled' : 'Shuffle'}
        </button>
      </div>

      <div className="mb-4">
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-ink"
        >
          <option value="all">All categories ({allCardsCategory.cards.length} cards)</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label} ({c.cards.length})
            </option>
          ))}
        </select>
      </div>

      {card ? (
        <>
          <div className="text-center mb-2">
            <span className="text-xs text-muted">
              {index + 1} / {total}
            </span>
          </div>

          <button
            onClick={() => setFlipped((f) => !f)}
            className={`flex-1 min-h-[260px] mb-4 rounded-2xl border-2 transition-colors px-6 py-8 flex flex-col items-center justify-center text-center ${
              flipped ? 'bg-ink text-cream border-ink' : 'bg-white text-ink border-line'
            }`}
          >
            <p className="text-[10px] uppercase tracking-wide opacity-60 mb-3">
              {flipped ? (direction === 'it-en' ? 'English' : 'Italian') : (direction === 'it-en' ? 'Italian' : 'English')}
            </p>
            <p className={`font-serif text-2xl leading-snug whitespace-pre-wrap ${flipped ? 'text-cream' : 'text-ink'}`}>
              {flipped ? back : front}
            </p>
            {flipped && card.note && (
              <p className={`text-xs italic mt-4 opacity-75 whitespace-pre-wrap ${flipped ? 'text-cream' : 'text-muted'}`}>
                {card.note}
              </p>
            )}
            <p className={`text-[10px] mt-6 opacity-50`}>
              {flipped ? 'Tap to hide' : 'Tap to reveal'}
            </p>
          </button>

          <div className="flex gap-2 mb-4">
            <button
              onClick={prev}
              disabled={index === 0}
              className="flex-1 py-3 rounded-lg border border-line bg-white text-ink font-medium disabled:opacity-30"
            >
              ← Prev
            </button>
            <button
              onClick={reshuffle}
              className="px-4 py-3 rounded-lg border border-line bg-white text-muted text-sm"
              aria-label="Reshuffle"
            >
              ⟳
            </button>
            <button
              onClick={next}
              disabled={index === total - 1}
              className="flex-1 py-3 rounded-lg bg-ink text-cream font-medium disabled:opacity-30"
            >
              Next →
            </button>
          </div>

          <p className="text-center text-[10px] uppercase tracking-wide text-muted">
            {card.category}
          </p>
        </>
      ) : (
        <p className="text-center text-muted text-sm mt-12">No cards in this category.</p>
      )}
    </main>
  )
}
