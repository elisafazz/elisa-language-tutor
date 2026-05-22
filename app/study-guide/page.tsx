'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  studyGuideSections,
  possessiveTable,
  possessiveExamples,
  numbersData,
  pinnedTrip,
  type GuidePhrase,
  type VerbConjugation,
  type PastVerb,
  type ExampleScenario,
} from '@/lib/content/italian-study-guide'
import SaveButton from '@/components/SaveButton'
import { loadSaved, makeSaveId, SAVED_EVENT, seedSavedOnce } from '@/lib/saved-phrases'

// ─── Search helpers ────────────────────────────────────────────────────────────

function matchesPhrase(phrase: GuidePhrase, q: string): boolean {
  return (
    phrase.italian.toLowerCase().includes(q) ||
    phrase.english.toLowerCase().includes(q) ||
    (phrase.note?.toLowerCase().includes(q) ?? false)
  )
}

function sectionMatchCount(section: (typeof studyGuideSections)[number], q: string): number {
  if (!q) return 0
  if (section.type === 'phrases') return section.phrases.filter((p) => matchesPhrase(p, q)).length
  if (section.type === 'combinations') return section.phrases.filter((p) => matchesPhrase(p, q)).length
  if (section.type === 'past') {
    return section.travelPhrases.filter((p) => matchesPhrase(p, q)).length +
      section.pastVerbs.filter((v) => v.verb.toLowerCase().includes(q) || v.english.toLowerCase().includes(q)).length
  }
  if (section.type === 'verbs') return section.verbs.filter((v) => v.verb.toLowerCase().includes(q) || v.english.toLowerCase().includes(q)).length
  if (section.type === 'possessives') {
    return possessiveExamples.filter((p) => matchesPhrase(p, q)).length
  }
  if (section.type === 'example-scenarios') {
    return section.scenarios.filter((s) =>
      s.title.toLowerCase().includes(q) ||
      s.italianTitle.toLowerCase().includes(q) ||
      s.dialogue.some((line) => line.italian.toLowerCase().includes(q) || line.english.toLowerCase().includes(q)) ||
      s.grammarNotes.some((n) => n.feature.toLowerCase().includes(q) || n.explanation.toLowerCase().includes(q))
    ).length
  }
  if (section.type === 'vocab') {
    return section.items.filter((it) =>
      it.italian.toLowerCase().includes(q) ||
      it.english.toLowerCase().includes(q) ||
      (it.note?.toLowerCase().includes(q) ?? false)
    ).length
  }
  return 0
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function PhraseRow({ phrase }: { phrase: GuidePhrase }) {
  return (
    <div className="py-3 border-b border-line last:border-b-0 flex items-start gap-2">
      <div className="flex-1 min-w-0">
        <p className="text-ink font-medium leading-snug">{phrase.italian}</p>
        <p className="text-muted text-sm mt-0.5">{phrase.english}</p>
        {phrase.note && <p className="text-muted text-xs italic mt-1">{phrase.note}</p>}
      </div>
      <SaveButton italian={phrase.italian} />
    </div>
  )
}

function VerbTable({ verb }: { verb: VerbConjugation }) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-serif text-base text-ink font-medium">{verb.verb}</span>
        <span className="text-xs text-muted">— {verb.english}</span>
      </div>
      <div className="rounded-lg border border-line overflow-hidden">
        {verb.rows.map(([pronoun, form], i) => (
          <div key={i} className={`grid grid-cols-2 px-3 py-2 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-cream/60'}`}>
            <span className="text-muted">{pronoun}</span>
            <span className="text-ink font-medium">{form}</span>
          </div>
        ))}
      </div>
      {verb.note && <p className="text-xs text-muted italic mt-2 px-1">{verb.note}</p>}
    </div>
  )
}

function PastVerbTable({ verb }: { verb: PastVerb }) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-serif text-base text-ink font-medium">{verb.verb}</span>
        <span className="text-xs text-muted">— {verb.english}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wide ${verb.auxiliary === 'essere' ? 'bg-gold/20 text-ink' : 'bg-sage/20 text-ink'}`}>
          {verb.auxiliary}
        </span>
      </div>
      <p className="text-xs text-muted mb-2">
        participio: <span className="font-medium text-ink">{verb.participle}</span>
      </p>
      <div className="rounded-lg border border-line overflow-hidden">
        {verb.rows.map(([pronoun, form], i) => (
          <div key={i} className={`grid grid-cols-2 px-3 py-2 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-cream/60'}`}>
            <span className="text-muted">{pronoun}</span>
            <span className="text-ink font-medium">{form}</span>
          </div>
        ))}
      </div>
      {verb.note && <p className="text-xs text-muted italic mt-2 px-1">{verb.note}</p>}
    </div>
  )
}

