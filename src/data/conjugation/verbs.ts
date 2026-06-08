import type { VerbClass } from '../../types/conjugation'
import { irregulars } from './irregulars'

export interface VerbInfo {
  infinitive: string
  verbClass: VerbClass
  irregular: boolean
}

// Clean, fully-regular verbs across all tenses (incl. participle).
export const REGULAR_VERBS: VerbInfo[] = [
  { infinitive: 'hablar', verbClass: 'ar', irregular: false },
  { infinitive: 'trabajar', verbClass: 'ar', irregular: false },
  { infinitive: 'estudiar', verbClass: 'ar', irregular: false },
  { infinitive: 'caminar', verbClass: 'ar', irregular: false },
  { infinitive: 'cocinar', verbClass: 'ar', irregular: false },
  { infinitive: 'comprar', verbClass: 'ar', irregular: false },
  { infinitive: 'cantar', verbClass: 'ar', irregular: false },
  { infinitive: 'comer', verbClass: 'er', irregular: false },
  { infinitive: 'beber', verbClass: 'er', irregular: false },
  { infinitive: 'aprender', verbClass: 'er', irregular: false },
  { infinitive: 'correr', verbClass: 'er', irregular: false },
  { infinitive: 'comprender', verbClass: 'er', irregular: false },
  { infinitive: 'vender', verbClass: 'er', irregular: false },
  { infinitive: 'vivir', verbClass: 'ir', irregular: false },
  { infinitive: 'recibir', verbClass: 'ir', irregular: false },
  { infinitive: 'decidir', verbClass: 'ir', irregular: false },
  { infinitive: 'subir', verbClass: 'ir', irregular: false },
  { infinitive: 'partir', verbClass: 'ir', irregular: false }
]

// Practice irregulars (excludes the auxiliary `haber`, which is awkward to drill alone).
export const IRREGULAR_VERBS: VerbInfo[] = Object.values(irregulars)
  .filter((v) => v.infinitive !== 'haber')
  .map((v) => ({ infinitive: v.infinitive, verbClass: v.verbClass, irregular: true }))

export const ALL_PRACTICE_VERBS: VerbInfo[] = [...REGULAR_VERBS, ...IRREGULAR_VERBS]

export function verbsForClass(verbClass: VerbClass | 'mixed'): VerbInfo[] {
  if (verbClass === 'mixed') return ALL_PRACTICE_VERBS
  return ALL_PRACTICE_VERBS.filter((v) => v.verbClass === verbClass)
}
