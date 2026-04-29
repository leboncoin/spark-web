import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Card } from './index'

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

    const link = screen.getByRole('link', { name: 'Link' })
    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveAttribute('data-spark-component', 'card')
  })

  it('should render as button', () => {
    render(
      <Card asChild>
        <button type="button">Click me</button>
      </Card>
    )

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toHaveAttribute('data-spark-component', 'card')
  })
})

describe('Card.Type', () => {
  it('should render with text content', () => {
    render(
      <Card>
        <Card.Type>Best seller</Card.Type>
        <Card.Content>Content</Card.Content>
      </Card>
    )

    expect(screen.getByText('Best seller')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should not render when children is empty', () => {
    const { container } = render(
      <Card>
        <Card.Type />
        <Card.Content>Content</Card.Content>
      </Card>
    )

    expect(container.querySelector('header')).not.toBeInTheDocument()
  })

  it('should apply intent colors', () => {
    render(
      <Card>
        <Card.Type intent="success">New product</Card.Type>
        <Card.Content>Content</Card.Content>
      </Card>
    )

    const header = screen.getByRole('banner')
    expect(header.className).toContain('bg-success')
    expect(header.className).toContain('text-on-success')
  })

  it('should adjust Content layout when Type is present', () => {
    const { container } = render(
      <Card>
        <Card.Type>Featured</Card.Type>
        <Card.Content>Content</Card.Content>
      </Card>
    )

    // Card.Content should have rounded-t-0 when Type is present
    const cardContent = container.querySelector('[data-spark-component="card-content"]')
    expect(cardContent?.className).toContain('rounded-t-0')
  })
})
