import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Label } from '.'

describe('Label', () => {
  it('should render applying correct labelling when wrapping controls', () => {
    render(
      <Label>
        Title <input type="text" name="title" />
      </Label>
    )

    expect(screen.getByLabelText('Title')).toBeInTheDocument()
  })

  it('should render applying correct labelling when not wrapping controls ', () => {
    render(
      <>
        <Label htmlFor="id">Title</Label>
        <input id="id" type="text" name="title" />
      </>
    )

    expect(screen.getByLabelText('Title')).toBeInTheDocument()
  })

  it('should render default required indicator', () => {
    render(
      <>
        <Label htmlFor="id">
          Title
          <Label.RequiredIndicator />
        </Label>
        <input id="id" type="text" name="title" />
      </>
    )

    expect(screen.getByLabelText(/Title/)).toBeInTheDocument()

    const requiredEl = screen.getByText('*')

    expect(requiredEl).toHaveAttribute('role', 'presentation')
    expect(requiredEl).toHaveAttribute('aria-hidden', 'true')
  })

  it('should render custom required indicator', () => {
    render(
      <>
        <Label htmlFor="id">
          Title
          <Label.RequiredIndicator>Required</Label.RequiredIndicator>
        </Label>
        <input id="id" type="text" name="title" />
      </>
    )

    expect(screen.getByLabelText(/Title/)).toBeInTheDocument()

    const requiredEl = screen.getByText('Required')

    expect(requiredEl).toHaveAttribute('role', 'presentation')
    expect(requiredEl).toHaveAttribute('aria-hidden', 'true')
  })
})
