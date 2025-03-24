import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FormField } from '../form-field'
import { RadioGroup } from '.'

describe('RadioGroup', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should render correctly with accessible roles', () => {
    render(
      <RadioGroup defaultValue="1">
        <RadioGroup.Radio value="1">1</RadioGroup.Radio>
        <RadioGroup.Radio value="2">2</RadioGroup.Radio>
        <RadioGroup.Radio value="3">3</RadioGroup.Radio>
      </RadioGroup>
    )

    const element = screen.getByRole('radiogroup')

    expect(element).toHaveAttribute('data-spark-component', 'radio-group')

    expect(within(element).getByRole('radio', { name: '1' })).toBeChecked()
    expect(within(element).getByRole('radio', { name: '2' })).not.toBeChecked()
    expect(within(element).getByRole('radio', { name: '3' })).not.toBeChecked()
  })

  it('should render as required', () => {
    render(
      <RadioGroup required>
        <RadioGroup.Radio value="1">1</RadioGroup.Radio>
        <RadioGroup.Radio value="2">2</RadioGroup.Radio>
        <RadioGroup.Radio value="3">3</RadioGroup.Radio>
      </RadioGroup>
    )

    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-required', 'true')
  })

  it('should toggle checked state when a radio button is clicked in uncontrolled mode', async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup defaultValue="1">
        <RadioGroup.Radio value="1">1</RadioGroup.Radio>
        <RadioGroup.Radio value="2">2</RadioGroup.Radio>
        <RadioGroup.Radio value="3">3</RadioGroup.Radio>
      </RadioGroup>
    )

    const element = screen.getByRole('radiogroup')

    expect(element).toBeInTheDocument()
    expect(within(element).getByLabelText('1')).toBeChecked()

    await user.click(within(element).getByLabelText('2'))

    expect(within(element).getByLabelText('2')).toBeChecked()
  })

  it('should toggle checked state when a radio button is clicked in controlled mode', async () => {
    const user = userEvent.setup()
    const props = { value: '1', onValueChange: vi.fn() }

    render(
      <RadioGroup {...props}>
        <RadioGroup.Radio value="1">1</RadioGroup.Radio>
        <RadioGroup.Radio value="2">2</RadioGroup.Radio>
        <RadioGroup.Radio value="3">3</RadioGroup.Radio>
      </RadioGroup>
    )

    const element = screen.getByRole('radiogroup')

    expect(element).toBeInTheDocument()
    expect(within(element).getByLabelText('1')).toBeChecked()

    await user.click(within(element).getByLabelText('2'))

    expect(props.onValueChange).toHaveBeenCalledTimes(1)
    expect(props.onValueChange).toHaveBeenCalledWith('2')
  })

  it('should not toggle checked state when disabled', async () => {
    const user = userEvent.setup()
    const props = { value: '1', onValueChange: vi.fn() }

    render(
      <RadioGroup {...props} disabled>
        <RadioGroup.Radio value="1">1</RadioGroup.Radio>
        <RadioGroup.Radio value="2">2</RadioGroup.Radio>
        <RadioGroup.Radio value="3">3</RadioGroup.Radio>
      </RadioGroup>
    )

    expect(screen.getByLabelText('1')).toBeChecked()

    await user.click(screen.getByLabelText('2'))

    expect(props.onValueChange).not.toHaveBeenCalled()
  })

  it('should be possible to disable a specific Radio item within a group', async () => {
    const props = { value: '2', onValueChange: vi.fn() }

    render(
      <RadioGroup {...props}>
        <RadioGroup.Radio disabled value="1">
          1
        </RadioGroup.Radio>
        <RadioGroup.Radio value="2">2</RadioGroup.Radio>
        <RadioGroup.Radio value="3">3</RadioGroup.Radio>
      </RadioGroup>
    )

    expect(screen.getByLabelText('1')).toBeDisabled()
  })

  it('should handle the reverse prop', async () => {
    const { rerender } = render(
      <RadioGroup>
        <RadioGroup.Radio value="1">one</RadioGroup.Radio>
      </RadioGroup>
    )

    const label = screen.getByText('one')
    const radioInput = screen.getByRole('radio', {
      name: 'one',
    })

    // radio input should be before label in the DOM
    expect(
      radioInput.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    rerender(
      <RadioGroup reverse>
        <RadioGroup.Radio value="1">one</RadioGroup.Radio>
      </RadioGroup>
    )
    // label should be before radio input in the DOM
    expect(
      label.compareDocumentPosition(radioInput) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  describe('with FormField', () => {
    it('should render with custom label', () => {
      render(
        <FormField name="category">
          <FormField.Label>
            <p>Category</p>
          </FormField.Label>

          <RadioGroup defaultValue="electronics">
            <RadioGroup.Radio value="electronics">Electronics</RadioGroup.Radio>
            <RadioGroup.Radio value="furnitures">Furnitures</RadioGroup.Radio>
          </RadioGroup>
        </FormField>
      )

      expect(screen.getByRole('radiogroup', { name: 'Category' })).toBeInTheDocument()
    })

    it('should render aria-attributes following FormField implementation', () => {
      render(
        <FormField name="category" state="error" isRequired>
          <FormField.Label>
            <p>Category</p>
          </FormField.Label>

          <RadioGroup>
            <RadioGroup.Radio value="electronics">Electronics</RadioGroup.Radio>
            <RadioGroup.Radio value="furnitures">Furnitures</RadioGroup.Radio>
          </RadioGroup>

          <FormField.HelperMessage>The category is required</FormField.HelperMessage>
        </FormField>
      )

      const groupEl = screen.getByRole('radiogroup', { name: 'Category' })

      expect(groupEl).toHaveAttribute('aria-required', 'true')
      expect(groupEl).toBeInvalid()

      expect(
        screen.getByRole('radiogroup', {
          name: 'Category',
          description: 'The category is required',
        })
      ).toBeInTheDocument()
    })
  })
})
