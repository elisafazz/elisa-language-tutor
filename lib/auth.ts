export const COOKIE_NAME = 'tutor_session'
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
  const [issuedAt, sig] = value.split('.')
  if (!issuedAt || !sig) return false
  const expected = await hmac(issuedAt)
  if (expected.length !== sig.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i)
  }
  return diff === 0
}
