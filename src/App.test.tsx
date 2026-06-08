import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

describe('App routes render without crashing', () => {
  it('dashboard', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Lingua' })).toBeInTheDocument()
    expect(screen.getByText('Vocabulary')).toBeInTheDocument()
    expect(screen.getByText('Conjugations')).toBeInTheDocument()
    expect(screen.getByText('Coming in Phase 2')).toBeInTheDocument()
  })

  it('vocab topics', () => {
    renderAt('/vocab')
    expect(screen.getByText('Food & drink')).toBeInTheDocument()
    expect(screen.getByText('Parts of the body')).toBeInTheDocument()
  })

  it('vocab matching session', () => {
    renderAt('/vocab/food')
    expect(screen.getByText('Tap the matching pairs')).toBeInTheDocument()
  })

  it('conjugation setup', () => {
    renderAt('/conjugations')
    expect(screen.getByText('Full forms')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  })
})
