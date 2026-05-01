import type { Language } from './content/types'

export const LANG_STORAGE_KEY = 'lingua_lang'

export function readClientLanguage(): Language {
  if (typeof window === 'undefined') return 'italian'
  const v = window.localStorage.getItem(LANG_STORAGE_KEY)
  return v === 'spanish' ? 'spanish' : 'italian'
}

export function writeClientLanguage(lang: Language): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LANG_STORAGE_KEY, lang)
}
