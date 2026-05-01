/**
 * One-time audio pre-generation:
 * For every content item without an audioUrl in KV, call OpenAI tts-1 with the native text,
 * upload the resulting MP3 to Vercel Blob, and store the URL in KV.
 *
 * Run with: npx tsx scripts/generate-audio.ts
 *
 * Idempotent: re-running skips items that already have a URL in KV.
 * Pass --force to regenerate all items (will incur OpenAI charges again).
 * Pass --language=italian to limit to one language.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
import OpenAI from 'openai'
import { put } from '@vercel/blob'
import { kv } from '@vercel/kv'
import { allContent } from '../lib/content'
import type { ContentItem, Language } from '../lib/content/types'

const force = process.argv.includes('--force')
const langArg = process.argv.find((a) => a.startsWith('--language='))
const onlyLanguage = langArg?.split('=')[1] as Language | undefined

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const VOICE_BY_LANG: Record<Language, string> = {
  italian: 'nova',
  spanish: 'shimmer',
}

async function audioUrlKey(itemId: string): Promise<string> {
  return `audio:url:${itemId}`
}

async function getExistingUrl(itemId: string): Promise<string | null> {
  return (await kv.get<string>(await audioUrlKey(itemId))) ?? null
}

function nativeText(item: ContentItem): string {
  const t = item.language === 'italian' ? item.italian : item.spanish
  if (!t) throw new Error(`Item ${item.id} has no native text`)
  return t
}

async function generateOne(item: ContentItem): Promise<string> {
  const text = nativeText(item)
  const voice = VOICE_BY_LANG[item.language]

  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voice as 'nova' | 'shimmer' | 'alloy' | 'echo' | 'fable' | 'onyx',
    input: text,
    speed: 0.95,
  })

  const buffer = Buffer.from(await response.arrayBuffer())
  const filename = `${item.language}/${item.id.replace(/:/g, '__')}.mp3`

  const blob = await put(filename, buffer, {
    access: 'public',
    contentType: 'audio/mpeg',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  await kv.set(await audioUrlKey(item.id), blob.url)
  return blob.url
}

async function main() {
  const includeWarmups = process.argv.includes('--include-warmups')
  let items = onlyLanguage ? allContent.filter((i) => i.language === onlyLanguage) : allContent
  if (!includeWarmups) items = items.filter((i) => i.type !== 'warmup')
  console.log(`Audio pre-gen: ${items.length} items${onlyLanguage ? ` (${onlyLanguage} only)` : ''}${force ? ' [FORCE]' : ''}${includeWarmups ? ' [+warmups]' : ''}`)

  let generated = 0
  let skipped = 0
  let failed = 0
  const startedAt = Date.now()

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const prefix = `[${i + 1}/${items.length}] ${item.id}`

    if (!force) {
      const existing = await getExistingUrl(item.id)
      if (existing) {
        skipped++
        if (i % 50 === 0) console.log(`${prefix} -> skip (cached)`)
        continue
      }
    }

    try {
      const url = await generateOne(item)
      generated++
      console.log(`${prefix} -> ${url.substring(0, 80)}...`)
      await new Promise((r) => setTimeout(r, 350))
    } catch (err) {
      failed++
      console.error(`${prefix} -> FAILED: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const elapsedSec = Math.round((Date.now() - startedAt) / 1000)
  console.log(`\nDone in ${elapsedSec}s. generated=${generated} skipped=${skipped} failed=${failed}`)
  if (failed > 0) {
    console.error('Some items failed — re-run to retry.')
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
