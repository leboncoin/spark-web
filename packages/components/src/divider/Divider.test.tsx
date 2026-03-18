import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Divider } from './index'

describe('Divider', () => {
  it('should render', () => {
    // Given
    const props = {}

    // When
    render(<Divider {...props} />)

    // Then
    expect(screen.getByRole('separator')).toBeVisible()
  })

  it('should not be separator rolled', () => {
    // Given
    const props = {
      isDecorative: true,
    }

    // When
    render(<Divider {...props} />)

    // Then
    expect(screen.getByRole('none')).toBeVisible()
  })

  it('should contain the content', () => {
    // Given
    const content = 'content'
    const props = {
      children: <Divider.Content>{content}</Divider.Content>,
    }

    // When
    render(<Divider {...props} />)

    // Then
    expect(screen.getByText(content)).toBeVisible()
  })

  it('should NOT contain inner content', () => {
    // Given
    const props = {
      children: <Divider.Content />,
    }

    // When
    render(<Divider {...props} />)

    // Then
    expect(screen.getByRole('separator')).toBeVisible()
    expect(screen.getByRole('separator').innerHTML).toEqual('')
  })

  it('should support asChild', () => {
    // Given
    const props = {
      asChild: true,
      children: <h1 />,
    }

    // When
    render(<Divider {...props} />)

    // Then
    const separator = screen.getByRole('separator')
    expect(separator.tagName).toBe('H1')
  })

  it('should support asChild with empty Content', () => {
    // Given
    const props = {
      asChild: true,
      children: (
        <h1>
          <Divider.Content />
        </h1>
      ),
    }

    // When
    render(<Divider {...props} />)

    // Then
    const separator = screen.getByRole('separator')
    expect(separator.innerHTML).toEqual('')
  })

  it('should support isDecorative with asChild', () => {
    // Given
    const props = {
      asChild: true,
      isDecorative: true,
      children: <h1 />,
    }

    // When
    render(<Divider {...props} />)

    // Then
    expect(screen.getByRole('none')).toBeVisible()
  })
})
