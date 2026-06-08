import type {
  Person,
  TenseId,
  VerbClass,
  PersonArray,
  EndingRow,
  UniformEndingRow
} from '../types/conjugation'
import { PERSONS } from '../types/conjugation'
import { ENDINGS } from '../data/conjugation/endings'
import { TENSE_BY_ID, COMPOUND_AUX_TENSE } from '../data/conjugation/tenses'
import { irregulars } from '../data/conjugation/irregulars'

const ACUTE: Record<string, string> = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' }

// Subjunctive-imperfect endings appended to the 3rd-person-plural preterite stem.
const SUBJ_IMPERFECT_ENDINGS: PersonArray = ['ra', 'ras', 'ra', 'ramos', 'ran']

function personIndex(person: Person): number {
  return PERSONS.indexOf(person)
}

export function getVerbClass(infinitive: string): VerbClass {
  const end = infinitive.slice(-2)
  if (end === 'ar') return 'ar'
  if (end === 'er') return 'er'
  if (end === 'ir') return 'ir'
  throw new Error(`Not a recognized infinitive: "${infinitive}"`)
}

function isUniform(row: EndingRow): row is UniformEndingRow {
  return 'all' in row
}

function endingFor(tense: TenseId, verbClass: VerbClass, person: Person): string {
  const row = ENDINGS[tense]
  if (!row) throw new Error(`No endings defined for tense "${tense}"`)
  const idx = personIndex(person)
  if (isUniform(row)) return row.all[idx]
  return row[verbClass][idx]
}

function participle(infinitive: string): string {
  const ir = irregulars[infinitive]
  if (ir?.participle) return ir.participle
  const verbClass = getVerbClass(infinitive)
  const stem = infinitive.slice(0, -2)
  return verbClass === 'ar' ? stem + 'ado' : stem + 'ido'
}

// Add an acute accent to the last vowel of a stem (for the nosotros subj-imperfect).
function accentLastVowel(stem: string): string {
  for (let i = stem.length - 1; i >= 0; i--) {
    const lower = stem[i].toLowerCase()
    if (ACUTE[lower]) return stem.slice(0, i) + ACUTE[lower] + stem.slice(i + 1)
  }
  return stem
}

/**
 * Conjugate a Spanish verb. Override-first: a verified irregular form always
 * wins; otherwise the regular rule applies. Never returns a guessed form —
 * throws on an unrecognized infinitive.
 */
export function conjugate(infinitive: string, tense: TenseId, person: Person): string {
  // 1. Verified irregular override.
  const override = irregulars[infinitive]?.forms[tense]?.[person]
  if (override) return override

  const meta = TENSE_BY_ID[tense]
  if (!meta) throw new Error(`Unknown tense "${tense}"`)

  // 2. Compound tense: conjugated `haber` + past participle.
  if (meta.isCompound) {
    const aux = conjugate('haber', COMPOUND_AUX_TENSE[tense], person)
    return `${aux} ${participle(infinitive)}`
  }

  const verbClass = getVerbClass(infinitive)

  // 3. Subjunctive imperfect: built from the 3rd-person-plural preterite stem.
  //    Correct for irregulars too, since their preterite is overridden.
  if (tense === 'subjImperfecto') {
    const stem = conjugate(infinitive, 'indefinido', 'ellos').replace(/ron$/, '')
    const ending = SUBJ_IMPERFECT_ENDINGS[personIndex(person)]
    const base = person === 'nosotros' ? accentLastVowel(stem) : stem
    return base + ending
  }

  // 4. Other simple tenses: (infinitive | stem) + class ending.
  const base = meta.attachesToInfinitive ? infinitive : infinitive.slice(0, -2)
  return base + endingFor(tense, verbClass, person)
}

export function conjugateAll(infinitive: string, tense: TenseId): Record<Person, string> {
  return {
    yo: conjugate(infinitive, tense, 'yo'),
    tu: conjugate(infinitive, tense, 'tu'),
    el: conjugate(infinitive, tense, 'el'),
    nosotros: conjugate(infinitive, tense, 'nosotros'),
    ellos: conjugate(infinitive, tense, 'ellos')
  }
}
