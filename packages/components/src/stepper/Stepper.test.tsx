import { ArrowHorizontalUp } from '@spark-ui/icons/ArrowHorizontalUp'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FormField } from '../form-field'
import { Icon } from '../icon'
import { Stepper } from '.'

const defaultProps = {
  defaultValue: 0,
  'aria-label': 'Stepper',
  incrementAriaLabel: 'Increment',
  decrementAriaLabel: 'Decrement',
  onValueChange: vi.fn(),
}

describe('Stepper', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should handle callback on changing value', async () => {
    const user = userEvent.setup()

    render(
      <Stepper {...defaultProps}>
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    )

    const input = screen.getByRole('textbox')

    // Changing value through stepper buttons...
    await user.click(screen.getByLabelText('Increment'))
    expect(screen.getByRole('textbox')).toHaveValue('1')

    await user.click(screen.getByLabelText('Decrement'))
    expect(screen.getByRole('textbox')).toHaveValue('0')

    expect(defaultProps.onValueChange).toHaveBeenCalledTimes(2)

    // ... or via direct input
    await user.type(input, '1')
    act(() => input.blur())

    expect(input).toHaveValue('1')
  })

  it('should prevent typing non-numeric values', async () => {
    const user = userEvent.setup()

    render(
      <Stepper {...defaultProps}>
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    )

    const input = screen.getByRole('textbox')

    // Changing value through stepper buttons...
    await user.click(screen.getByLabelText('Increment'))
    expect(screen.getByRole('textbox')).toHaveValue('1')

    await user.type(input, 'abc')
    act(() => input.blur())

    expect(input).toHaveValue('1')
  })

  it('should change value on scrolling up or down', () => {
    render(
      <Stepper {...defaultProps}>
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    )

    const input = screen.getByRole('textbox')

    act(() => input.focus())

    fireEvent.wheel(input, { deltaY: 10 })
    expect(input).toHaveValue('1')

    fireEvent.wheel(input, { deltaY: -10 })
    expect(input).toHaveValue('0')

    expect(defaultProps.onValueChange).toHaveBeenCalledTimes(2)
  })

  it('should set value to 0 if value is undefined and user clicks increment', async () => {
    const user = userEvent.setup()

    render(
      <Stepper {...defaultProps} defaultValue={undefined}>
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    )

    const input = screen.getByRole('textbox')
    await user.click(screen.getByLabelText('Increment'))

    expect(input).toHaveValue('0')
  })

  it('should increment or decrement value using the keyboard arrow up/down keys', async () => {
    const user = userEvent.setup()

    render(
      <Stepper {...defaultProps}>
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    )

    const input = screen.getByRole('textbox')
    await user.click(input)

    await user.keyboard('[ArrowUp]')
    expect(input).toHaveValue('1')

    await user.keyboard('[ArrowDown]')
    expect(input).toHaveValue('0')
  })

  describe('disabled', () => {
    it('should not change value nor accept interaction', async () => {
      const user = userEvent.setup()

      render(
        <Stepper {...defaultProps} disabled>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      await user.click(screen.getByLabelText('Increment'))
      await user.click(screen.getByLabelText('Decrement'))
      await user.type(screen.getByRole('textbox'), '11')
      expect(screen.getByRole('textbox')).not.toHaveFocus()

      expect(defaultProps.onValueChange).not.toHaveBeenCalled()

      expect(screen.getByLabelText('Increment')).toBeDisabled()
      expect(screen.getByLabelText('Decrement')).toBeDisabled()
    })

    it('should not change value on scrolling up or down', () => {
      render(
        <Stepper {...defaultProps} disabled>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      const input = screen.getByRole('textbox')

      act(() => input.focus())

      fireEvent.wheel(input, { deltaY: 10 })
      fireEvent.wheel(input, { deltaY: -10 })

      expect(defaultProps.onValueChange).not.toHaveBeenCalled()
    })
  })

  describe('readOnly', () => {
    it('should not change value nor accept interaction when readonly', async () => {
      const user = userEvent.setup()

      render(
        <Stepper {...defaultProps} readOnly>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      const input = screen.getByRole('textbox')

      await user.click(screen.getByLabelText('Increment'))
      await user.click(screen.getByLabelText('Decrement'))

      await user.type(input, '11')
      act(() => input.blur())

      expect(defaultProps.onValueChange).not.toHaveBeenCalled()
      expect(input).toHaveValue('0')
    })

    it('should not change value on scrolling up or down', () => {
      render(
        <Stepper {...defaultProps} readOnly>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      const input = screen.getByRole('textbox')

      act(() => input.focus())

      fireEvent.wheel(input, { deltaY: 10 })
      fireEvent.wheel(input, { deltaY: -10 })

      expect(defaultProps.onValueChange).not.toHaveBeenCalled()
    })

    it('should not increment or decrement value using the keyboard arrow up/down keys', async () => {
      const user = userEvent.setup()

      render(
        <Stepper {...defaultProps} readOnly>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      const input = screen.getByRole('textbox')
      await user.click(input)

      await user.keyboard('[ArrowUp]')
      expect(input).toHaveValue('0')

      await user.keyboard('[ArrowDown]')
      expect(input).toHaveValue('0')
    })
  })

  it('should allow custom implementation', async () => {
    const user = userEvent.setup()

    render(
      <Stepper {...defaultProps} defaultValue={8}>
        <Stepper.IncrementButton aria-label="Custom increment" asChild>
          <Icon>
            <ArrowHorizontalUp />
          </Icon>
        </Stepper.IncrementButton>
        <Stepper.Input />
      </Stepper>
    )

    await user.click(screen.getByLabelText('Custom increment'))

    expect(screen.getByRole('textbox')).toHaveValue('9')
    expect(defaultProps.onValueChange).toHaveBeenCalledTimes(1)
  })

  describe('min and max values', () => {
    it('should not change the value if max limit has been reached', async () => {
      const user = userEvent.setup()

      render(
        <Stepper {...defaultProps} maxValue={5} step={5}>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      await user.click(screen.getByLabelText('Increment'))
      expect(screen.getByRole('textbox')).toHaveValue('5')
      expect(screen.getByLabelText('Increment')).toBeDisabled()

      await user.click(screen.getByLabelText('Increment'))
      expect(defaultProps.onValueChange).toHaveBeenCalledTimes(1)
    })

    it('should not change the value if min limit has been reached', async () => {
      const user = userEvent.setup()

      render(
        <Stepper {...defaultProps} minValue={-10} step={5}>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      await user.click(screen.getByLabelText('Decrement'))
      await user.click(screen.getByLabelText('Decrement'))

      expect(screen.getByRole('textbox')).toHaveValue('-10')
      expect(screen.getByLabelText('Decrement')).toBeDisabled()

      await user.click(screen.getByLabelText('Decrement'))
      expect(defaultProps.onValueChange).toHaveBeenCalledTimes(2)
    })

    it('should clamp the value on blur if input is beyond range bounds', async () => {
      const user = userEvent.setup()

      render(
        <Stepper {...defaultProps} minValue={0} maxValue={10}>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      const input = screen.getByRole('textbox')

      await user.type(input, '13')
      act(() => input.blur())

      expect(input).toHaveValue('10')
    })

    it('should set value to max if value is undefined and user clicks decrement', async () => {
      const user = userEvent.setup()

      render(
        <Stepper {...defaultProps} defaultValue={undefined} minValue={0} maxValue={10}>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      const input = screen.getByRole('textbox')
      await user.click(screen.getByLabelText('Decrement'))

      expect(input).toHaveValue('10')
    })

    it('should set value to min if value is undefined and user clicks increment', async () => {
      const user = userEvent.setup()

      render(
        <Stepper {...defaultProps} defaultValue={undefined} minValue={4} maxValue={10}>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      const input = screen.getByRole('textbox')
      await user.click(screen.getByLabelText('Increment'))

      expect(input).toHaveValue('4')
    })

    it('should only trigger the onValueChange prop when input value is updated and blurred, or when incrementing/decrementing', async () => {
      // see: https://react-spectrum.adobe.com/react-aria/useNumberField.html#controlled
      const user = userEvent.setup()
      const onValueChangeSpy = vi.fn()

      render(
        <Stepper
          {...defaultProps}
          onValueChange={onValueChangeSpy}
          defaultValue={undefined}
          minValue={4}
          maxValue={10}
        >
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      )

      const input = screen.getByRole('textbox')
      const incrementBtn = screen.getByRole('button', {
        name: /Increment/i,
      })

      await user.type(input, '8')

      expect(onValueChangeSpy).not.toHaveBeenCalled()
      act(() => input.blur())

      expect(onValueChangeSpy).toHaveBeenCalledTimes(1)
      expect(onValueChangeSpy).toHaveBeenCalledWith(8)
      expect(input).toHaveValue('8')

      await user.click(incrementBtn)
      expect(onValueChangeSpy).toHaveBeenLastCalledWith(9)
    })
  })
})

describe('Stepper with FormField', () => {
  it('should properly inherit some attributes when Stepper is wrapped by FormField', async () => {
    const user = userEvent.setup()

    render(
      <FormField name="title" isRequired state="error">
        <FormField.Label>Title</FormField.Label>
        <Stepper {...defaultProps}>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
        <FormField.ErrorMessage>oops</FormField.ErrorMessage>
        <FormField.HelperMessage>This is a helper message</FormField.HelperMessage>
      </FormField>
    )

    const label = screen.getByText(/title/i)
    const input = screen.getByRole('textbox', {
      name: 'Stepper',
    })
    const decrementBtn = screen.getByRole('button', {
      name: /Decrement/i,
    })
    const incrementBtn = screen.getByRole('button', {
      name: /Increment/i,
    })

    await user.click(label)

    expect(input).toHaveFocus()
    expect(input).toHaveAttribute('required')
    expect(input).toHaveAttribute('aria-invalid', 'true')

    expect(decrementBtn).toHaveAttribute('aria-controls', input.id)
    expect(incrementBtn).toHaveAttribute('aria-controls', input.id)
  })
})
