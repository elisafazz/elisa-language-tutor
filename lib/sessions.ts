import { kv } from '@vercel/kv'
import type { Language } from './content/types'

const USER = 'elisa'

export interface SessionSummary {
  patterns: string[]
  recordedAt: string
  missesAnalyzed: number
}

function key(language: Language): string {
  return `user:${USER}:lang:${language}:session_summary`
}

export async function getSessionSummary(language: Language): Promise<SessionSummary | null> {
  return (await kv.get<SessionSummary>(key(language))) ?? null
}

export async function setSessionSummary(
  language: Language,
  summary: SessionSummary
): Promise<void> {
  await kv.set(key(language), summary, { ex: 60 * 60 * 24 * 7 })
}
