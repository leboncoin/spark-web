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

  describe('render prop (polymorphism)', () => {
    it('should render as custom element when using render prop', () => {
      render(
        <>
          <Label render={<h2 />}>Section title</Label>
          <input id="section" type="text" aria-labelledby="section" />
        </>
      )

      const heading = screen.getByRole('heading', { level: 2, name: 'Section title' })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H2')
      expect(heading).toHaveAttribute('data-spark-component', 'label')
    })
  })
})
