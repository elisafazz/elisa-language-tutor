import { NextResponse } from 'next/server'
import { itemsByLanguage } from '@/lib/content'
import type { Language, ContentItem } from '@/lib/content/types'
import { getNativeText } from '@/lib/content/types'
import { loadAllCards } from '@/lib/fsrs'
import { getAudioUrl } from '@/lib/audio'
import { State, type Card } from 'ts-fsrs'

export const runtime = 'nodejs'

interface DrillCardOut {
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

function pickNext(items: ContentItem[], cards: Map<string, Card>): ContentItem | null {
  if (items.length === 0) return null
  const now = Date.now()

  const newItems = items.filter((i) => !cards.has(i.id))
  const learning: { item: ContentItem; due: number }[] = []
  const review: { item: ContentItem; due: number }[] = []

  for (const item of items) {
    const card = cards.get(item.id)
    if (!card) continue
    const due = card.due.getTime()
    if (card.state === State.Learning || card.state === State.Relearning) {
      if (due <= now) learning.push({ item, due })
    } else if (card.state === State.Review) {
      if (due <= now) review.push({ item, due })
    }
  }

  learning.sort((a, b) => a.due - b.due)
  review.sort((a, b) => a.due - b.due)

  if (learning.length > 0) return learning[0].item
  if (review.length > 0) return review[0].item
  if (newItems.length > 0) {
    const idx = Math.floor(Math.random() * newItems.length)
    return newItems[idx]
  }
  if (items.length > 0) {
    const idx = Math.floor(Math.random() * items.length)
    return items[idx]
  }
  return null
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const language = (searchParams.get('language') || 'italian') as Language
  const exclude = searchParams.get('exclude')?.split(',').filter(Boolean) ?? []

  const allItems = itemsByLanguage(language).filter(
    (i) => i.type !== 'warmup' && !exclude.includes(i.id)
  )
  const cards = await loadAllCards(language)

  const item = pickNext(allItems, cards)
  if (!item) return NextResponse.json({ item: null })

  const audioUrl = await getAudioUrl(item.id)
  const card = cards.get(item.id)

  const out: DrillCardOut = {
    itemId: item.id,
    nativeText: getNativeText(item),
    expectedEnglish: item.english,
    audioUrl,
    topic: item.topic,
    register: item.register,
    region: item.region,
    difficulty: item.difficulty,
    notes: item.notes,
    state: card?.state ?? State.New,
    reps: card?.reps ?? 0,
  }
  return NextResponse.json({ item: out })
}
