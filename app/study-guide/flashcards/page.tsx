'use client'

import { useMemo, useState, useEffect } from 'react'
import { buildAllFlashcards, type Flashcard, type FlashcardCategory } from '@/lib/flashcards-data'
import SaveButton from '@/components/SaveButton'
import { loadSaved, makeSaveId, SAVED_EVENT } from '@/lib/saved-phrases'

type Direction = 'it-en' | 'en-it'
type Mode = 'browse' | 'got-it' | 'review'

const GOT_IT_PILE_KEY = 'lingua-flashcards-got-it-v1'
const REVIEW_PILE_KEY = 'lingua-flashcards-review-v2'
const LEGACY_YES_PILE_KEY = 'lingua-flashcards-yes-v1'
const LEGACY_NO_PILE_KEY = 'lingua-flashcards-no-v1'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function loadPile(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch {
    return new Set()
  }
}

function savePile(key: string, pile: Set<string>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(pile)))
  } catch {}
}

export default function FlashcardsPage() {
  const categories = useMemo<FlashcardCategory[]>(() => buildAllFlashcards(), [])
  const allCardsCategory: FlashcardCategory = useMemo(
    () => ({ id: 'all', label: 'All', cards: categories.flatMap((c) => c.cards) }),
    [categories]
  )

  const [yesPile, setYesPile] = useState<Set<string>>(new Set())
  const [noPile, setNoPile] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const gotItPile = loadPile(GOT_IT_PILE_KEY)
    const reviewPile = loadPile(REVIEW_PILE_KEY)
    if (gotItPile.size === 0) {
      for (const id of loadPile(LEGACY_YES_PILE_KEY)) gotItPile.add(id)
    }
    if (reviewPile.size === 0) {
      for (const id of loadPile(LEGACY_NO_PILE_KEY)) reviewPile.add(id)
    }
    setYesPile(gotItPile)
    setNoPile(reviewPile)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) savePile(GOT_IT_PILE_KEY, yesPile)
  }, [yesPile, hydrated])

  useEffect(() => {
    if (hydrated) savePile(REVIEW_PILE_KEY, noPile)
  }, [noPile, hydrated])

  const [mode, setMode] = useState<Mode>('browse')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all')
  const [direction, setDirection] = useState<Direction>('it-en')
  const [shuffled, setShuffled] = useState(false)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [order, setOrder] = useState<number[]>([])

  const yesCards = useMemo(
    () => allCardsCategory.cards.filter((c) => yesPile.has(c.id)),
    [allCardsCategory, yesPile]
  )

  const noCards = useMemo(
    () => allCardsCategory.cards.filter((c) => noPile.has(c.id)),
    [allCardsCategory, noPile]
  )

  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  useEffect(() => {
    const refresh = () => setSavedIds(loadSaved())
    refresh()
    window.addEventListener(SAVED_EVENT, refresh)
    return () => window.removeEventListener(SAVED_EVENT, refresh)
  }, [])

  const savedCards = useMemo(
    () => allCardsCategory.cards.filter((c) => savedIds.has(makeSaveId(c.italian))),
    [allCardsCategory, savedIds]
  )

  const activeCategory: FlashcardCategory = useMemo(() => {
    if (mode === 'got-it') {
      return { id: 'got-it', label: 'Got It Pile', cards: yesCards }
    }
    if (mode === 'review') {
      return { id: 'review', label: 'Review Pile', cards: noCards }
    }
    if (selectedCategoryId === 'saved') {
      return { id: 'saved', label: '★ Saved (Favorites)', cards: savedCards }
    }
    if (selectedCategoryId === 'all') return allCardsCategory
    return categories.find((c) => c.id === selectedCategoryId) ?? allCardsCategory
  }, [mode, yesCards, noCards, selectedCategoryId, savedCards, allCardsCategory, categories])

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
    } else {
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

  function markYes() {
    if (!card) return
    setYesPile((prev) => {
      const n = new Set(prev)
      n.add(card.id)
      return n
    })
    setNoPile((prev) => {
      const n = new Set(prev)
      n.delete(card.id)
      return n
    })
    next()
  }

  function markNo() {
    if (!card) return
    setNoPile((prev) => {
      const n = new Set(prev)
      n.add(card.id)
      return n
    })
    setYesPile((prev) => {
      const n = new Set(prev)
      n.delete(card.id)
      return n
    })
    next()
  }

  function clearActivePile() {
    if (mode === 'got-it') {
      if (typeof window !== 'undefined' && !window.confirm(`Clear ${yesPile.size} cards from the got it pile?`)) return
      setYesPile(new Set())
      setMode('browse')
    }
    if (mode === 'review') {
      if (typeof window !== 'undefined' && !window.confirm(`Clear ${noPile.size} cards from the review pile?`)) return
      setNoPile(new Set())
      setMode('browse')
    }
  }

  const front = direction === 'it-en' ? card?.italian : card?.english
  const back = direction === 'it-en' ? card?.english : card?.italian
  const inYesPile = card ? yesPile.has(card.id) : false
  const inNoPile = card ? noPile.has(card.id) : false

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto flex flex-col">
      <header className="flex items-center justify-between mb-4">
        <a href="/study-guide" className="text-sm text-muted hover:text-ink">
          ← Study Guide
        </a>
        <span className="text-xs text-muted">Flashcards</span>
      </header>

      <div className="mb-4">
        <h1 className="font-serif text-2xl text-ink">Flashcards</h1>
        <p className="text-xs text-muted mt-0.5">Tap card to flip. Mark Got it or Review to build offline piles.</p>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode('browse')}
          className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wide ${
            mode === 'browse' ? 'bg-ink text-cream' : 'bg-white text-muted border border-line'
          }`}
        >
          Browse
        </button>
        <button
          onClick={() => setMode('got-it')}
          disabled={yesPile.size === 0}
          className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wide ${
            mode === 'got-it' ? 'bg-sage text-cream' : 'bg-white text-sage border border-sage/40 disabled:opacity-40 disabled:border-line disabled:text-muted'
          }`}
        >
          Got it ({yesPile.size})
        </button>
        <button
          onClick={() => setMode('review')}
          disabled={noPile.size === 0}
          className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wide ${
            mode === 'review' ? 'bg-terra text-cream' : 'bg-white text-terra border border-terra/40 disabled:opacity-40 disabled:border-line disabled:text-muted'
          }`}
        >
          Review ({noPile.size})
        </button>
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

      {mode === 'browse' && (
        <div className="mb-4">
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-ink"
          >
            <option value="all">All categories ({allCardsCategory.cards.length} cards)</option>
            {savedCards.length > 0 && (
              <option value="saved">★ Saved / Favorites ({savedCards.length})</option>
            )}
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} ({c.cards.length})
              </option>
            ))}
          </select>
        </div>
      )}

      {mode !== 'browse' && (
        <div className={`mb-4 flex items-center justify-between p-3 rounded-lg border ${
          mode === 'got-it' ? 'bg-sage/10 border-sage/30' : 'bg-terra/10 border-terra/30'
        }`}>
          <p className="text-xs text-ink">
            Drilling <span className="font-medium">{mode === 'got-it' ? yesPile.size : noPile.size}</span> card{(mode === 'got-it' ? yesPile.size : noPile.size) !== 1 ? 's' : ''} in the {mode === 'got-it' ? 'got it' : 'review'} pile.
          </p>
          <button
            onClick={clearActivePile}
            className={`text-xs underline hover:no-underline ${mode === 'got-it' ? 'text-sage-deep' : 'text-terra'}`}
          >
            Clear
          </button>
        </div>
      )}

      {card ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">
              {index + 1} / {total}
            </span>
            {inYesPile && (
              <span className="text-[10px] uppercase tracking-wide text-sage">In got it pile</span>
            )}
            {inNoPile && (
              <span className="text-[10px] uppercase tracking-wide text-terra">In review pile</span>
            )}
          </div>

          <button
            onClick={() => setFlipped((f) => !f)}
            className={`flex-1 min-h-[240px] mb-4 rounded-2xl border-2 transition-colors px-6 py-8 flex flex-col items-center justify-center text-center ${
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

          {flipped ? (
            <div className="flex gap-2 mb-3">
              <button
                onClick={markNo}
                className="flex-1 py-4 rounded-lg bg-terra text-cream font-medium text-lg"
              >
                Review
              </button>
              <button
                onClick={markYes}
                className="flex-1 py-4 rounded-lg bg-sage text-cream font-medium text-lg"
              >
                Got it
              </button>
            </div>
          ) : (
            <div className="flex gap-2 mb-3">
              <button
                onClick={prev}
                disabled={index === 0}
                className="flex-1 py-3 rounded-lg border border-line bg-white text-ink font-medium disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                onClick={() => setFlipped(true)}
                className="flex-1 py-3 rounded-lg bg-ink text-cream font-medium"
              >
                Flip
              </button>
              <button
                onClick={next}
                disabled={index === total - 1}
                className="flex-1 py-3 rounded-lg border border-line bg-white text-ink font-medium disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] uppercase tracking-wide text-muted flex-1 truncate">
              {card.category}
            </p>
            <SaveButton italian={card.italian} size="md" />
            <button
              onClick={reshuffle}
              className="text-xs text-muted hover:text-ink"
              aria-label="Reshuffle"
            >
              ⟳ Reshuffle
            </button>
          </div>
        </>
      ) : mode !== 'browse' ? (
        <div className="text-center mt-12">
          <p className="text-muted text-sm mb-3">{mode === 'got-it' ? 'Got it' : 'Review'} pile is empty.</p>
          <button
            onClick={() => setMode('browse')}
            className="text-xs text-ink underline"
          >
            Go back to Browse
          </button>
        </div>
      ) : (
        <p className="text-center text-muted text-sm mt-12">No cards in this category.</p>
      )}
    </main>
  )
}
