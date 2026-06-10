import type { VocabDeck } from '../../types/vocab'

export const bedroom: VocabDeck = {
  id: 'bedroom',
  title: 'Bedroom',
  emoji: '🛏️',
  entries: [
    { es: 'cama', en: 'bed', gender: 'f' },
    { es: 'colchón', en: 'mattress', gender: 'm' },
    { es: 'sábana', en: 'bed sheet', gender: 'f' },
    { es: 'cobija', en: 'blanket', gender: 'f' },
    { es: 'edredón', en: 'comforter', gender: 'm' },
    { es: 'almohada', en: 'pillow', gender: 'f' },
    { es: 'funda', en: 'pillowcase', gender: 'f' },
    { es: 'clóset', en: 'closet', gender: 'm' },
    { es: 'base de la cama', en: 'bed frame', gender: 'f' },
    { es: 'cabecera', en: 'headboard', gender: 'f' },
    {
      es: 'mesa de noche',
      en: 'nightstand',
      gender: 'f',
      mx: { es: 'buró', gender: 'm' },
      co: { es: 'mesa de noche', gender: 'f' }
    },
    { es: 'despertador', en: 'alarm clock', gender: 'm' },
    { es: 'cortina', en: 'curtain', gender: 'f' },
    { es: 'cómoda', en: 'dresser', gender: 'f' },
    { es: 'lámpara', en: 'lamp', gender: 'f' },
    { es: 'ventilador', en: 'fan', gender: 'm' }
  ]
}
