import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Tag } from './Tag'

describe('Tag', () => {
  it('should render', () => {
    render(<Tag>My tag</Tag>)

    expect(screen.getByText('My tag')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="tag"]')).toBeInTheDocument()
  })
})
