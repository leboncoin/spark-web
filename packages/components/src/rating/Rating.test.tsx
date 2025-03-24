import { fireEvent } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Rating } from './Rating'

const utils = {
  getInput: () =>
    screen.getByRole('slider', {
      name: /rating/i,
    }),
  getStars: (container: HTMLElement) =>
    Array.from(container.querySelectorAll('[data-part="star"]')),
}

const defaultProps = {
  'aria-label': 'rating',
}

describe('Rating', () => {
  it('should render', () => {
    const { container } = render(<Rating {...defaultProps} defaultValue={2} />)

    expect(container.querySelector('[data-spark-component=rating]')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-part="star"]').length).toBe(5)
  })

  it('should be possible to interact', async () => {
    const user = userEvent.setup()

    const { container } = render(<Rating {...defaultProps} size="lg" defaultValue={1} />)

    const stars = utils.getStars(container)
    const input = utils.getInput()
    const firstStar = stars.at(0)
    const thirdStar = stars.at(2)

    if (!thirdStar || !firstStar) throw new Error('Stars element not found')

    // initial value
    expect(input).toHaveValue('1')

    await user.click(thirdStar)
    expect(input).toHaveValue('3')

    await user.click(firstStar)
    expect(input).toHaveValue('1')

    // triggering a change event by directly interacting
    // with the HTML input (using the keyboard for instance)
    fireEvent.change(input, { target: { value: '5' } })
    expect(input).toHaveValue('5')
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
    const input = utils.getInput()
    const fifthStar = stars.at(4)

    if (!fifthStar) throw new Error('Stars element not found')

    // initial value
    expect(input).toHaveValue('2')

    await user.click(fifthStar)
    expect(input).toHaveValue('5')
    expect(onValueChangeSpy).toHaveBeenCalledTimes(1)
    expect(onValueChangeSpy).toHaveBeenCalledWith(5)

    // triggering a change event by directly interacting
    // with the HTML input (using the keyboard for instance)
    fireEvent.change(input, { target: { value: '2' } })
    expect(input).toHaveValue('2')
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(2)
  })

  it('should not be possible to reset value back to zero', () => {
    render(<Rating {...defaultProps} defaultValue={3} />)
    const input = utils.getInput()

    fireEvent.change(input, { target: { value: '1' } })
    expect(input).toHaveValue('1')

    fireEvent.change(input, { target: { value: '0' } })

    expect(input).toHaveValue('1')
  })

  it('should not be possible to interact when in readOnly (in controlled mode)', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()

    const { container } = render(
      <Rating {...defaultProps} value={1} onValueChange={handleValueChange} readOnly />
    )

    const input = utils.getInput()
    const stars = utils.getStars(container)
    const secondStar = stars.at(1)

    if (!secondStar) throw new Error('Stars element not found')

    expect(input).toHaveAttribute('readOnly')

    // ensuring that the rating value cannot be altered
    await user.click(secondStar)
    fireEvent.change(input, { target: { value: '5' } })
    expect(handleValueChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('1')
  })

  it('should not be possible to interact when disabled (in uncontrolled mode)', async () => {
    const user = userEvent.setup()
    const { container } = render(<Rating {...defaultProps} defaultValue={1} disabled />)

    const stars = utils.getStars(container)
    const input = utils.getInput()
    const fifthStar = stars.at(4)

    if (!fifthStar) throw new Error('Stars element not found')

    expect(input).toBeDisabled()

    // ensuring that the rating value cannot be altered
    await user.click(fifthStar)
    fireEvent.change(input, { target: { value: '5' } })
    expect(input).toHaveValue('1')
  })
})
