import { describe, it, expect } from 'vitest'
import { conjugate, conjugateAll, getVerbClass } from './conjugate'

describe('regular verbs', () => {
  it('-ar (hablar) across simple tenses', () => {
    expect(conjugateAll('hablar', 'presente')).toEqual({
      yo: 'hablo',
      tu: 'hablas',
      el: 'habla',
      nosotros: 'hablamos',
      ellos: 'hablan'
    })
    expect(conjugateAll('hablar', 'indefinido')).toEqual({
      yo: 'hablé',
      tu: 'hablaste',
      el: 'habló',
      nosotros: 'hablamos',
      ellos: 'hablaron'
    })
    expect(conjugateAll('hablar', 'imperfecto')).toEqual({
      yo: 'hablaba',
      tu: 'hablabas',
      el: 'hablaba',
      nosotros: 'hablábamos',
      ellos: 'hablaban'
    })
    expect(conjugateAll('hablar', 'futuro')).toEqual({
      yo: 'hablaré',
      tu: 'hablarás',
      el: 'hablará',
      nosotros: 'hablaremos',
      ellos: 'hablarán'
    })
    expect(conjugateAll('hablar', 'condicionalSimple')).toEqual({
      yo: 'hablaría',
      tu: 'hablarías',
      el: 'hablaría',
      nosotros: 'hablaríamos',
      ellos: 'hablarían'
    })
    expect(conjugateAll('hablar', 'subjPresente')).toEqual({
      yo: 'hable',
      tu: 'hables',
      el: 'hable',
      nosotros: 'hablemos',
      ellos: 'hablen'
    })
    expect(conjugateAll('hablar', 'subjImperfecto')).toEqual({
      yo: 'hablara',
      tu: 'hablaras',
      el: 'hablara',
      nosotros: 'habláramos',
      ellos: 'hablaran'
    })
  })

  it('-er (comer)', () => {
    expect(conjugateAll('comer', 'presente')).toEqual({
      yo: 'como',
      tu: 'comes',
      el: 'come',
      nosotros: 'comemos',
      ellos: 'comen'
    })
    expect(conjugateAll('comer', 'indefinido')).toEqual({
      yo: 'comí',
      tu: 'comiste',
      el: 'comió',
      nosotros: 'comimos',
      ellos: 'comieron'
    })
    expect(conjugateAll('comer', 'imperfecto')).toEqual({
      yo: 'comía',
      tu: 'comías',
      el: 'comía',
      nosotros: 'comíamos',
      ellos: 'comían'
    })
    expect(conjugate('comer', 'subjImperfecto', 'nosotros')).toBe('comiéramos')
  })

  it('-ir (vivir)', () => {
    expect(conjugateAll('vivir', 'presente')).toEqual({
      yo: 'vivo',
      tu: 'vives',
      el: 'vive',
      nosotros: 'vivimos',
      ellos: 'viven'
    })
    expect(conjugateAll('vivir', 'indefinido')).toEqual({
      yo: 'viví',
      tu: 'viviste',
      el: 'vivió',
      nosotros: 'vivimos',
      ellos: 'vivieron'
    })
    expect(conjugate('vivir', 'futuro', 'yo')).toBe('viviré')
  })
})

describe('compound tenses (regular)', () => {
  it('perfecto / pluscuamperfecto / condicional compuesto', () => {
    expect(conjugate('hablar', 'perfecto', 'yo')).toBe('he hablado')
    expect(conjugate('comer', 'pluscuamperfecto', 'yo')).toBe('había comido')
    expect(conjugate('vivir', 'condicionalCompuesto', 'yo')).toBe('habría vivido')
    expect(conjugate('hablar', 'perfecto', 'ellos')).toBe('han hablado')
    expect(conjugate('comer', 'pluscuamperfecto', 'nosotros')).toBe('habíamos comido')
  })
})

