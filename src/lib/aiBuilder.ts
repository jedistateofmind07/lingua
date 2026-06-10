import type { Exercise, ExerciseItem, ExerciseKind } from '../types/exercise'
import type { TenseId, VerbClass } from '../types/conjugation'
import type { ExercisePlan } from '../types/ai'
import { TENSE_BY_ID } from '../data/conjugation/tenses'
import { ALL_PRACTICE_VERBS } from '../data/conjugation/verbs'
import {
  buildConjugationEndings,
  buildConjugationFullForm,
  buildConjugationTable
} from './exerciseBuilders'

const TENSE_IDS = Object.keys(TENSE_BY_ID) as TenseId[]
const SAFE_VERBS = new Set(ALL_PRACTICE_VERBS.map((v) => v.infinitive))

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback
}

function buildConjugation(c: NonNullable<ExercisePlan['conjugation']>): Exercise {
  const tense = pick<TenseId>(c?.tenseId, TENSE_IDS, 'presente')
  const verbClass = pick(c?.verbClass, ['ar', 'er', 'ir', 'mixed'] as const, 'mixed')
  let drill = pick(c?.drill, ['fullform', 'table', 'endings'] as const, 'fullform')
  const format = pick(c?.format, ['matching', 'type', 'flashcard'] as const, 'type')

  // Endings drill is only meaningful for simple tenses.
  if (drill === 'endings' && TENSE_BY_ID[tense].isCompound) drill = 'fullform'

  const verbs = Array.isArray(c?.verbs)
    ? c.verbs.filter((v): v is string => typeof v === 'string' && SAFE_VERBS.has(v))
    : []

  if (drill === 'endings') {
    const vc: VerbClass = verbClass === 'mixed' ? 'ar' : verbClass
    return buildConjugationEndings(tense, vc)
  }
  if (drill === 'table') {
    return buildConjugationTable(tense, verbClass, verbs[0])
  }
  return buildConjugationFullForm(tense, verbClass, format, undefined, verbs.length ? verbs : undefined)
}

function buildVocab(v: ExercisePlan['vocab'], title: string): Exercise {
  const raw = Array.isArray(v?.items) ? v!.items : []
  const items: ExerciseItem[] = raw
    .filter((it) => it && typeof it.es === 'string' && typeof it.en === 'string')
    .map((it) => ({ es: it.es.trim(), en: it.en.trim(), gender: it.gender }))
    .filter((it) => it.es && it.en)
    .slice(0, 12)
    .map((it, i) => {
      const article = it.gender === 'm' ? 'el' : it.gender === 'f' ? 'la' : undefined
      return {
        id: `ai-${i}`,
        prompt: it.es,
        answer: it.en,
        promptLang: 'es' as const,
        answerLang: 'en' as const,
        hint: article ? `(${article})` : undefined
      }
    })

  if (!items.length) {
    throw new Error('The generated exercise had no usable items. Try rephrasing your request.')
  }

  let format = pick(v?.format, ['matching', 'flashcard', 'type'] as const, 'matching') as ExerciseKind
  if (format === 'matching' && items.length < 3) format = 'flashcard' // matching needs a few pairs

  return { kind: format, title: title || 'Vocabulary', items, source: { type: 'ai', promptText: '' } }
}

export function buildFromPlan(plan: ExercisePlan, prompt: string): Exercise {
  const isConjugation =
    plan?.kind === 'conjugation' || (!!plan?.conjugation && !plan?.vocab)

  const ex =
    isConjugation && plan?.conjugation
      ? buildConjugation(plan.conjugation)
      : buildVocab(plan?.vocab, plan?.title ?? '')

  const title = typeof plan?.title === 'string' && plan.title.trim() ? plan.title.trim().slice(0, 80) : ex.title
  return { ...ex, title, source: { type: 'ai', promptText: prompt } }
}
