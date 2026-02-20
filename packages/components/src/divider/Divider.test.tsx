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

  describe('render prop (polymorphism)', () => {
    it('should render as custom element when using render prop', () => {
      render(
        <Divider render={<h1 />}>
          <Divider.Content>Section</Divider.Content>
        </Divider>
      )

      // Radix merges role="separator" onto the custom element
      const separator = screen.getByRole('separator')
      expect(separator.tagName).toBe('H1')
      expect(separator).toHaveAttribute('data-spark-component', 'divider')
      expect(separator).toHaveTextContent('Section')
    })

    it('should render as custom element with no content when using render prop', () => {
      render(<Divider render={<hr />} />)

      const hr = document.querySelector('hr')
      expect(hr).toBeInTheDocument()
      expect(hr).toHaveAttribute('data-spark-component', 'divider')
    })
  })
})

describe('Divider.Content', () => {
  it('should render as custom element when using render prop', () => {
    render(
      <Divider.Content render={<span data-testid="custom-content" />}>
        Custom content
      </Divider.Content>
    )

    const custom = screen.getByTestId('custom-content')
    expect(custom).toBeInTheDocument()
    expect(custom).toHaveTextContent('Custom content')
    expect(custom).toHaveAttribute('data-spark-component', 'divider-content')
  })
})