function ScenarioCard({ scenario }: { scenario: ExampleScenario }) {
  const [tab, setTab] = useState<'dialogue' | 'grammar'>('dialogue')

  return (
    <div className="mb-4 border border-line rounded-xl overflow-hidden bg-white">
      <div className="px-4 py-3 bg-cream/50 border-b border-line">
        <p className="font-serif text-base text-ink font-medium">{scenario.title}</p>
        <p className="text-xs text-muted italic mt-0.5">{scenario.italianTitle}</p>
        <p className="text-xs text-muted mt-2">{scenario.setting}</p>
      </div>

      <div className="flex border-b border-line">
        <button
          onClick={() => setTab('dialogue')}
          className={`flex-1 py-2 text-xs uppercase tracking-wide ${
            tab === 'dialogue' ? 'bg-ink text-cream' : 'bg-white text-muted'
          }`}
        >
          Dialogue
        </button>
        <button
          onClick={() => setTab('grammar')}
          className={`flex-1 py-2 text-xs uppercase tracking-wide ${
            tab === 'grammar' ? 'bg-ink text-cream' : 'bg-white text-muted'
          }`}
        >
          Grammar
        </button>
      </div>

      {tab === 'dialogue' && (
        <div className="px-4 py-3 space-y-3">
          {scenario.dialogue.map((line, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg flex items-start gap-2 ${
                line.speaker === 'you'
                  ? 'bg-sage/10 border-l-2 border-sage'
                  : 'bg-gold/10 border-l-2 border-gold'
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wide text-muted mb-1">
                  {line.speaker === 'you' ? 'You' : line.speakerLabel || 'Them'}
                </p>
                <p className="text-ink font-medium leading-snug">{line.italian}</p>
                <p className="text-muted text-sm mt-1">{line.english}</p>
              </div>
              <SaveButton italian={line.italian} />
            </div>
          ))}
        </div>
      )}

      {tab === 'grammar' && (
        <div className="px-4 py-3 space-y-3">
          {scenario.grammarNotes.map((note, i) => (
            <div key={i} className="pb-3 border-b border-line last:border-b-0">
              <p className="text-sm font-medium text-ink">{note.feature}</p>
              <p className="text-sm text-muted mt-1 leading-relaxed">{note.explanation}</p>
            </div>
          ))}
          {scenario.heritageTip && (
            <div className="mt-2 p-3 rounded-lg bg-gold/10 border border-gold/30">
              <p className="text-[10px] uppercase tracking-wide text-muted mb-1">Heritage tip</p>
              <p className="text-sm text-ink leading-relaxed">{scenario.heritageTip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PossessivesSection() {
  return (
    <div>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {possessiveTable.headers.map((h, i) => (
                <th key={i} className={`py-2 px-2 text-left text-xs uppercase tracking-wide text-muted border-b border-line ${i === 0 ? 'w-20' : ''}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {possessiveTable.rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-cream/50'}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`py-2 px-2 border-b border-line/50 ${ci === 0 ? 'text-muted text-xs' : 'text-ink font-medium font-serif'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted italic mb-4 px-1">
        Rule: articles drop for singular family nouns. "mia madre" not "la mia madre." But: i miei genitori (plural = article back).
      </p>
      <p className="text-xs uppercase tracking-wide text-muted mb-2">Travel examples</p>
      {possessiveExamples.map((p, i) => (
        <PhraseRow key={i} phrase={p} />
      ))}
    </div>
  )
}

function NumbersSection() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted mb-2">1 – 20</p>
        <div className="grid grid-cols-4 gap-1">
          {numbersData.ones.map(([n, it]) => (
            <div key={n} className="bg-white border border-line rounded-lg px-2 py-1.5 text-center">
              <p className="text-xs text-muted">{n}</p>
              <p className="text-sm text-ink font-medium">{it}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted mb-2">Tens + big numbers</p>
        <div className="grid grid-cols-3 gap-1">
          {numbersData.tens.map(([n, it]) => (
            <div key={n} className="bg-white border border-line rounded-lg px-2 py-1.5 text-center">
              <p className="text-xs text-muted">{n}</p>
              <p className="text-sm text-ink font-medium">{it}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted mb-2">Ordinals</p>
        <div className="grid grid-cols-3 gap-1">
          {numbersData.ordinals.map(([n, it]) => (
            <div key={n} className="bg-white border border-line rounded-lg px-2 py-1.5 text-center">
              <p className="text-xs text-muted">{n}</p>
              <p className="text-sm text-ink font-medium">{it}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted mb-2">Days</p>
        <div className="grid grid-cols-4 gap-1">
          {numbersData.days.map(([n, it]) => (
            <div key={n} className="bg-white border border-line rounded-lg px-2 py-1.5 text-center">
              <p className="text-xs text-muted">{n}</p>
              <p className="text-sm text-ink font-medium">{it}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted mb-2">Months</p>
        <div className="grid grid-cols-3 gap-1">
          {numbersData.months.map(([n, it]) => (
            <div key={n} className="bg-white border border-line rounded-lg px-2 py-1.5 text-center">
              <p className="text-xs text-muted">{n}</p>
              <p className="text-sm text-ink font-medium">{it}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted mb-2">Time expressions</p>
        {numbersData.time.map((p, i) => (
          <PhraseRow key={i} phrase={p} />
        ))}
      </div>
    </div>
  )
}

// ─── Accordion section ─────────────────────────────────────────────────────────

function Section({
  section,
  query,
  defaultOpen,
}: {
  section: (typeof studyGuideSections)[number]
  query: string
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const matchCount = useMemo(() => sectionMatchCount(section, query), [section, query])

  const hasMatches = query ? matchCount > 0 : true

  if (query && !hasMatches) return null

  const countLabel = (() => {
    if (section.type === 'phrases') return section.phrases.length
    if (section.type === 'combinations') return section.phrases.length
    if (section.type === 'verbs') return section.verbs.length
    if (section.type === 'past') return section.pastVerbs.length
    if (section.type === 'example-scenarios') return section.scenarios.length
    if (section.type === 'vocab') return section.items.length
    return null
  })()

  return (
    <div className="border border-line rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${
          open ? 'bg-ink text-cream' : 'bg-white text-ink hover:bg-cream/50'
        }`}
      >
        <div>
          <span className="font-medium text-base">{section.title}</span>
          {section.subtitle && (
            <span className={`text-xs ml-2 ${open ? 'text-cream/60' : 'text-muted'}`}>
              {section.subtitle}
            </span>
          )}
          {query && matchCount > 0 && (
            <span className={`text-xs ml-2 font-normal ${open ? 'text-cream/70' : 'text-sage'}`}>
              {matchCount} match{matchCount !== 1 ? 'es' : ''}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {countLabel !== null && (
            <span className={`text-xs ${open ? 'text-cream/60' : 'text-muted'}`}>{countLabel}</span>
          )}
          <span className={`text-sm ${open ? 'text-cream/70' : 'text-muted'}`}>{open ? '▼' : '▶'}</span>
        </div>
      </button>

      {open && (
        <div className="px-4 py-2 bg-white">
          {section.type === 'phrases' && (
            <>
              {(query
                ? section.phrases.filter((p) => matchesPhrase(p, query))
                : section.phrases
              ).map((p, i) => (
                <PhraseRow key={i} phrase={p} />
              ))}
            </>
          )}

          {section.type === 'combinations' && (
            <>
              {(query
                ? section.phrases.filter((p) => matchesPhrase(p, query))
                : section.phrases
              ).map((p, i) => (
                <PhraseRow key={i} phrase={p} />
              ))}
            </>
          )}

          {section.type === 'verbs' && (
            <div className="py-2">
              {(query
                ? section.verbs.filter((v) => v.verb.toLowerCase().includes(query) || v.english.toLowerCase().includes(query))
                : section.verbs
              ).map((v, i) => (
                <VerbTable key={i} verb={v} />
              ))}
            </div>
          )}

          {section.type === 'past' && (
            <div className="py-2">
              <div className="mb-4 p-3 rounded-lg bg-gold/10 border border-gold/30">
                <p className="text-sm text-ink font-medium mb-1">avere vs essere</p>
                <p className="text-xs text-muted">
                  Most verbs use <span className="font-medium text-ink">avere</span>. Use <span className="font-medium text-ink">essere</span> for motion + state change (go, come, arrive, leave, return). Essere verbs agree with gender: andato (m) / andata (f) / andati (m pl) / andate (f pl).
                </p>
                <p className="text-xs text-muted mt-1 italic">Elisa: always use the -a/-e endings (female forms).</p>
              </div>
              {(query
                ? section.pastVerbs.filter((v) => v.verb.toLowerCase().includes(query) || v.english.toLowerCase().includes(query))
                : section.pastVerbs
              ).map((v, i) => (
                <PastVerbTable key={i} verb={v} />
              ))}
              <p className="text-xs uppercase tracking-wide text-muted mt-4 mb-2">Travel phrases</p>
              {(query
                ? section.travelPhrases.filter((p) => matchesPhrase(p, query))
                : section.travelPhrases
              ).map((p, i) => (
                <PhraseRow key={i} phrase={p} />
              ))}
            </div>
          )}

          {section.type === 'possessives' && (
            <div className="py-2">
              <PossessivesSection />
            </div>
          )}

          {section.type === 'numbers' && (
            <div className="py-2">
              <NumbersSection />
            </div>
          )}

          {section.type === 'vocab' && (
            <div className="py-2">
              <div className="grid grid-cols-1 gap-1">
                {(query
                  ? section.items.filter((it) =>
                      it.italian.toLowerCase().includes(query) ||
                      it.english.toLowerCase().includes(query) ||
                      (it.note?.toLowerCase().includes(query) ?? false)
                    )
                  : section.items
                ).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 px-2 border-b border-line/40 last:border-b-0">
                    <span className="text-ink font-medium flex-1 min-w-0">{item.italian}</span>
                    <span className="text-muted text-sm flex-1 min-w-0 text-right truncate">{item.english}</span>
                    <SaveButton italian={item.italian} />
                  </div>
                ))}
              </div>
              {(query ? section.items.filter((it) => it.note && (it.italian.toLowerCase().includes(query) || it.english.toLowerCase().includes(query) || it.note.toLowerCase().includes(query))) : section.items.filter((it) => it.note)).length > 0 && (
                <div className="mt-3 space-y-2">
                  {(query ? section.items.filter((it) => it.note && (it.italian.toLowerCase().includes(query) || it.english.toLowerCase().includes(query) || it.note.toLowerCase().includes(query))) : section.items.filter((it) => it.note)).map((item, i) => (
                    <p key={i} className="text-xs text-muted italic px-1">
                      <span className="font-medium text-ink/70 not-italic">{item.italian}:</span> {item.note}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {section.type === 'example-scenarios' && (
            <div className="py-2">
              {(query
                ? section.scenarios.filter((s) =>
                    s.title.toLowerCase().includes(query) ||
                    s.italianTitle.toLowerCase().includes(query) ||
                    s.dialogue.some((line) => line.italian.toLowerCase().includes(query) || line.english.toLowerCase().includes(query)) ||
                    s.grammarNotes.some((n) => n.feature.toLowerCase().includes(query) || n.explanation.toLowerCase().includes(query))
                  )
                : section.scenarios
              ).map((s) => (
                <ScenarioCard key={s.id} scenario={s} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

type FlatPhrase = { italian: string; english: string; note?: string; saveId: string; sourceLabel: string }

function buildFlatIndex(): FlatPhrase[] {
  const out: FlatPhrase[] = []
  for (const s of studyGuideSections) {
    if (s.type === 'phrases' || s.type === 'combinations') {
      for (const p of s.phrases) out.push({ italian: p.italian, english: p.english, note: p.note, saveId: makeSaveId(p.italian), sourceLabel: s.title })
    } else if (s.type === 'vocab') {
      for (const it of s.items) out.push({ italian: it.italian, english: it.english, note: it.note, saveId: makeSaveId(it.italian), sourceLabel: s.title })
    } else if (s.type === 'past') {
      for (const p of s.travelPhrases) out.push({ italian: p.italian, english: p.english, note: p.note, saveId: makeSaveId(p.italian), sourceLabel: 'Past Tense' })
    } else if (s.type === 'example-scenarios') {
      for (const sc of s.scenarios) {
        for (const line of sc.dialogue) out.push({ italian: line.italian, english: line.english, saveId: makeSaveId(line.italian), sourceLabel: sc.title })
      }
    }
  }
  // Include possessive examples
  for (const p of possessiveExamples) out.push({ italian: p.italian, english: p.english, note: p.note, saveId: makeSaveId(p.italian), sourceLabel: 'Possessives' })
  // Numbers time phrases
  for (const p of numbersData.time) out.push({ italian: p.italian, english: p.english, note: p.note, saveId: makeSaveId(p.italian), sourceLabel: 'Time' })
  return out
}

function SavedSection() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const flat = useMemo(() => buildFlatIndex(), [])

  useEffect(() => {
    const refresh = () => setSavedIds(loadSaved())
    refresh()
    window.addEventListener(SAVED_EVENT, refresh)
    return () => window.removeEventListener(SAVED_EVENT, refresh)
  }, [])

  const savedPhrases = useMemo(
    () => flat.filter((p) => savedIds.has(p.saveId)),
    [flat, savedIds]
  )

  if (savedPhrases.length === 0) return null

  return (
    <div className="border border-gold/40 rounded-xl overflow-hidden mb-3 bg-gold/5">
      <div className="px-4 py-3 bg-gold/15 flex items-center justify-between">
        <div>
          <p className="font-medium text-base text-ink">★ Your Favorites</p>
          <p className="text-xs text-muted">{savedPhrases.length} saved phrase{savedPhrases.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="px-4 py-2 bg-white">
        {savedPhrases.map((p, i) => (
          <div key={i} className="py-3 border-b border-line last:border-b-0 flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-ink font-medium leading-snug">{p.italian}</p>
              <p className="text-muted text-sm mt-0.5">{p.english}</p>
              {p.note && <p className="text-muted text-xs italic mt-1">{p.note}</p>}
              <p className="text-[10px] uppercase tracking-wide text-muted/70 mt-1">{p.sourceLabel}</p>
            </div>
            <SaveButton italian={p.italian} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StudyGuidePage() {
  const [rawQuery, setRawQuery] = useState('')
  const query = rawQuery.toLowerCase().trim()

  // One-time seed: pre-save the pinned-trip phrases to the user's favorites
  // on first visit. Re-running won't re-seed (flag in localStorage).
  useEffect(() => {
    seedSavedOnce(pinnedTrip.map((p) => p.italian))
  }, [])

  const sections = studyGuideSections

  return (
    <main className="min-h-screen px-5 py-6 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-5">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back
        </Link>
        <span className="text-xs text-muted">Italy 2026</span>
      </header>

      <div className="mb-5">
        <h1 className="font-serif text-3xl text-ink">Study Guide</h1>
        <p className="text-sm text-muted mt-1">Italian travel reference. All offline.</p>
      </div>

      <Link
        href="/study-guide/flashcards"
        className="block mb-5 p-4 rounded-xl border border-ink bg-ink text-cream hover:bg-ink/90 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-base">Flashcards →</p>
            <p className="text-xs text-cream/70 mt-0.5">Drill any section. IT ↔ EN. Shuffle. Offline.</p>
          </div>
          <span className="text-2xl">✦</span>
        </div>
      </Link>

      <div className="mb-5 relative">
        <input
          type="text"
          value={rawQuery}
          onChange={(e) => setRawQuery(e.target.value)}
          placeholder="Search phrases..."
          autoCapitalize="off"
          autoCorrect="off"
          className="w-full px-4 py-3 rounded-xl border border-line bg-white text-ink text-base focus:outline-none focus:border-ink placeholder:text-muted/50"
        />
        {rawQuery && (
          <button
            onClick={() => setRawQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm px-1"
          >
            ✕
          </button>
        )}
      </div>

      <SavedSection />

      <div>
        {sections.map((section, i) => (
          <Section
            key={section.id}
            section={section}
            query={query}
            defaultOpen={i === 0}
          />
        ))}
      </div>

      {query && sections.every((s) => sectionMatchCount(s, query) === 0) && (
        <p className="text-center text-muted text-sm mt-8">No matches for "{rawQuery}"</p>
      )}

      <footer className="mt-10 text-xs text-muted text-center pb-6">
        Load this page before the flight. Works offline once cached.
      </footer>
    </main>
  )
}
