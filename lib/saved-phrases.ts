const KEY = 'lingua-saved-phrases-v1'
const SEED_FLAG_KEY = 'lingua-saved-seeded-v1'
export const SAVED_EVENT = 'lingua-saved-changed'

/**
 * Seed the saved set with the given Italian phrases exactly ONCE per browser.
 * After first seeding, sets a flag so subsequent calls are no-ops. This means
 * if the user unsaves a seeded phrase later, it won't come back.
 */
export function seedSavedOnce(italianPhrases: string[]): void {
  if (typeof window === 'undefined') return
  try {
    if (localStorage.getItem(SEED_FLAG_KEY)) return
    const current = loadSaved()
    for (const it of italianPhrases) {
      current.add(makeSaveId(it))
    }
    persistSaved(current)
    localStorage.setItem(SEED_FLAG_KEY, '1')
  } catch {}
}

export function makeSaveId(italian: string): string {
  return italian
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9àèéìòù\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

export function loadSaved(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

export function persistSaved(s: Set<string>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(s)))
    window.dispatchEvent(new Event(SAVED_EVENT))
  } catch {}
}

export function toggleSaved(italian: string): boolean {
  const id = makeSaveId(italian)
  const s = loadSaved()
  if (s.has(id)) {
    s.delete(id)
    persistSaved(s)
    return false
  } else {
    s.add(id)
    persistSaved(s)
    return true
  }
}
