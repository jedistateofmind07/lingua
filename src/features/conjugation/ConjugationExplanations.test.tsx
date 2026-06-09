import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConjugationExplanations } from './ConjugationExplanations'

describe('ConjugationExplanations', () => {
  it('shows framework, irregulars and examples for the default-open tense', () => {
    render(<ConjugationExplanations />)
    expect(screen.getByText('Framework')).toBeInTheDocument()
    expect(screen.getByText('Examples')).toBeInTheDocument()
    // Presente is open by default; its endings grid shows the -ar/-er/-ir headers.
    expect(screen.getByText('-ar')).toBeInTheDocument()
    // Irregulars table is engine-generated for the tense.
    expect(screen.getByText('Common irregulars')).toBeInTheDocument()
    expect(screen.getByText('tengo')).toBeInTheDocument()
    expect(screen.getByText('soy')).toBeInTheDocument()
  })

  it('shows irregular participles for a compound tense', () => {
    render(<ConjugationExplanations />)
    fireEvent.click(screen.getByText('Pretérito Perfecto'))
    expect(screen.getByText(/haber in the present/i)).toBeInTheDocument()
    expect(screen.getByText('Irregular participles')).toBeInTheDocument()
    expect(screen.getByText('visto')).toBeInTheDocument()
  })
})
