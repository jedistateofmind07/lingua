import type { Exercise, ExerciseItem, ExerciseKind } from '../types/exercise'
import type { Person, TenseId, VerbClass } from '../types/conjugation'
import type { VocabDeck, Gender as VocabGender } from '../types/vocab'
import type { VerbInfo } from '../data/conjugation/verbs'
import { PERSONS, PERSON_LABELS } from '../types/conjugation'
import { TENSE_BY_ID } from '../data/conjugation/tenses'
import { ENDINGS } from '../data/conjugation/endings'
import { conjugate } from '../engine/conjugate'
import { verbsForClass } from '../data/conjugation/verbs'
import { pickRandom } from './shuffle'

export const DEFAULT_ROUND = 6

function genderArticle(gender?: VocabGender): string | undefined {
  if (gender === 'm') return 'el'
  if (gender === 'f') return 'la'
  return undefined
}

// --- Vocabulary: Spanish <-> English matching ---
export function buildVocabMatching(deck: VocabDeck, n = DEFAULT_ROUND): Exercise {
  const chosen = pickRandom(deck.entries, n)
  const items: ExerciseItem[] = chosen.map((e, i) => {
    const article = genderArticle(e.gender)
    return {
      id: `${deck.id}-${i}`,
      prompt: e.es,
      answer: e.en,
      promptLang: 'es',
      answerLang: 'en',
      hint: article ? `(${article})` : undefined
    }
  })
  return {
    kind: 'matching',
    title: deck.title,
    items,
    source: { type: 'vocab', topicId: deck.id }
  }
}

// --- Conjugation: endings recall (simple tenses only) ---
export function buildConjugationEndings(tense: TenseId, verbClass: VerbClass): Exercise {
  const row = ENDINGS[tense]
  if (!row) throw new Error(`No endings to drill for tense "${tense}"`)
  const endings = 'all' in row ? row.all : row[verbClass]
  const label = TENSE_BY_ID[tense].label
  const items: ExerciseItem[] = PERSONS.map((person, idx) => ({
    id: `${tense}-${verbClass}-${person}`,
    prompt: PERSON_LABELS[person],
    answer: endings[idx],
    promptLang: 'es',
    answerLang: 'es',
    hint: `${label} · -${verbClass}`
  }))
  return {
    kind: 'matching',
    title: `${label} · -${verbClass} endings`,
    items,
    source: { type: 'conjugation', tenseId: tense, verbClass, drill: 'endings' }
  }
}

// --- Conjugation: full-form production (match / type / flashcard) ---
export function buildConjugationFullForm(
  tense: TenseId,
  verbClass: VerbClass | 'mixed',
  kind: ExerciseKind = 'type',
  n = DEFAULT_ROUND
): Exercise {
  const verbs = verbsForClass(verbClass)
  const combos: { verb: VerbInfo; person: Person }[] = []
  for (const verb of verbs) {
    for (const person of PERSONS) combos.push({ verb, person })
  }
  const chosen = pickRandom(combos, n)
  const label = TENSE_BY_ID[tense].label
  const items: ExerciseItem[] = chosen.map(({ verb, person }, i) => ({
    id: `${verb.infinitive}-${tense}-${person}-${i}`,
    prompt: `${verb.infinitive} · ${PERSON_LABELS[person]}`,
    answer: conjugate(verb.infinitive, tense, person),
    promptLang: 'es',
    answerLang: 'es',
    hint: label
  }))
  return {
    kind,
    title: verbClass === 'mixed' ? label : `${label} · -${verbClass}`,
    items,
    source: {
      type: 'conjugation',
      tenseId: tense,
      verbClass: verbClass === 'mixed' ? undefined : verbClass,
      drill: 'fullform'
    }
  }
}

// --- Conjugation: full-paradigm table fill-in (one verb, all persons) ---
export function buildConjugationTable(
  tense: TenseId,
  verbClass: VerbClass | 'mixed',
  verb?: string
): Exercise {
  const pool = verbsForClass(verbClass)
  const chosen =
    verb && verb !== 'random'
      ? (pool.find((v) => v.infinitive === verb) ?? pickRandom(pool, 1)[0])
      : pickRandom(pool, 1)[0]
  const label = TENSE_BY_ID[tense].label
  const items: ExerciseItem[] = PERSONS.map((person) => ({
    id: `${chosen.infinitive}-${tense}-${person}`,
    prompt: PERSON_LABELS[person],
    answer: conjugate(chosen.infinitive, tense, person),
    promptLang: 'es',
    answerLang: 'es'
  }))
  return {
    kind: 'table',
    title: `${chosen.infinitive} · ${label}`,
    items,
    source: {
      type: 'conjugation',
      tenseId: tense,
      verbClass: verbClass === 'mixed' ? undefined : verbClass,
      drill: 'table'
    },
    meta: { verb: chosen.infinitive, tenseLabel: label }
  }
}
