import { describe, it, expect } from 'vitest'
import { buildFromPlan } from './aiBuilder'
import type { ExercisePlan } from '../types/ai'

describe('buildFromPlan', () => {
  it('builds a conjugation exercise via the verified engine', () => {
    const plan: ExercisePlan = {
      kind: 'conjugation',
      title: 'Past -ar',
      conjugation: { tenseId: 'indefinido', verbClass: 'ar', drill: 'fullform', format: 'type' }
    }
    const ex = buildFromPlan(plan, 'past tense ar verbs')
    expect(ex.kind).toBe('type')
    expect(ex.source).toEqual({ type: 'ai', promptText: 'past tense ar verbs' })
    expect(ex.items.length).toBeGreaterThan(0)
    expect(ex.items.every((i) => i.answer.length > 0)).toBe(true)
  })

  it('filters AI verbs to the safe set (table picks a known verb)', () => {
    const plan: ExercisePlan = {
      kind: 'conjugation',
      title: 'tener',
      conjugation: {
        tenseId: 'presente',
        verbClass: 'er',
        drill: 'table',
        format: 'type',
        verbs: ['tener', 'notarealverb']
      }
    }
    const ex = buildFromPlan(plan, 'p')
    expect(ex.kind).toBe('table')
    expect(ex.meta?.verb).toBe('tener')
  })

  it('keeps the endings drill off compound tenses', () => {
    const endings: ExercisePlan = {
      kind: 'conjugation',
      title: 'x',
      conjugation: { tenseId: 'presente', verbClass: 'er', drill: 'endings', format: 'matching' }
    }
    expect(buildFromPlan(endings, 'p').items.length).toBe(5) // 5 persons

    const compound: ExercisePlan = {
      kind: 'conjugation',
      title: 'x',
      conjugation: { tenseId: 'perfecto', verbClass: 'er', drill: 'endings', format: 'type' }
    }
    expect(buildFromPlan(compound, 'p').items.length).toBeGreaterThan(5) // fell back to full-form
  })

  it('falls back to defaults for unknown enum values', () => {
    const plan = {
      kind: 'conjugation',
      title: 'x',
      conjugation: { tenseId: 'bogus', verbClass: 'zzz', drill: 'qqq', format: 'www' }
    } as unknown as ExercisePlan
    const ex = buildFromPlan(plan, 'p')
    expect(['type', 'matching', 'flashcard', 'table']).toContain(ex.kind)
    expect(ex.items.length).toBeGreaterThan(0)
  })

  it('builds a vocab matching exercise from AI items', () => {
    const plan: ExercisePlan = {
      kind: 'vocab',
      title: 'Kitchen',
      vocab: {
        format: 'matching',
        items: [
          { es: 'cuchara', en: 'spoon', gender: 'f' },
          { es: 'tenedor', en: 'fork', gender: 'm' },
          { es: 'plato', en: 'plate', gender: 'm' },
          { es: 'vaso', en: 'glass', gender: 'm' }
        ]
      }
    }
    const ex = buildFromPlan(plan, 'kitchen words')
    expect(ex.kind).toBe('matching')
    expect(ex.items.length).toBe(4)
    expect(ex.items[0].prompt).toBe('cuchara')
    expect(ex.items[0].answer).toBe('spoon')
    expect(ex.source).toEqual({ type: 'ai', promptText: 'kitchen words' })
  })

  it('throws when the vocab plan has no usable items', () => {
    const plan: ExercisePlan = { kind: 'vocab', title: 'x', vocab: { format: 'matching', items: [] } }
    expect(() => buildFromPlan(plan, 'p')).toThrow()
  })
})
