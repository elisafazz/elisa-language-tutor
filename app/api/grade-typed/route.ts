import { NextResponse } from 'next/server'
import { gradeTyped } from '@/lib/grading'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 })

  const { nativeText, expectedEnglish, typedAnswer } = body as {
    nativeText?: string
    expectedEnglish?: string
    typedAnswer?: string
  }

  if (!nativeText || !expectedEnglish || typeof typedAnswer !== 'string') {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  try {
    const result = await gradeTyped(nativeText, expectedEnglish, typedAnswer)
    return NextResponse.json(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
