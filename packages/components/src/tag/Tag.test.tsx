import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Tag } from './Tag'

describe('Tag', () => {
  it('should render', () => {
    render(<Tag>My tag</Tag>)

    expect(screen.getByText('My tag')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="tag"]')).toBeInTheDocument()
  })

  it('should support render prop for polymorphism', () => {
    render(<Tag render={<a href="/custom" />}>Link tag</Tag>)

    const el = screen.getByText('Link tag')
    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', '/custom')
  })
})
