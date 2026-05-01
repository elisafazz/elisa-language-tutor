import type { ContentItem } from './types'

const w = (
  id: string,
  italian: string,
  english: string,
  difficulty: ContentItem['difficulty'],
  notes?: string
): ContentItem => ({
  id: `warmup:${id}`,
  type: 'warmup',
  language: 'italian',
  italian,
  english,
  audioUrl: '',
  topic: 'warmup',
  register: 'both',
  difficulty,
  notes,
})

export const italianWarmups: ContentItem[] = [
  w('trentini', 'trentatré trentini entrarono a Trento, tutti e trentatré trotterellando', '33 Trentines entered Trento, all 33 trotting along', 1, 'The classic. Tests rolled R and tt clusters. Repeat 3x at increasing speed.'),
  w('apelle', "Apelle figlio d'Apollo fece una palla di pelle di pollo", "Apelle son of Apollo made a ball of chicken skin", 2, 'Tests double consonants and the p/l alternation.'),
  w('sopra-la-panca', 'sopra la panca la capra campa, sotto la panca la capra crepa', 'above the bench the goat lives, below the bench the goat dies', 2, 'p/c/r consonant cluster drill. Watch the v/p softening.'),
  w('tigre', 'tigre contro tigre', 'tiger against tiger', 1, 'Short rolled-R warmup. Repeat 5x.'),
  w('porta-aperta', 'porta aperta per chi porta, chi non porta parta pure, poco importa', 'open door for whoever brings, whoever brings nothing may leave, it matters little', 3, 'Advanced — tests rhythm and the unstressed schwa drift heritage speakers fall into.'),
  w('al-pozzo', 'al pozzo dei pazzi una pazza lavava le pezze, andò un pazzo e cacciò la pazza che lavava le pezze al pozzo dei pazzi', 'at the well of the crazies, a crazy woman was washing rags, a crazy man came and chased away the crazy woman who was washing rags at the well of the crazies', 3, 'z and zz drill. Real challenge.'),
  w('a-quest-ora', "a quest'ora il questore in questura non c'è", "at this hour the police chief is not at the station", 2, 'qu cluster drill.'),
  w('caro-conte', "caro conte, chi ti canta tanto canta che t'incanta", "dear count, whoever sings to you sings so much that it enchants you", 2, 'c hard/soft alternation.'),
  w('orologio', "ho orologi e oranzi e ranzi orari", "I have watches and oranges and bunched schedules", 1, 'Vowel cluster drill.'),
  w('trentitre', 'tre tigri contro tre tigri', 'three tigers against three tigers', 1, 'Easier rolled-R warmup. Heritage speakers often lose the trill — this brings it back.'),
]
