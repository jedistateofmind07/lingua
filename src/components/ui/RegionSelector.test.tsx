import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RegionSelector } from './RegionSelector'

describe('RegionSelector', () => {
  it('defaults to Colombian and switches to Mexican', () => {
    render(<RegionSelector />)
    const trigger = screen.getByRole('button', { name: 'Spanish variety' })
    expect(trigger).toHaveTextContent('Colombian')

    fireEvent.click(trigger)
    fireEvent.click(screen.getByText('Mexican'))

    expect(screen.getByRole('button', { name: 'Spanish variety' })).toHaveTextContent('Mexican')
  })
})
