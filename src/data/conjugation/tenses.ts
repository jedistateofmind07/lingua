import type { TenseMeta, TenseId } from '../../types/conjugation'

// Display order for the tense picker.
export const TENSES: TenseMeta[] = [
  { id: 'presente', label: 'Presente (Indicativo)', isCompound: false, attachesToInfinitive: false },
  { id: 'indefinido', label: 'Pretérito Indefinido', isCompound: false, attachesToInfinitive: false },
  { id: 'imperfecto', label: 'Pretérito Imperfecto', isCompound: false, attachesToInfinitive: false },
  { id: 'futuro', label: 'Futuro', isCompound: false, attachesToInfinitive: true },
  { id: 'condicionalSimple', label: 'Condicional Simple', isCompound: false, attachesToInfinitive: true },
  { id: 'subjPresente', label: 'Subjuntivo Presente', isCompound: false, attachesToInfinitive: false },
  { id: 'subjImperfecto', label: 'Subjuntivo Imperfecto', isCompound: false, attachesToInfinitive: false },
  { id: 'perfecto', label: 'Pretérito Perfecto', isCompound: true, attachesToInfinitive: false },
  { id: 'pluscuamperfecto', label: 'Pluscuamperfecto', isCompound: true, attachesToInfinitive: false },
  { id: 'condicionalCompuesto', label: 'Condicional Compuesto', isCompound: true, attachesToInfinitive: false }
]

export const TENSE_BY_ID: Record<TenseId, TenseMeta> = Object.fromEntries(
  TENSES.map((t) => [t.id, t])
) as Record<TenseId, TenseMeta>

// Which simple tense `haber` is conjugated in, per compound tense.
export const COMPOUND_AUX_TENSE: Record<string, TenseId> = {
  perfecto: 'presente',
  pluscuamperfecto: 'imperfecto',
  condicionalCompuesto: 'condicionalSimple'
}
