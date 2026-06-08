export type Gender = 'm' | 'f' | 'mf' | 'none'

export interface VocabEntry {
  es: string // Spanish term (article omitted; gender carried separately)
  en: string // English gloss
  gender?: Gender
  example?: string // optional Spanish example sentence
}

export type VocabTopicId =
  | 'body'
  | 'kitchen'
  | 'household'
  | 'food'
  | 'animals'
  | 'family'
  | 'emotions'
  | 'timeDates'
  | 'places'
  | 'schoolWork'

export interface VocabDeck {
  id: VocabTopicId
  title: string
  emoji?: string
  entries: VocabEntry[]
}
