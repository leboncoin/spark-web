import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Kbd } from './Kbd'

describe('Kbd', () => {
  it('should render', () => {
    render(<Kbd>Hello World!</Kbd>)

    expect(screen.getByText('Hello World!')).toBeInTheDocument()
  })
})
