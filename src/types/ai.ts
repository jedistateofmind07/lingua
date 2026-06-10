import type { TenseId } from './conjugation'

// The exercise "plan" the AI returns. The app turns this into a real Exercise —
// for conjugation the local verified engine computes every form (the AI only
// picks tense/class/drill/format/verbs), so the model can never emit wrong Spanish.
export interface ConjugationPlan {
  tenseId: TenseId
  verbClass: 'ar' | 'er' | 'ir' | 'mixed'
  drill: 'fullform' | 'table' | 'endings'
  format: 'matching' | 'type' | 'flashcard'
  verbs?: string[]
}

export interface VocabPlanItem {
  es: string
  en: string
  gender?: 'm' | 'f' | 'none'
}

export interface VocabPlan {
  items: VocabPlanItem[]
  format: 'matching' | 'flashcard' | 'type'
}

export interface ExercisePlan {
  kind: 'vocab' | 'conjugation'
  title: string
  conjugation?: ConjugationPlan
  vocab?: VocabPlan
}
