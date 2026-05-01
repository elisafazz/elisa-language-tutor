export type Language = 'italian' | 'spanish'

export type Register = 'formal' | 'informal' | 'both'

export type Region = 'tuscany' | 'liguria' | 'sardinia' | 'general'

export type Difficulty = 1 | 2 | 3

export type ItemType = 'vocab' | 'phrase' | 'medical' | 'warmup'

export interface ContentItem {
  id: string
  type: ItemType
  language: Language
  italian?: string
  spanish?: string
  english: string
  audioUrl: string
  topic: string
  register: Register
  region?: Region
  difficulty: Difficulty
  notes?: string
}

export type ScenarioRole =
  | 'waiter'
  | 'barista'
  | 'hotel-clerk'
  | 'taxi-driver'
  | 'pharmacist'
  | 'shop-clerk'
  | 'customs-officer'
  | 'stranger-on-street'
  | 'train-station-attendant'

export interface ScenarioItem {
  id: string
  type: 'scenario'
  language: Language
  setting: string
  role: ScenarioRole
  systemPrompt: string
  topic: string
  register: 'formal' | 'informal'
  region?: Region
  difficulty: Difficulty
}

export type AnyItem = ContentItem | ScenarioItem

export function isScenario(item: AnyItem): item is ScenarioItem {
  return item.type === 'scenario'
}

export function getNativeText(item: ContentItem): string {
  return item.language === 'italian' ? item.italian! : item.spanish!
}
