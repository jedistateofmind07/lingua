import type { TenseId } from '../../types/conjugation'

export interface TenseExplanation {
  summary: string // what it's for / how it's used
  frameworkNote?: string // extra note shown under the endings grid (simple tenses)
  formula?: string // shown instead of a grid for compound tenses
  examples: { es: string; en: string }[]
}

// VERIFIED Spanish examples. Keep these correct — they are shown as reference.
export const TENSE_EXPLANATIONS: Record<TenseId, TenseExplanation> = {
  presente: {
    summary:
      'The everyday present. Use it for current actions, habits, general facts, and states. English: "I speak" / "I do speak" / "I am speaking".',
    examples: [
      { es: 'Yo hablo español.', en: 'I speak Spanish.' },
      { es: 'Ella vive en Colombia.', en: 'She lives in Colombia.' },
      { es: 'Comemos a las ocho.', en: 'We eat at eight.' }
    ]
  },
  indefinido: {
    summary:
      'The preterite — completed, specific actions in the past with a clear start and end. Use it for one-time events: "I ate", "she called".',
    examples: [
      { es: 'Ayer comí una pizza.', en: 'Yesterday I ate a pizza.' },
      { es: 'Ella habló con su madre.', en: 'She spoke with her mother.' },
      { es: 'Estudiamos toda la noche.', en: 'We studied all night.' }
    ]
  },
  imperfecto: {
    summary:
      'The descriptive past — ongoing, habitual, or background actions. Use it for "used to", "was/were ___ing", and for setting the scene (age, weather, feelings).',
    examples: [
      { es: 'Cuando era niño, jugaba mucho.', en: 'When I was a child, I used to play a lot.' },
      { es: 'Llovía y hacía frío.', en: 'It was raining and it was cold.' },
      { es: 'Siempre estudiábamos juntos.', en: 'We always used to study together.' }
    ]
  },
  futuro: {
    summary:
      'The simple future — "will ___". Also used for guessing/probability about the present ("where can he be?").',
    frameworkNote: 'Endings attach to the full infinitive (e.g. hablar + é = hablaré).',
    examples: [
      { es: 'Mañana hablaré con el profesor.', en: 'Tomorrow I will speak with the teacher.' },
      { es: 'Comeremos en casa.', en: 'We will eat at home.' },
      { es: '¿Dónde estará Juan?', en: 'Where can Juan be? (probability)' }
    ]
  },
  condicionalSimple: {
    summary:
      'The conditional — "would ___". Use it for hypotheticals, polite requests, and wishes.',
    frameworkNote: 'Endings attach to the full infinitive (e.g. comer + ía = comería).',
    examples: [
      { es: 'Me gustaría aprender más.', en: 'I would like to learn more.' },
      { es: 'Yo hablaría con ella.', en: 'I would speak with her.' },
      { es: 'Viviríamos cerca del mar.', en: 'We would live near the sea.' }
    ]
  },
  subjPresente: {
    summary:
      'The present subjunctive — for wishes, doubts, emotions, and recommendations rather than facts. Triggered by phrases like quiero que…, espero que…, dudo que…, es importante que…, ojalá.',
    frameworkNote: 'The endings "flip": –ar verbs take –e endings; –er/–ir verbs take –a endings.',
    examples: [
      { es: 'Espero que estudies.', en: 'I hope (that) you study.' },
      { es: 'Quiero que hables con él.', en: 'I want you to talk to him.' },
      { es: 'Es importante que comamos bien.', en: "It's important that we eat well." }
    ]
  },
  subjImperfecto: {
    summary:
      'The past subjunctive — wishes, doubts, and emotions about the past, and the "if" half of hypotheticals (Si tuviera…).',
    frameworkNote: 'Take the ellos preterite (hablaron, comieron), drop –ron, then add these endings.',
    examples: [
      { es: 'Quería que estudiaras más.', en: 'I wanted you to study more.' },
      { es: 'Si tuviera tiempo, viajaría.', en: 'If I had time, I would travel.' },
      { es: 'Ojalá hablara mejor español.', en: 'I wish I spoke better Spanish.' }
    ]
  },
  perfecto: {
    summary:
      'The present perfect — "have/has ___". Recent past actions still connected to now (today, this week, ever).',
    formula: 'haber in the present (he, has, ha, hemos, han) + past participle (–ar → –ado; –er/–ir → –ido).',
    examples: [
      { es: 'He comido pizza esta semana.', en: 'I have eaten pizza this week.' },
      { es: '¿Has hablado con ella?', en: 'Have you spoken with her?' },
      { es: 'Hemos estudiado mucho hoy.', en: 'We have studied a lot today.' }
    ]
  },
  pluscuamperfecto: {
    summary:
      'The past perfect — "had ___". An action finished before another past action.',
    formula: 'haber in the imperfect (había, habías, había, habíamos, habían) + past participle.',
    examples: [
      { es: 'Yo había comido antes de salir.', en: 'I had eaten before leaving.' },
      { es: 'Ella ya había hablado con él.', en: 'She had already spoken with him.' },
      { es: 'Nunca habíamos viajado a España.', en: 'We had never traveled to Spain.' }
    ]
  },
  condicionalCompuesto: {
    summary:
      'The conditional perfect — "would have ___". Hypothetical outcomes in the past.',
    formula: 'haber in the conditional (habría, habrías, habría, habríamos, habrían) + past participle.',
    examples: [
      { es: 'Yo habría estudiado más.', en: 'I would have studied more.' },
      { es: 'Ella habría venido, pero estaba enferma.', en: 'She would have come, but she was sick.' },
      { es: 'Habríamos hablado contigo.', en: 'We would have spoken with you.' }
    ]
  }
}
