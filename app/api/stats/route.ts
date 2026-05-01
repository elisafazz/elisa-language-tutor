import { NextResponse } from 'next/server'
import { State, type Card } from 'ts-fsrs'
import { loadAllCards } from '@/lib/fsrs'
import { listFavorites } from '@/lib/favorites'
import { itemById, contentStats } from '@/lib/content'
import { isScenario } from '@/lib/content/types'

export const runtime = 'nodejs'

interface CardSummary {
  total: number
  learning: number
  review: number
  relearning: number
  due: number
  lapses: number
}

function summarize(cards: Map<string, Card>): CardSummary {
  const now = Date.now()
  let learning = 0
  let review = 0
  let relearning = 0
  let due = 0
  let lapses = 0
  for (const card of cards.values()) {
    lapses += card.lapses
    if (card.state === State.Learning) learning++
    else if (card.state === State.Review) review++
    else if (card.state === State.Relearning) relearning++
    if (card.due.getTime() <= now) due++
  }
  return { total: cards.size, learning, review, relearning, due, lapses }
}

export async function GET() {
  const [italian, spanish, favIds] = await Promise.all([
    loadAllCards('italian'),
    loadAllCards('spanish'),
    listFavorites(),
  ])

  const topicWeakness = new Map<string, { lapses: number; total: number }>()
  for (const cards of [italian, spanish]) {
    for (const [itemId, card] of cards.entries()) {
      const item = itemById(itemId)
      if (!item || isScenario(item)) continue
      const key = `${item.language}:${item.topic}`
      const cur = topicWeakness.get(key) ?? { lapses: 0, total: 0 }
      cur.lapses += card.lapses
      cur.total += 1
      topicWeakness.set(key, cur)
    }
  }

  const weakTopics = Array.from(topicWeakness.entries())
    .filter(([, v]) => v.lapses > 0)
    .map(([key, v]) => ({ key, lapses: v.lapses, total: v.total }))
    .sort((a, b) => b.lapses - a.lapses)
    .slice(0, 5)

  return NextResponse.json({
    italian: summarize(italian),
    spanish: summarize(spanish),
    favorites: favIds.length,
    corpus: contentStats,
    weakTopics,
  })
}
