export type Gender = 'm' | 'f' | 'mf' | 'none'

// Which Spanish variety the learner is studying.
export type Region = 'mx' | 'co'

// A region-specific override for a word (and possibly its gender).
export interface VocabVariant {
  es: string
  gender?: Gender
}

export interface VocabEntry {
  es: string // base Spanish term (used when no region variant applies)
  en: string // English gloss
  gender?: Gender
  example?: string // optional Spanish example sentence
  mx?: VocabVariant // Mexican Spanish override
  co?: VocabVariant // Colombian Spanish override
}

export type VocabTopicId =
  | 'body'
  | 'face'
  | 'kitchen'
  | 'household'
  | 'bedroom'
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
