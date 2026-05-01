export interface RefresherDrill {
  id: string
  category: 'register-shift' | 'gender' | 'past-tense' | 'numbers'
  prompt: string
  hint?: string
  answer: string
  altAnswers?: string[]
  notes?: string
}

export const italianRefresher: RefresherDrill[] = [
  // Register shift: tu -> Lei
  {
    id: 'reg:come-stai',
    category: 'register-shift',
    prompt: 'Make formal: "come stai?"',
    hint: 'tu → Lei',
    answer: 'come sta?',
    notes: 'Lei takes 3rd person singular conjugation.',
  },
  {
    id: 'reg:cosa-vuoi',
    category: 'register-shift',
    prompt: 'Make formal: "cosa vuoi?"',
    hint: 'tu → Lei',
    answer: 'cosa vuole?',
  },
  {
    id: 'reg:dove-abiti',
    category: 'register-shift',
    prompt: 'Make formal: "dove abiti?"',
    hint: 'tu → Lei',
    answer: 'dove abita?',
  },
  {
    id: 'reg:puoi-aiutarmi',
    category: 'register-shift',
    prompt: 'Make formal: "puoi aiutarmi?"',
    hint: 'tu → Lei',
    answer: 'può aiutarmi?',
  },
  {
    id: 'reg:hai-tempo',
    category: 'register-shift',
    prompt: 'Make formal: "hai tempo?"',
    hint: 'tu → Lei',
    answer: 'ha tempo?',
  },
  {
    id: 'reg:sei-italiano',
    category: 'register-shift',
    prompt: 'Make formal: "sei italiano?"',
    hint: 'tu → Lei',
    answer: 'è italiano?',
    altAnswers: ['e italiano?'],
  },
  {
    id: 'reg:come-ti-chiami',
    category: 'register-shift',
    prompt: 'Make formal: "come ti chiami?"',
    hint: 'tu → Lei',
    answer: 'come si chiama?',
  },
  {
    id: 'reg:dimmi',
    category: 'register-shift',
    prompt: 'Make formal: "dimmi"',
    hint: 'imperative tu → Lei',
    answer: 'mi dica',
  },
  {
    id: 'reg:scusami',
    category: 'register-shift',
    prompt: 'Make formal: "scusami"',
    hint: 'imperative tu → Lei',
    answer: 'mi scusi',
  },
  {
    id: 'reg:siediti',
    category: 'register-shift',
    prompt: 'Make formal: "siediti"',
    hint: 'imperative tu → Lei',
    answer: 'si sieda',
  },

  // Gender / articles
  {
    id: 'gen:problema',
    category: 'gender',
    prompt: 'Article + word: ___ problema',
    hint: 'masc/fem? pluralize too',
    answer: 'il problema',
    notes: 'Greek-origin masc nouns ending in -ma. Plural: i problemi.',
  },
  {
    id: 'gen:mano',
    category: 'gender',
    prompt: 'Article + word: ___ mano',
    hint: 'masc/fem?',
    answer: 'la mano',
    notes: 'Feminine despite -o ending. Plural: le mani.',
  },
  {
    id: 'gen:cinema',
    category: 'gender',
    prompt: 'Article + word: ___ cinema',
    hint: 'masc/fem?',
    answer: 'il cinema',
    notes: 'Greek-origin masc ending in -ma.',
  },
  {
    id: 'gen:radio',
    category: 'gender',
    prompt: 'Article + word: ___ radio',
    hint: 'masc/fem?',
    answer: 'la radio',
    notes: 'Feminine despite -o ending.',
  },
  {
    id: 'gen:foto',
    category: 'gender',
    prompt: 'Article + word: ___ foto',
    hint: 'masc/fem?',
    answer: 'la foto',
    notes: 'Short for "fotografia", feminine.',
  },
  {
    id: 'gen:auto',
    category: 'gender',
    prompt: 'Article + word: ___ auto',
    hint: 'masc/fem?',
    answer: "l'auto",
    altAnswers: ["l'auto", 'la auto'],
    notes: 'Feminine (short for automobile). Elides before vowel.',
  },

  // Past tense (passato prossimo)
  {
    id: 'past:ho-mangiato',
    category: 'past-tense',
    prompt: 'Past tense: "I ate the pizza"',
    hint: 'passato prossimo with avere',
    answer: 'ho mangiato la pizza',
  },
  {
    id: 'past:siamo-andati',
    category: 'past-tense',
    prompt: 'Past tense: "we went to Rome"',
    hint: 'passato prossimo with essere',
    answer: 'siamo andati a Roma',
    altAnswers: ['siamo andate a Roma'],
    notes: 'andare uses essere, agrees with subject.',
  },
  {
    id: 'past:hai-visto',
    category: 'past-tense',
    prompt: 'Past tense (informal): "did you see the menu?"',
    hint: 'passato prossimo with avere',
    answer: 'hai visto il menù?',
    altAnswers: ['hai visto il menu?'],
  },
  {
    id: 'past:ha-detto',
    category: 'past-tense',
    prompt: 'Past tense: "she said yes"',
    hint: 'passato prossimo, irregular participle of dire',
    answer: 'ha detto di sì',
    altAnswers: ['ha detto si', 'ha detto sì'],
  },
  {
    id: 'past:sono-arrivata',
    category: 'past-tense',
    prompt: 'Past tense (you are female): "I arrived"',
    hint: 'arrivare uses essere',
    answer: 'sono arrivata',
  },

  // Numbers
  {
    id: 'num:trentatre',
    category: 'numbers',
    prompt: 'Write in Italian: 33',
    answer: 'trentatré',
    altAnswers: ['trentatre'],
  },
  {
    id: 'num:settantacinque',
    category: 'numbers',
    prompt: 'Write in Italian: 75',
    answer: 'settantacinque',
  },
  {
    id: 'num:cento',
    category: 'numbers',
    prompt: 'Write in Italian: 100',
    answer: 'cento',
  },
  {
    id: 'num:duecentocinquanta',
    category: 'numbers',
    prompt: 'Write in Italian: 250',
    answer: 'duecentocinquanta',
  },
  {
    id: 'num:mille',
    category: 'numbers',
    prompt: 'Write in Italian: 1000',
    answer: 'mille',
  },
  {
    id: 'num:duemilaventisei',
    category: 'numbers',
    prompt: 'Write in Italian: 2026',
    answer: 'duemilaventisei',
  },
]
