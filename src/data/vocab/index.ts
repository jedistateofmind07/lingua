import type { VocabDeck, VocabTopicId, VocabEntry, Region, Gender } from '../../types/vocab'
import { body } from './body'
import { kitchen } from './kitchen'
import { household } from './household'
import { food } from './food'
import { animals } from './animals'
import { family } from './family'
import { emotions } from './emotions'
import { timeDates } from './timeDates'
import { places } from './places'
import { schoolWork } from './schoolWork'

export const DECKS: VocabDeck[] = [
  body,
  kitchen,
  household,
  food,
  animals,
  family,
  emotions,
  timeDates,
  places,
  schoolWork
]

export const DECK_BY_ID: Record<VocabTopicId, VocabDeck> = Object.fromEntries(
  DECKS.map((d) => [d.id, d])
) as Record<VocabTopicId, VocabDeck>

export function getDeck(id: string): VocabDeck | undefined {
  return DECK_BY_ID[id as VocabTopicId]
}

// Resolve an entry to the word + gender for the selected region.
export function resolveEntry(
  entry: VocabEntry,
  region: Region
): { es: string; en: string; gender?: Gender } {
  const variant = region === 'mx' ? entry.mx : entry.co
  return {
    es: variant?.es ?? entry.es,
    en: entry.en,
    gender: variant?.gender ?? entry.gender
  }
}
