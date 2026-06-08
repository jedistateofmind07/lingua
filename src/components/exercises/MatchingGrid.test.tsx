import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MatchingGrid } from './MatchingGrid'
import type { ExerciseItem } from '../../types/exercise'

const items: ExerciseItem[] = [
  { id: '1', prompt: 'perro', answer: 'dog', promptLang: 'es', answerLang: 'en' },
  { id: '2', prompt: 'gato', answer: 'cat', promptLang: 'es', answerLang: 'en' }
]

describe('MatchingGrid', () => {
  it('fires onComplete when all pairs are matched', () => {
    const onComplete = vi.fn()
    render(<MatchingGrid items={items} onComplete={onComplete} />)

    fireEvent.click(screen.getByText('perro'))
    fireEvent.click(screen.getByText('dog'))
    fireEvent.click(screen.getByText('gato'))
    fireEvent.click(screen.getByText('cat'))

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(onComplete.mock.calls[0][0]).toMatchObject({ correct: 2, total: 2 })
  })

  it('does not complete on a wrong pairing', () => {
    const onComplete = vi.fn()
    render(<MatchingGrid items={items} onComplete={onComplete} />)

    fireEvent.click(screen.getByText('perro'))
    fireEvent.click(screen.getByText('cat')) // wrong match

    expect(onComplete).not.toHaveBeenCalled()
  })
})
