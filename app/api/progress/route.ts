import { NextResponse } from 'next/server'
import { Rating, type Grade } from 'ts-fsrs'
import { loadCard, rateCard, saveCard } from '@/lib/fsrs'
import type { Language } from '@/lib/content/types'

export const runtime = 'nodejs'

const RATING_VALUES = new Set<number>([Rating.Again, Rating.Hard, Rating.Good, Rating.Easy])

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 })

  const { language, itemId, rating } = body as {
    language?: Language
    itemId?: string
    rating?: number
  }

  if (!language || !itemId || typeof rating !== 'number' || !RATING_VALUES.has(rating)) {
    return NextResponse.json({ error: 'missing or invalid fields' }, { status: 400 })
  }

  const card = await loadCard(language, itemId)
  const next = rateCard(card, rating as Grade)
  await saveCard(language, itemId, next)

  return NextResponse.json({
    ok: true,
    state: next.state,
    due: next.due.toISOString(),
    reps: next.reps,
    lapses: next.lapses,
  })
}
