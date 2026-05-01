import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, string> = {}

  try {
    await kv.get('_health:probe')
    checks.kv = 'ok'
  } catch (err) {
    checks.kv = `error: ${err instanceof Error ? err.message : String(err)}`
  }

  checks.anthropic_key = process.env.ANTHROPIC_API_KEY ? 'present' : 'missing'
  checks.openai_key = process.env.OPENAI_API_KEY ? 'present' : 'missing'
  checks.blob_token = process.env.BLOB_READ_WRITE_TOKEN ? 'present' : 'missing'

  const allOk =
    checks.kv === 'ok' &&
    checks.anthropic_key === 'present' &&
    checks.openai_key === 'present' &&
    checks.blob_token === 'present'

  return NextResponse.json({ ok: allOk, checks }, { status: allOk ? 200 : 503 })
}
