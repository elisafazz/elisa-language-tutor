import { kv } from '@vercel/kv'

const USER = 'elisa'

function favoritesKey(): string {
  return `user:${USER}:favorites`
}

export async function listFavorites(): Promise<string[]> {
  const ids = await kv.smembers(favoritesKey())
  return ids ?? []
}

export async function isFavorite(itemId: string): Promise<boolean> {
  const result = await kv.sismember(favoritesKey(), itemId)
  return result === 1
}

export async function addFavorite(itemId: string): Promise<void> {
  await kv.sadd(favoritesKey(), itemId)
}

export async function removeFavorite(itemId: string): Promise<void> {
  await kv.srem(favoritesKey(), itemId)
}
