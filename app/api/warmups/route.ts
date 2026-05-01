import { NextResponse } from 'next/server'
import { italianWarmups } from '@/lib/content'
import { getAudioUrls } from '@/lib/audio'
import { getNativeText } from '@/lib/content/types'

export const runtime = 'nodejs'

export async function GET() {
  const items = italianWarmups
  const audioMap = await getAudioUrls(items.map((i) => i.id))
  return NextResponse.json({
    items: items.map((i) => ({
      itemId: i.id,
      nativeText: getNativeText(i),
      english: i.english,
      audioUrl: audioMap[i.id] ?? null,
      notes: i.notes,
      difficulty: i.difficulty,
    })),
  })
}
