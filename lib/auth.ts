export const COOKIE_NAME = 'tutor_session'
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000
const ENCODER = new TextEncoder()

function secret() {
  const s = process.env.AUTH_SECRET
  if (!s) throw new Error('AUTH_SECRET missing')
  return s
}

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    ENCODER.encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, ENCODER.encode(value))
  const bytes = new Uint8Array(sig)
  let s = ''
  for (let i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, '0')
  return s
}

export async function signSession(): Promise<string> {
  const issuedAt = Date.now().toString()
  const sig = await hmac(issuedAt)
  return `${issuedAt}.${sig}`
}

export async function verifySession(value: string | undefined): Promise<boolean> {
  if (!value) return false
  const parts = value.split('.')
  if (parts.length !== 2) return false
  const [issuedAt, sig] = parts
  if (!issuedAt || !sig) return false
  const issuedAtMs = Number(issuedAt)
  if (!Number.isFinite(issuedAtMs)) return false
  if (Date.now() - issuedAtMs > SESSION_MAX_AGE_MS) return false
  const expected = await hmac(issuedAt)
  if (expected.length !== sig.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i)
  }
  return diff === 0
}
