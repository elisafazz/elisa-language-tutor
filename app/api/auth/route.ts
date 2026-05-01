import { NextResponse } from 'next/server'
import { COOKIE_NAME, signSession } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string }
  const expected = process.env.AUTH_PASSWORD
  if (!expected) {
    return NextResponse.json(
      { error: 'AUTH_PASSWORD not configured' },
      { status: 500 }
    )
  }
  if (body.password !== expected) {
    return NextResponse.json({ error: 'wrong password' }, { status: 401 })
  }
  const token = await signSession()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 })
  return res
}
