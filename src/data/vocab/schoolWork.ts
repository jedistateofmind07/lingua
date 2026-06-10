import type { VocabDeck } from '../../types/vocab'

export const schoolWork: VocabDeck = {
  id: 'schoolWork',
  title: 'School & work',
  emoji: '🎓',
  entries: [
    { es: 'libro', en: 'book', gender: 'm' },
    { es: 'cuaderno', en: 'notebook', gender: 'm' },
    { es: 'lápiz', en: 'pencil', gender: 'm' },
    {
      es: 'esfero',
      en: 'pen',
      gender: 'm',
      mx: { es: 'pluma', gender: 'f' },
      co: { es: 'esfero', gender: 'm' }
    },
    { es: 'mochila', en: 'backpack', gender: 'f' },
    { es: 'examen', en: 'exam', gender: 'm' },
    { es: 'tarea', en: 'homework', gender: 'f' },
    { es: 'clase', en: 'class', gender: 'f' },
    { es: 'profesor', en: 'teacher', gender: 'm' },
    { es: 'estudiante', en: 'student', gender: 'mf' },
    { es: 'pregunta', en: 'question', gender: 'f' },
    { es: 'respuesta', en: 'answer', gender: 'f' },
    {
      es: 'computador',
      en: 'computer',
      gender: 'm',
      mx: { es: 'computadora', gender: 'f' },
      co: { es: 'computador', gender: 'm' }
    },
    { es: 'escritorio', en: 'desk', gender: 'm' },
    { es: 'oficina', en: 'office', gender: 'f' },
    { es: 'jefe', en: 'boss', gender: 'm' },
    { es: 'reunión', en: 'meeting', gender: 'f' },
    { es: 'sueldo', en: 'salary', gender: 'm' }
  ]
}
