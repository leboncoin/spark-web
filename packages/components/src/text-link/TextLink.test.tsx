import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TextLink } from './TextLink'

const urls = {
  kitten: 'https://en.wikipedia.org/wiki/Kitten',
}

describe('TextLink', () => {
  it('should render', () => {
    render(<TextLink href={urls.kitten}>Kitten</TextLink>)

    const link = screen.getByRole('link', {
      name: 'Kitten',
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', urls.kitten)
  })
})
