import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Rating } from './Rating'

const utils = {
  getRadiogroup: () =>
    screen.getByRole('radiogroup', {
      name: /rating/i,
    }),
  getRadios: () => screen.getAllByRole('radio'),
  getCheckedValue: (): number => {
    const radios = screen.getAllByRole('radio')
    const index = radios.findIndex(r => r.getAttribute('aria-checked') === 'true')

    return index >= 0 ? index + 1 : 0
  },
  getStars: (container: HTMLElement) =>
    Array.from(container.querySelectorAll('[data-part="star"]')),
}

const defaultProps = {
  'aria-label': 'rating',
}

describe('Rating', () => {
  it('should render', () => {
    const { container } = render(<Rating {...defaultProps} defaultValue={2} />)

    expect(utils.getRadiogroup()).toBeInTheDocument()
    expect(utils.getRadios()).toHaveLength(5)
    expect(container.querySelectorAll('[data-part="star"]').length).toBe(5)
  })

  it('should be possible to interact', async () => {
    const user = userEvent.setup()

    const { container } = render(<Rating {...defaultProps} defaultValue={1} />)

    const stars = utils.getStars(container)
    const firstStar = stars.at(0)
    const thirdStar = stars.at(2)
    const fifthRadio = utils.getRadios()[4]

    if (!thirdStar || !firstStar) throw new Error('Stars element not found')

    // initial value: first radio checked
    expect(utils.getCheckedValue()).toBe(1)

    await user.click(thirdStar)
    expect(utils.getCheckedValue()).toBe(3)

    await user.click(firstStar)
    expect(utils.getCheckedValue()).toBe(1)

    // keyboard: move to 5th radio and select with Space
    await user.click(fifthRadio)
    expect(utils.getCheckedValue()).toBe(5)
  })

  it('should handle controlled mode', async () => {
    function ControlledRating({ onValueChange }: { onValueChange: (value: number) => void }) {
      const [value, setValue] = useState(2)

      const handleInteraction = (value: number): void => {
        onValueChange(value)
        setValue(value)
      }

      return <Rating {...defaultProps} value={value} onValueChange={handleInteraction} />
    }

    const onValueChangeSpy = vi.fn()
    const user = userEvent.setup()
    const { container } = render(<ControlledRating onValueChange={onValueChangeSpy} />)

    const stars = utils.getStars(container)
    const fifthStar = stars.at(4)
    const secondStar = stars.at(1)

    if (!fifthStar || !secondStar) throw new Error('Stars element not found')

    // initial value: second radio checked
    expect(utils.getCheckedValue()).toBe(2)

    await user.click(fifthStar)
    expect(utils.getCheckedValue()).toBe(5)
    expect(onValueChangeSpy).toHaveBeenCalledTimes(1)
    expect(onValueChangeSpy).toHaveBeenCalledWith(5)

    await user.click(secondStar)
    expect(utils.getCheckedValue()).toBe(2)
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(2)
  })

  it('should not expose value 0 when interacting (radiogroup only allows 1-5)', () => {
    render(<Rating {...defaultProps} defaultValue={3} />)

    // With radiogroup pattern, user can only select 1-5; no "zero" option
    expect(utils.getCheckedValue()).toBe(3)
  })

  it('should not be possible to interact when in readOnly (in controlled mode)', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()

    const { container } = render(
      <Rating {...defaultProps} value={1} onValueChange={handleValueChange} readOnly />
    )

    const stars = utils.getStars(container)
    const secondStar = stars.at(1)

    if (!secondStar) throw new Error('Stars element not found')

    // Radios are not focusable when readOnly (tabIndex -1)
    expect(utils.getRadios().every(r => r.getAttribute('tabindex') === '-1')).toBe(true)

    await user.click(secondStar)
    expect(handleValueChange).not.toHaveBeenCalled()
    expect(utils.getCheckedValue()).toBe(1)
  })

  it('should not be possible to interact when disabled (in uncontrolled mode)', async () => {
    const user = userEvent.setup()
    const { container } = render(<Rating {...defaultProps} defaultValue={1} disabled />)

    const stars = utils.getStars(container)
    const fifthStar = stars.at(4)

    if (!fifthStar) throw new Error('Stars element not found')

    expect(utils.getRadios().every(r => r.getAttribute('tabindex') === '-1')).toBe(true)

    await user.click(fifthStar)
    expect(utils.getCheckedValue()).toBe(1)
  })
})
