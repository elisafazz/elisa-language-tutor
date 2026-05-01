import { kv } from '@vercel/kv'

export function audioUrlKey(itemId: string): string {
  return `audio:url:${itemId}`
}

export async function getAudioUrl(itemId: string): Promise<string | null> {
  return (await kv.get<string>(audioUrlKey(itemId))) ?? null
}

export async function getAudioUrls(itemIds: string[]): Promise<Record<string, string>> {
  if (itemIds.length === 0) return {}
  const keys = itemIds.map(audioUrlKey)
  const values = await kv.mget<(string | null)[]>(...keys)
  const out: Record<string, string> = {}
  itemIds.forEach((id, i) => {
    const v = values[i]
    if (v) out[id] = v
  })
  return out
}
