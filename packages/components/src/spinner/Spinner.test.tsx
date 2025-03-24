import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('should render', () => {
    // Given
    const props = { label: 'label' }

    // When
    render(<Spinner {...props} />)

    // Then
    expect(screen.getByText(props.label)).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="spinner"]')).toBeInTheDocument()
  })
})
