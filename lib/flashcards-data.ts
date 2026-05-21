import {
  studyGuideSections,
  possessiveExamples,
  numbersData,
} from '@/lib/content/italian-study-guide'

export type Flashcard = {
  id: string
  category: string
  categoryId: string
  italian: string
  english: string
  note?: string
}

export type FlashcardCategory = {
  id: string
  label: string
  cards: Flashcard[]
}

function makeCard(
  id: string,
  category: string,
  categoryId: string,
  italian: string,
  english: string,
  note?: string
): Flashcard {
  return { id, category, categoryId, italian, english, note }
}

export function buildAllFlashcards(): FlashcardCategory[] {
  const categories: FlashcardCategory[] = []

  for (const section of studyGuideSections) {
    if (section.type === 'phrases' || section.type === 'combinations') {
      categories.push({
        id: section.id,
        label: section.title,
        cards: section.phrases.map((p, i) =>
          makeCard(`${section.id}:${i}`, section.title, section.id, p.italian, p.english, p.note)
        ),
      })
    } else if (section.type === 'vocab') {
      categories.push({
        id: section.id,
        label: section.title.replace('Vocab — ', ''),
        cards: section.items.map((it, i) =>
          makeCard(`${section.id}:${i}`, section.title, section.id, it.italian, it.english, it.note)
        ),
      })
    } else if (section.type === 'verbs') {
      // One card per verb: front = infinitive, back = full conjugation
      categories.push({
        id: section.id,
        label: section.title,
        cards: section.verbs.map((v, i) =>
          makeCard(
            `${section.id}:${i}`,
            section.title,
            section.id,
            v.verb,
            `${v.english}\n\n${v.rows.map(([p, f]) => `${p}: ${f}`).join('\n')}`,
            v.note
          )
        ),
      })
    } else if (section.type === 'past') {
      const verbCards = section.pastVerbs.map((v, i) =>
        makeCard(
          `${section.id}:verb:${i}`,
          'Past Tense Verbs',
          section.id,
          `${v.verb} (${v.auxiliary})`,
          `${v.english} — past participle: ${v.participle}\n\n${v.rows.map(([p, f]) => `${p}: ${f}`).join('\n')}`,
          v.note
        )
      )
      const travelCards = section.travelPhrases.map((p, i) =>
        makeCard(`${section.id}:phrase:${i}`, 'Past Tense Phrases', section.id, p.italian, p.english, p.note)
      )
      categories.push({ id: section.id, label: section.title, cards: [...verbCards, ...travelCards] })
    } else if (section.type === 'possessives') {
      categories.push({
        id: section.id,
        label: section.title,
        cards: possessiveExamples.map((p, i) =>
          makeCard(`${section.id}:${i}`, section.title, section.id, p.italian, p.english, p.note)
        ),
      })
    } else if (section.type === 'numbers') {
      const cards: Flashcard[] = []
      numbersData.ones.forEach(([n, it], i) =>
        cards.push(makeCard(`numbers:ones:${i}`, 'Numbers', section.id, it, n))
      )
      numbersData.tens.forEach(([n, it], i) =>
        cards.push(makeCard(`numbers:tens:${i}`, 'Numbers', section.id, it, n))
      )
      numbersData.ordinals.forEach(([n, it], i) =>
        cards.push(makeCard(`numbers:ord:${i}`, 'Ordinals', section.id, it, n))
      )
      numbersData.days.forEach(([n, it], i) =>
        cards.push(makeCard(`numbers:days:${i}`, 'Days', section.id, it, n))
      )
      numbersData.months.forEach(([n, it], i) =>
        cards.push(makeCard(`numbers:months:${i}`, 'Months', section.id, it, n))
      )
      numbersData.time.forEach((p, i) =>
        cards.push(makeCard(`numbers:time:${i}`, 'Time Expressions', section.id, p.italian, p.english, p.note))
      )
      categories.push({ id: section.id, label: section.title, cards })
    } else if (section.type === 'example-scenarios') {
      // Each dialogue line becomes a flashcard
      const cards: Flashcard[] = []
      section.scenarios.forEach((s) => {
        s.dialogue.forEach((line, i) => {
          cards.push(
            makeCard(`${s.id}:line:${i}`, s.title, section.id, line.italian, line.english,
              line.speaker === 'you' ? 'You say' : `${line.speakerLabel ?? 'They'} says`)
          )
        })
      })
      categories.push({ id: section.id, label: 'Scenario Lines', cards })
    }
  }

  return categories
}

export function getAllCards(categories: FlashcardCategory[]): Flashcard[] {
  return categories.flatMap((c) => c.cards)
}
