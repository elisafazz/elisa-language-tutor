import { NextResponse } from 'next/server'
import { scenariosByLanguage } from '@/lib/content'
import type { Language } from '@/lib/content/types'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const language = (searchParams.get('language') || 'italian') as Language
  const scenarios = scenariosByLanguage(language).map((s) => ({
    id: s.id,
    setting: s.setting,
    role: s.role,
    topic: s.topic,
    register: s.register,
    region: s.region,
    difficulty: s.difficulty,
  }))
  return NextResponse.json({ scenarios })
}
