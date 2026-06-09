import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConjugationExplanations } from './ConjugationExplanations'

describe('ConjugationExplanations', () => {
  it('shows framework + examples for the default-open tense', () => {
    render(<ConjugationExplanations />)
    expect(screen.getByText('Framework')).toBeInTheDocument()
    expect(screen.getByText('Examples')).toBeInTheDocument()
    // Presente is open by default; its endings grid shows the -ar/-er/-ir headers.
    expect(screen.getByText('-ar')).toBeInTheDocument()
  })

  it('expands another tense on click', () => {
    render(<ConjugationExplanations />)
    fireEvent.click(screen.getByText('Pretérito Perfecto'))
    // Compound tense shows a haber formula instead of an endings grid.
    expect(screen.getByText(/haber in the present/i)).toBeInTheDocument()
  })
})
