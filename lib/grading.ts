import { Rating } from 'ts-fsrs'
import type { TextBlock } from '@anthropic-ai/sdk/resources/messages'
import { anthropic, HAIKU } from './anthropic'

export type GradeVerdict = 'correct' | 'almost' | 'wrong'

export interface GradeResult {
  verdict: GradeVerdict
  rating: Rating
  feedback: string
  expectedAnswer: string
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:'"()]/g, '')
    .replace(/\s+/g, ' ')
}

function exactOrSubstring(typed: string, expected: string): boolean {
  const t = normalize(typed)
  const e = normalize(expected)
  if (!t || !e) return false
  if (t === e) return true
  if (t.length >= 4 && e.includes(t)) return true
  if (e.length >= 4 && t.includes(e)) return true
  return false
}

export async function gradeTyped(
  nativeText: string,
  expectedEnglish: string,
  typedAnswer: string
): Promise<GradeResult> {
  if (exactOrSubstring(typedAnswer, expectedEnglish)) {
    return {
      verdict: 'correct',
      rating: Rating.Good,
      feedback: 'Exact match.',
      expectedAnswer: expectedEnglish,
    }
  }

  const client = anthropic()
  const prompt = `You are grading a language learner's translation.

Source: "${nativeText}"
Expected English meaning: "${expectedEnglish}"
Learner typed: "${typedAnswer}"

Decide if the learner understood the meaning. Be lenient on synonyms, word order, articles (a/the), and minor wording. Reject if the learner missed the meaning, said the opposite, or wrote something unrelated.

Respond with JSON only, no prose:
{"verdict":"correct"|"almost"|"wrong","feedback":"<one short sentence>"}

- "correct" = clearly got the meaning
- "almost" = mostly right, missed nuance or a small word
- "wrong" = missed it`

  const resp = await client.messages.create({
    model: HAIKU,
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = resp.content
    .filter((b): b is TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')

  let parsed: { verdict: GradeVerdict; feedback: string }
  try {
    const match = text.match(/\{[\s\S]*\}/)
    parsed = JSON.parse(match ? match[0] : text)
  } catch {
    parsed = { verdict: 'wrong', feedback: 'Could not parse grading response.' }
  }

  const ratingMap: Record<GradeVerdict, Rating> = {
    correct: Rating.Good,
    almost: Rating.Hard,
    wrong: Rating.Again,
  }

  return {
    verdict: parsed.verdict,
    rating: ratingMap[parsed.verdict] ?? Rating.Again,
    feedback: parsed.feedback,
    expectedAnswer: expectedEnglish,
  }
}
