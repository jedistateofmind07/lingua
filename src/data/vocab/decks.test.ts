import { describe, it, expect } from 'vitest'
import { DECKS, getDeck } from './index'

describe('vocab decks', () => {
  it('includes the bedroom and face decks', () => {
    expect(getDeck('bedroom')?.entries.length ?? 0).toBeGreaterThanOrEqual(10)
    expect(getDeck('face')?.entries.length ?? 0).toBeGreaterThanOrEqual(10)
  })

  it('every entry (and region variant) has non-empty es and en', () => {
    for (const d of DECKS) {
      for (const e of d.entries) {
        expect(e.es.length, `${d.id}.es`).toBeGreaterThan(0)
        expect(e.en.length, `${d.id}.en`).toBeGreaterThan(0)
        if (e.mx) expect(e.mx.es.length).toBeGreaterThan(0)
        if (e.co) expect(e.co.es.length).toBeGreaterThan(0)
      }
    }
  })

  it('has unique topic ids', () => {
    const ids = DECKS.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
