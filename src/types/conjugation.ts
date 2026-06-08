export type VerbClass = 'ar' | 'er' | 'ir'
export type Person = 'yo' | 'tu' | 'el' | 'nosotros' | 'ellos'

// Fixed order used by every PersonArray and by the engine.
export const PERSONS: Person[] = ['yo', 'tu', 'el', 'nosotros', 'ellos']

export const PERSON_LABELS: Record<Person, string> = {
  yo: 'Yo',
  tu: 'Tú',
  el: 'él/ella',
  nosotros: 'Nosotros',
  ellos: 'Ellos'
}

export type TenseId =
  | 'presente'
  | 'indefinido'
  | 'imperfecto'
  | 'futuro'
  | 'condicionalSimple'
  | 'subjPresente'
  | 'subjImperfecto'
  | 'perfecto'
  | 'pluscuamperfecto'
  | 'condicionalCompuesto'

export interface TenseMeta {
  id: TenseId
  label: string
  isCompound: boolean // true -> haber + participle
  attachesToInfinitive: boolean // true for futuro & condicional simple
}

// [yo, tu, el, nosotros, ellos]
export type PersonArray = [string, string, string, string, string]

// Simple tenses with per-class endings. -er and -ir are identical except the
// present-tense nosotros form (comemos vs vivimos), so all three are explicit.
export interface SimpleEndingRow {
  ar: PersonArray
  er: PersonArray
  ir: PersonArray
}

// Futuro & condicional simple: one ending set, attaches to the infinitive.
export interface UniformEndingRow {
  all: PersonArray
}

export type EndingRow = SimpleEndingRow | UniformEndingRow
export type EndingsTable = Partial<Record<TenseId, EndingRow>>

// Verified full-form overrides for irregular verbs.
// Any (tense, person) present here fully replaces the rule output.
export interface IrregularVerb {
  infinitive: string
  verbClass: VerbClass
  participle?: string // irregular past participle (e.g. visto, hecho, dicho)
  forms: Partial<Record<TenseId, Partial<Record<Person, string>>>>
}
