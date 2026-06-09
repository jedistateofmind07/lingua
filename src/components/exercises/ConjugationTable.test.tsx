import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConjugationTable } from './ConjugationTable'
import type { ExerciseItem } from '../../types/exercise'

const items: ExerciseItem[] = [
  { id: 'a', prompt: 'Yo', answer: 'tengo', promptLang: 'es', answerLang: 'es' },
  { id: 'b', prompt: 'Tú', answer: 'tienes', promptLang: 'es', answerLang: 'es' }
]

describe('ConjugationTable', () => {
  it('grades each form and reports mistakes', () => {
    const onComplete = vi.fn()
    render(
      <ConjugationTable items={items} verb="tener" tenseLabel="Presente" onComplete={onComplete} />
    )
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'tengo' } })
    fireEvent.change(inputs[1], { target: { value: 'tiene' } }) // wrong
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

    expect(onComplete).toHaveBeenCalledTimes(1)
    const outcome = onComplete.mock.calls[0][0]
    expect(outcome).toMatchObject({ correct: 1, total: 2 })
    expect(outcome.mistakes).toHaveLength(1)
    expect(outcome.mistakes[0]).toMatchObject({ expected: 'tienes', given: 'tiene' })
  })

  it('accepts accent-insensitive answers', () => {
    const onComplete = vi.fn()
    const single: ExerciseItem[] = [
      { id: 'a', prompt: 'Nosotros', answer: 'tenemos', promptLang: 'es', answerLang: 'es' }
    ]
    render(
      <ConjugationTable items={single} verb="tener" tenseLabel="Presente" onComplete={onComplete} />
    )
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'TENEMOS' } })
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

    expect(onComplete.mock.calls[0][0]).toMatchObject({ correct: 1, total: 1 })
  })
})
