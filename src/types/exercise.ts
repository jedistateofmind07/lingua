// The generic exercise contract. Every feature — and the future AI generator —
// produces an `Exercise`; every interaction component consumes `ExerciseItem[]`.

export type Lang = 'es' | 'en'

export interface ExerciseItem {
  id: string
  prompt: string // shown to the learner
  answer: string // the correct response (canonical, accented)
  promptLang: Lang
  answerLang: Lang
  hint?: string
  alternates?: string[] // additional accepted answers
}

export type ExerciseKind = 'matching' | 'flashcard' | 'type' | 'table'

export type ExerciseSource =
  | { type: 'vocab'; topicId: string }
  | { type: 'conjugation'; tenseId: string; verbClass?: string; drill: 'endings' | 'fullform' | 'table' }
  | { type: 'ai'; promptText: string } // Phase 2 only

export interface Exercise {
  kind: ExerciseKind
  title: string
  items: ExerciseItem[]
  source: ExerciseSource
  meta?: Record<string, string>
}

export interface Mistake {
  prompt: string
  expected: string
  given?: string
}

export interface SessionResult {
  source: ExerciseSource
  total: number
  correct: number
  mistakes: Mistake[]
  completedAt: number
}

// What an interaction component reports when a run finishes.
export interface ExerciseOutcome {
  correct: number
  total: number
  mistakes: Mistake[]
}
