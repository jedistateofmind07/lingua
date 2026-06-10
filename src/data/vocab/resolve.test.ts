import { describe, it, expect } from 'vitest'
import { resolveEntry } from './index'
import type { VocabEntry } from '../../types/vocab'

const banana: VocabEntry = {
  es: 'banano',
  en: 'banana',
  gender: 'm',
  mx: { es: 'plátano', gender: 'm' },
  co: { es: 'banano', gender: 'm' }
}
const fridge: VocabEntry = {
  es: 'nevera',
  en: 'refrigerator',
  gender: 'f',
  mx: { es: 'refrigerador', gender: 'm' },
  co: { es: 'nevera', gender: 'f' }
}
const bread: VocabEntry = { es: 'pan', en: 'bread', gender: 'm' }

describe('resolveEntry', () => {
  it('uses the region-specific word', () => {
    expect(resolveEntry(banana, 'mx').es).toBe('plátano')
    expect(resolveEntry(banana, 'co').es).toBe('banano')
  })

  it('uses the region-specific gender', () => {
    expect(resolveEntry(fridge, 'mx').gender).toBe('m')
    expect(resolveEntry(fridge, 'co').gender).toBe('f')
  })

  it('falls back to the base word when no variant exists', () => {
    expect(resolveEntry(bread, 'mx').es).toBe('pan')
    expect(resolveEntry(bread, 'co').es).toBe('pan')
  })
})
