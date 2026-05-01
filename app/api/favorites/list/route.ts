import { NextResponse } from 'next/server'
import { listFavorites } from '@/lib/favorites'
import { itemById } from '@/lib/content'
import { getAudioUrls } from '@/lib/audio'
import { getNativeText, isScenario, type ContentItem } from '@/lib/content/types'

export const runtime = 'nodejs'

export async function GET() {
  const ids = await listFavorites()
  const items: ContentItem[] = ids
    .map((id) => itemById(id))
    .filter((i): i is ContentItem => !!i && !isScenario(i))

  const audioMap = await getAudioUrls(items.map((i) => i.id))

  const out = items.map((i) => ({
    itemId: i.id,
    nativeText: getNativeText(i),
    english: i.english,
    audioUrl: audioMap[i.id] ?? null,
    topic: i.topic,
    register: i.register,
    region: i.region,
    type: i.type,
    notes: i.notes,
    language: i.language,
  }))

  return NextResponse.json({ items: out })
}
