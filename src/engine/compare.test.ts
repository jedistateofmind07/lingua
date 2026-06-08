import { describe, it, expect } from 'vitest'
import { normalize, stripAccents, isCorrect } from './compare'

describe('normalize', () => {
  it('trims, lowercases, collapses whitespace', () => {
    expect(normalize('  Hablé ')).toBe('hablé')
    expect(normalize('he   comido')).toBe('he comido')
  })
})

describe('stripAccents', () => {
  it('removes diacritics', () => {
    expect(stripAccents('habló')).toBe('hablo')
    expect(stripAccents('canción')).toBe('cancion')
  })
  it('preserves ñ', () => {
    expect(stripAccents('niño')).toBe('niño')
    expect(stripAccents('español')).toBe('español')
  })
})

describe('isCorrect', () => {
  it('is accent-insensitive by default', () => {
    expect(isCorrect('hable', 'hablé')).toBe(true)
    expect(isCorrect('mama', 'mamá')).toBe(true)
  })
  it('can be strict', () => {
    expect(isCorrect('hable', 'hablé', { accentInsensitive: false })).toBe(false)
  })
  it('ignores case and surrounding whitespace', () => {
    expect(isCorrect('  Hablé', 'hablé')).toBe(true)
  })
  it('treats ñ as distinct from n', () => {
    expect(isCorrect('nino', 'niño')).toBe(false)
  })
  it('accepts alternates', () => {
    expect(isCorrect('he comido', 'comí', { alternates: ['he comido'] })).toBe(true)
  })
})
