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
})
