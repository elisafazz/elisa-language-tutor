import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null

export function anthropic(): Anthropic {
  if (_client) return _client
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY missing')
  _client = new Anthropic({ apiKey })
  return _client
}

export const HAIKU = 'claude-haiku-4-5-20251001'
export const SONNET = 'claude-sonnet-4-6'
