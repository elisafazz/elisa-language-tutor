import { fsrs, generatorParameters, Card, Rating, createEmptyCard, State, type Grade } from 'ts-fsrs'
import { kv } from '@vercel/kv'

const params = generatorParameters({ enable_fuzz: true, maximum_interval: 30 })
export const scheduler = fsrs(params)

const USER = 'elisa'

export type StoredCard = Omit<Card, 'due' | 'last_review'> & {
  due: string
  last_review?: string
}

export type CardWithMeta = StoredCard & {
  itemId: string
}

function cardKey(language: string, itemId: string): string {
  return `user:${USER}:lang:${language}:fsrs:${itemId}`
}

function userCardsIndexKey(language: string): string {
  return `user:${USER}:lang:${language}:fsrs:_index`
}

function serializeCard(card: Card): StoredCard {
  return {
    ...card,
    due: card.due.toISOString(),
    last_review: card.last_review?.toISOString(),
  }
}

function deserializeCard(stored: StoredCard): Card {
  return {
    ...stored,
    due: new Date(stored.due),
    last_review: stored.last_review ? new Date(stored.last_review) : undefined,
  } as Card
}

export async function loadCard(language: string, itemId: string): Promise<Card> {
  const stored = await kv.get<StoredCard>(cardKey(language, itemId))
  if (stored) return deserializeCard(stored)
  return createEmptyCard(new Date())
}

export async function saveCard(language: string, itemId: string, card: Card): Promise<void> {
  await kv.set(cardKey(language, itemId), serializeCard(card))
  await kv.sadd(userCardsIndexKey(language), itemId)
}

export async function listCardIds(language: string): Promise<string[]> {
  const ids = await kv.smembers(userCardsIndexKey(language))
  return ids ?? []
}

export async function loadAllCards(language: string): Promise<Map<string, Card>> {
  const ids = await listCardIds(language)
  const map = new Map<string, Card>()
  if (ids.length === 0) return map
  for (const id of ids) {
    const stored = await kv.get<StoredCard>(cardKey(language, id))
    if (stored) map.set(id, deserializeCard(stored))
  }
  return map
}

export function rateCard(card: Card, rating: Grade): Card {
  const result = scheduler.next(card, new Date(), rating)
  return result.card
}

export { Rating, State }
