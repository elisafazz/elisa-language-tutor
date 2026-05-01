import { NextResponse } from 'next/server'
import { gradeTyped } from '@/lib/grading'
import { itemById } from '@/lib/content'
import { getNativeText, isScenario } from '@/lib/content/types'

export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_TYPED_LEN = 500

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 })

  const { itemId, typedAnswer } = body as {
    itemId?: string
    typedAnswer?: string
  }

  if (!itemId || typeof typedAnswer !== 'string') {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }
  if (typedAnswer.length > MAX_TYPED_LEN) {
    return NextResponse.json({ error: 'typed answer too long' }, { status: 400 })
  }

  const item = itemById(itemId)
  if (!item || isScenario(item)) {
    return NextResponse.json({ error: 'unknown item' }, { status: 404 })
  }

  try {
    const result = await gradeTyped(getNativeText(item), item.english, typedAnswer)
    return NextResponse.json(result)
  } catch (err) {
    console.error('grade-typed error:', err)
    return NextResponse.json({ error: 'grading failed' }, { status: 500 })
  }
}
