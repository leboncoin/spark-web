import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Card } from './Card'

describe('Card', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should render', () => {
    render(<Card>Hello World!</Card>)

    expect(screen.getByText('Hello World!')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="card"]')).toBeInTheDocument()
  })

  it('should render as link', () => {
    render(
      <Card asChild>
        <a href="/">Link</a>
      </Card>
    )

    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('href', '/')
  })
})
