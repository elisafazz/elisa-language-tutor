import type { AnyItem, ContentItem, Language, ScenarioItem } from './types'
import { italianVocab } from './italian-vocab'
import { italianPhrases } from './italian-phrases'
import { italianMedical } from './italian-medical'
import { italianWarmups } from './italian-warmups'
import { italianScenarios } from './italian-scenarios'
import { spanishVocab } from './spanish-vocab'
import { spanishPhrases } from './spanish-phrases'

export const allContent: ContentItem[] = [
  ...italianVocab,
  ...italianPhrases,
  ...italianMedical,
  ...italianWarmups,
  ...spanishVocab,
  ...spanishPhrases,
]

export const allScenarios: ScenarioItem[] = [...italianScenarios]

export const allItems: AnyItem[] = [...allContent, ...allScenarios]

export function itemsByLanguage(lang: Language): ContentItem[] {
  return allContent.filter((i) => i.language === lang)
}

export function scenariosByLanguage(lang: Language): ScenarioItem[] {
  return allScenarios.filter((s) => s.language === lang)
}

export function itemById(id: string): AnyItem | undefined {
  return allItems.find((i) => i.id === id)
}

export const contentStats = {
  italianVocab: italianVocab.length,
  italianPhrases: italianPhrases.length,
  italianMedical: italianMedical.length,
  italianWarmups: italianWarmups.length,
  italianScenarios: italianScenarios.length,
  spanishVocab: spanishVocab.length,
  spanishPhrases: spanishPhrases.length,
  totalItalian:
    italianVocab.length +
    italianPhrases.length +
    italianMedical.length +
    italianWarmups.length +
    italianScenarios.length,
  totalSpanish: spanishVocab.length + spanishPhrases.length,
  total: allItems.length,
}

export {
  italianVocab,
  italianPhrases,
  italianMedical,
  italianWarmups,
  italianScenarios,
  spanishVocab,
  spanishPhrases,
}
