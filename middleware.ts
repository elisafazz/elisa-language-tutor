import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_NAME, verifySession } from '@/lib/auth'

export const config = {
  matcher: ['/((?!login|api/auth|api/health|_next|favicon.ico|manifest.webmanifest|apple-touch-icon.png).*)'],
}

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME)?.value
  const ok = await verifySession(cookie)
  if (ok) return NextResponse.next()
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url)
}
