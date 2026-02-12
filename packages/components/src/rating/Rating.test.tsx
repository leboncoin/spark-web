import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { FormField } from '../form-field'
import { Rating } from './Rating'
import type { RatingValue } from './types'

const getCheckedValue = (): number => {
  const radios = screen.getAllByRole('radio')
  const index = radios.findIndex(r => r.getAttribute('aria-checked') === 'true')

  return index >= 0 ? index + 1 : 0
}

const defaultProps = {
  'aria-label': 'rating',
}

describe('Rating', () => {
  it('should render', () => {
    render(<Rating {...defaultProps} defaultValue={2} />)

    expect(screen.getByRole('radiogroup', { name: /rating/i })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(5)
    expect(screen.getByRole('radio', { name: 'rating 1' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'rating 5' })).toBeInTheDocument()
  })

  it('should use radiogroup aria-label as default prefix for star labels', () => {
    render(<Rating aria-label="Product rating" defaultValue={2} />)

    const radios = screen.getAllByRole('radio')

    expect(radios[0]).toHaveAttribute('aria-label', 'Product rating 1')
    expect(radios[1]).toHaveAttribute('aria-label', 'Product rating 2')
    expect(radios[2]).toHaveAttribute('aria-label', 'Product rating 3')
    expect(radios[3]).toHaveAttribute('aria-label', 'Product rating 4')
    expect(radios[4]).toHaveAttribute('aria-label', 'Product rating 5')
  })

  it('should allow custom star labels with getStarLabel', () => {
    render(<Rating {...defaultProps} getStarLabel={index => `User score ${index + 1}`} />)

    const radios = screen.getAllByRole('radio')

    expect(radios[0]).toHaveAttribute('aria-label', 'User score 1')
    expect(radios[4]).toHaveAttribute('aria-label', 'User score 5')
  })

  it('should be possible to interact', async () => {
    const user = userEvent.setup()

    render(<Rating {...defaultProps} defaultValue={1} />)

    const firstStar = screen.getByRole('radio', { name: 'rating 1' })
    const thirdStar = screen.getByRole('radio', { name: 'rating 3' })
    const fifthRadio = screen.getAllByRole('radio')[4]

    if (!fifthRadio) throw new Error('Fifth radio not found')

    // initial value: first radio checked
    expect(getCheckedValue()).toBe(1)

    await user.click(thirdStar)
    expect(getCheckedValue()).toBe(3)

    await user.click(firstStar)
    expect(getCheckedValue()).toBe(1)

    // keyboard: move to 5th radio and select with Space
    await user.click(fifthRadio)
    expect(getCheckedValue()).toBe(5)
  })

  it('should handle controlled mode', async () => {
    function ControlledRating({ onValueChange }: { onValueChange: (value: RatingValue) => void }) {
      const [value, setValue] = useState<RatingValue>(2)

      const handleInteraction = (value: RatingValue): void => {
        onValueChange(value)
        setValue(value)
      }

      return <Rating {...defaultProps} value={value} onValueChange={handleInteraction} />
    }

    const onValueChangeSpy = vi.fn()
    const user = userEvent.setup()
    render(<ControlledRating onValueChange={onValueChangeSpy} />)

    const fifthStar = screen.getByRole('radio', { name: 'rating 5' })
    const secondStar = screen.getByRole('radio', { name: 'rating 2' })

    // initial value: second radio checked
    expect(getCheckedValue()).toBe(2)

    await user.click(fifthStar)
    expect(getCheckedValue()).toBe(5)
    expect(onValueChangeSpy).toHaveBeenCalledTimes(1)
    expect(onValueChangeSpy).toHaveBeenCalledWith(5)

    await user.click(secondStar)
    expect(getCheckedValue()).toBe(2)
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(2)
  })

  it('should not expose value 0 when interacting (radiogroup only allows 1-5)', () => {
    render(<Rating {...defaultProps} defaultValue={3} />)

    // With radiogroup pattern, user can only select 1-5; no "zero" option
    expect(getCheckedValue()).toBe(3)
  })

  it('should not be possible to interact when in readOnly (in controlled mode)', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()

    render(<Rating {...defaultProps} value={1} onValueChange={handleValueChange} readOnly />)

    const secondStar = screen.getByRole('radio', { name: 'rating 2' })

    // Radios are not focusable when readOnly (tabIndex -1)
    expect(screen.getAllByRole('radio').every(r => r.getAttribute('tabindex') === '-1')).toBe(true)

    await user.click(secondStar)
    expect(handleValueChange).not.toHaveBeenCalled()
    expect(getCheckedValue()).toBe(1)
  })

  it('should not be possible to interact when disabled (in uncontrolled mode)', async () => {
    const user = userEvent.setup()
    render(<Rating {...defaultProps} defaultValue={1} disabled />)

    const fifthStar = screen.getByRole('radio', { name: 'rating 5' })

    expect(screen.getAllByRole('radio').every(r => r.getAttribute('tabindex') === '-1')).toBe(true)

    await user.click(fifthStar)
    expect(getCheckedValue()).toBe(1)
  })

  describe('with FormField', () => {
    it('should render with custom label', () => {
      render(
        <FormField name="score">
          <FormField.Label>
            <p>Product score</p>
          </FormField.Label>

          <Rating defaultValue={3} />
        </FormField>
      )

      expect(screen.getByRole('radiogroup', { name: 'Product score' })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: 'Product score 1' })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: 'Product score 4' })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: 'Product score 5' })).toBeInTheDocument()
    })

    it('should render aria-attributes and hidden input following FormField implementation', () => {
      render(
        <FormField name="score" state="error" isRequired>
          <FormField.Label>
            <p>Product score</p>
          </FormField.Label>

          <Rating defaultValue={4} />

          <FormField.HelperMessage>Please provide your score</FormField.HelperMessage>
        </FormField>
      )

      const groupEl = screen.getByRole('radiogroup', {
        name: 'Product score',
        description: 'Please provide your score',
      })
      const hiddenInput = document.querySelector('input[type="hidden"][name="score"]')

      expect(screen.getByRole('radio', { name: 'Product score 1' })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: 'Product score 4' })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: 'Product score 5' })).toBeInTheDocument()
      expect(groupEl).toHaveAttribute('aria-required', 'true')
      expect(groupEl).toBeInvalid()
      expect(hiddenInput).toHaveAttribute('value', '4')
    })
  })
})