describe('irregular verbs', () => {
  it('ser', () => {
    expect(conjugateAll('ser', 'presente')).toEqual({
      yo: 'soy',
      tu: 'eres',
      el: 'es',
      nosotros: 'somos',
      ellos: 'son'
    })
    expect(conjugateAll('ser', 'indefinido')).toEqual({
      yo: 'fui',
      tu: 'fuiste',
      el: 'fue',
      nosotros: 'fuimos',
      ellos: 'fueron'
    })
    expect(conjugateAll('ser', 'imperfecto')).toEqual({
      yo: 'era',
      tu: 'eras',
      el: 'era',
      nosotros: 'éramos',
      ellos: 'eran'
    })
    // regular future for ser
    expect(conjugate('ser', 'futuro', 'yo')).toBe('seré')
  })

  it('ir', () => {
    expect(conjugateAll('ir', 'presente')).toEqual({
      yo: 'voy',
      tu: 'vas',
      el: 'va',
      nosotros: 'vamos',
      ellos: 'van'
    })
    expect(conjugateAll('ir', 'indefinido')).toEqual({
      yo: 'fui',
      tu: 'fuiste',
      el: 'fue',
      nosotros: 'fuimos',
      ellos: 'fueron'
    })
    expect(conjugate('ir', 'imperfecto', 'nosotros')).toBe('íbamos')
  })

  it('irregular future/conditional stems', () => {
    expect(conjugate('tener', 'futuro', 'yo')).toBe('tendré')
    expect(conjugate('tener', 'condicionalSimple', 'yo')).toBe('tendría')
    expect(conjugate('hacer', 'futuro', 'yo')).toBe('haré')
    expect(conjugate('decir', 'futuro', 'yo')).toBe('diré')
    expect(conjugate('poder', 'futuro', 'el')).toBe('podrá')
    expect(conjugate('venir', 'futuro', 'yo')).toBe('vendré')
    expect(conjugate('saber', 'futuro', 'yo')).toBe('sabré')
  })

  it('irregular preterites and present', () => {
    expect(conjugateAll('hacer', 'indefinido')).toEqual({
      yo: 'hice',
      tu: 'hiciste',
      el: 'hizo',
      nosotros: 'hicimos',
      ellos: 'hicieron'
    })
    expect(conjugate('tener', 'presente', 'yo')).toBe('tengo')
    expect(conjugate('saber', 'presente', 'yo')).toBe('sé')
    expect(conjugate('ver', 'presente', 'yo')).toBe('veo')
    expect(conjugate('estar', 'indefinido', 'yo')).toBe('estuve')
  })

  it('irregular subjunctive present', () => {
    expect(conjugate('tener', 'subjPresente', 'yo')).toBe('tenga')
    expect(conjugate('saber', 'subjPresente', 'yo')).toBe('sepa')
    expect(conjugate('ir', 'subjPresente', 'nosotros')).toBe('vayamos')
  })

  it('subjunctive imperfect derives from irregular preterite', () => {
    expect(conjugateAll('tener', 'subjImperfecto')).toEqual({
      yo: 'tuviera',
      tu: 'tuvieras',
      el: 'tuviera',
      nosotros: 'tuviéramos',
      ellos: 'tuvieran'
    })
    expect(conjugate('decir', 'subjImperfecto', 'yo')).toBe('dijera')
    expect(conjugate('decir', 'subjImperfecto', 'nosotros')).toBe('dijéramos')
  })

  it('irregular participles in compound tenses', () => {
    expect(conjugate('ver', 'perfecto', 'yo')).toBe('he visto')
    expect(conjugate('hacer', 'perfecto', 'yo')).toBe('he hecho')
    expect(conjugate('decir', 'perfecto', 'yo')).toBe('he dicho')
    expect(conjugate('hacer', 'perfecto', 'nosotros')).toBe('hemos hecho')
    expect(conjugate('ser', 'perfecto', 'yo')).toBe('he sido')
    expect(conjugate('ir', 'condicionalCompuesto', 'yo')).toBe('habría ido')
  })
})

describe('errors', () => {
  it('throws on unrecognized infinitive', () => {
    expect(() => conjugate('hello', 'presente', 'yo')).toThrow()
    expect(() => getVerbClass('hello')).toThrow()
  })
})
