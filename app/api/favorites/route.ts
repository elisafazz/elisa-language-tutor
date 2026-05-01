import { NextResponse } from 'next/server'
import { addFavorite, listFavorites, removeFavorite } from '@/lib/favorites'
import { itemById } from '@/lib/content'

export const runtime = 'nodejs'

export async function GET() {
  const ids = await listFavorites()
  return NextResponse.json({ ids })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 })

  const { itemId, save } = body as { itemId?: string; save?: boolean }
  if (!itemId || typeof save !== 'boolean') {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }
  if (!itemById(itemId)) {
    return NextResponse.json({ error: 'unknown item' }, { status: 404 })
  }

  if (save) await addFavorite(itemId)
  else await removeFavorite(itemId)

  return NextResponse.json({ ok: true, saved: save })
}
