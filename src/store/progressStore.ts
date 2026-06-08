import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Mistake, SessionResult, ExerciseSource } from '../types/exercise'

const MAX_MISTAKES = 50

interface ProgressState {
  streak: number
  lastActiveDay: string | null
  vocabCompleted: Record<string, number>
  tenseCompleted: Record<string, number>
  recentMistakes: Mistake[]
  recordSession: (result: SessionResult) => void
  reset: () => void
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function dayDiff(from: string, to: string): number {
  return Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86_400_000)
}

export function sourceKey(source: ExerciseSource): string {
  if (source.type === 'vocab') return source.topicId
  if (source.type === 'conjugation') {
    return `${source.tenseId}:${source.verbClass ?? 'mixed'}:${source.drill}`
  }
  return 'ai'
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      streak: 0,
      lastActiveDay: null,
      vocabCompleted: {},
      tenseCompleted: {},
      recentMistakes: [],
      recordSession: (result) =>
        set((state) => {
          const today = todayStr()
          let streak = state.streak
          if (state.lastActiveDay !== today) {
            streak =
              state.lastActiveDay && dayDiff(state.lastActiveDay, today) === 1
                ? state.streak + 1
                : 1
          }
          const vocabCompleted = { ...state.vocabCompleted }
          const tenseCompleted = { ...state.tenseCompleted }
          const key = sourceKey(result.source)
          if (result.source.type === 'vocab') {
            vocabCompleted[key] = (vocabCompleted[key] ?? 0) + 1
          } else if (result.source.type === 'conjugation') {
            tenseCompleted[key] = (tenseCompleted[key] ?? 0) + 1
          }
          const recentMistakes = [...result.mistakes, ...state.recentMistakes].slice(0, MAX_MISTAKES)
          return { streak, lastActiveDay: today, vocabCompleted, tenseCompleted, recentMistakes }
        }),
      reset: () =>
        set({
          streak: 0,
          lastActiveDay: null,
          vocabCompleted: {},
          tenseCompleted: {},
          recentMistakes: []
        })
    }),
    { name: 'lingua-progress-v1' }
  )
)
