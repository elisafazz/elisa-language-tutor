import { NextResponse } from 'next/server'
import { Rating, type Grade } from 'ts-fsrs'
import { loadCard, rateCard, saveCard } from '@/lib/fsrs'
import { itemById } from '@/lib/content'
import { isScenario } from '@/lib/content/types'

export const runtime = 'nodejs'

const RATING_VALUES = new Set<number>([Rating.Again, Rating.Hard, Rating.Good, Rating.Easy])

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 })

  const { itemId, rating } = body as {
    itemId?: string
    rating?: number
  }

  if (!itemId || typeof rating !== 'number' || !RATING_VALUES.has(rating)) {
    return NextResponse.json({ error: 'missing or invalid fields' }, { status: 400 })
  }

  const item = itemById(itemId)
  if (!item || isScenario(item)) {
    return NextResponse.json({ error: 'unknown item' }, { status: 404 })
  }

  const card = await loadCard(item.language, itemId)
  const next = rateCard(card, rating as Grade)
  await saveCard(item.language, itemId, next)

  return NextResponse.json({
    ok: true,
    state: next.state,
    due: next.due.toISOString(),
    reps: next.reps,
    lapses: next.lapses,
  })
}
