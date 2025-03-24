import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as Icons from './index'

describe('Icons', () => {
  Object.entries(Icons).forEach(([name, Icon]) => {
    describe(`${name}`, () => {
      it('should be an svg', () => {
        // Given
        const props = { 'data-testid': 'testId' }

        // When
        render(<Icon {...props} />)
        const element = screen.getByTestId(props['data-testid'])

        // Then
        expect(element).not.toBeNull()
      })

      it('should not have height and width', () => {
        // Given
        const props = { 'data-testid': 'testId' }

        // When
        render(<Icon {...props} />)
        const element = screen.getByTestId(props['data-testid'])

        // Then
        expect(element).not.toHaveAttribute('width')
        expect(element).not.toHaveAttribute('height')
      })

      it('should have viewBox="0 0 24 24"', () => {
        // Given
        const props = { 'data-testid': 'testId' }

        // When
        render(<Icon {...props} />)
        const element = screen.getByTestId(props['data-testid'])

        // Then
        expect(element).toHaveAttribute('viewBox', '0 0 24 24')
      })

      it('should have a title', () => {
        // Given
        const props = {
          title: 'title',
        }

        // When
        render(<Icon {...props} />)
        const element = screen.getByTitle(props.title)

        // Then
        expect(element).not.toBeNull()
      })
    })
  })
})
