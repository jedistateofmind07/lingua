import { describe, it, expect } from 'vitest'
import { buildConjugationTable } from './exerciseBuilders'

describe('buildConjugationTable', () => {
  it('builds the full paradigm for a chosen verb', () => {
    const ex = buildConjugationTable('presente', 'er', 'tener')
    expect(ex.kind).toBe('table')
    expect(ex.meta?.verb).toBe('tener')
    expect(ex.items).toHaveLength(5)
    const map = Object.fromEntries(ex.items.map((i) => [i.prompt, i.answer]))
    expect(map).toMatchObject({
      Yo: 'tengo',
      Tú: 'tienes',
      'él/ella': 'tiene',
      Nosotros: 'tenemos',
      Ellos: 'tienen'
    })
  })

  it('uses a real verb of the class when verb is "random"', () => {
    const ex = buildConjugationTable('presente', 'ar', 'random')
    expect(ex.items).toHaveLength(5)
    expect(ex.meta?.verb).toBeTruthy()
    expect(ex.meta?.verb).not.toBe('random')
  })
})
