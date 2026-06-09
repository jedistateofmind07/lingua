import { describe, it, expect } from 'vitest'
import { TENSES } from './tenses'
import { TENSE_EXPLANATIONS } from './explanations'

describe('TENSE_EXPLANATIONS', () => {
  it('covers every tense with a summary and at least two examples', () => {
    for (const t of TENSES) {
      const ex = TENSE_EXPLANATIONS[t.id]
      expect(ex, t.id).toBeTruthy()
      expect(ex.summary.length, t.id).toBeGreaterThan(0)
      expect(ex.examples.length, t.id).toBeGreaterThanOrEqual(2)
      for (const e of ex.examples) {
        expect(e.es.length).toBeGreaterThan(0)
        expect(e.en.length).toBeGreaterThan(0)
      }
    }
  })

  it('gives compound tenses a formula and simple tenses none', () => {
    for (const t of TENSES) {
      const ex = TENSE_EXPLANATIONS[t.id]
      if (t.isCompound) expect(ex.formula, t.id).toBeTruthy()
    }
  })
})
