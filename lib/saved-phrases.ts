const KEY = 'lingua-saved-phrases-v1'
export const SAVED_EVENT = 'lingua-saved-changed'

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
