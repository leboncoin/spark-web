import { Check } from '@spark-ui/icons/Check'
import { Euro } from '@spark-ui/icons/Euro'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FormField } from '../form-field'
import { Input, InputGroup } from '.'

describe('Input', () => {
  it('should render', () => {
    const placeholder = 'Smartphone'

    render(<Input placeholder={placeholder} />)

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it('should change value in uncontrolled mode', async () => {
    const onChange = vi.fn()
    const defaultValue = 'Smartphone'

    render(<Input defaultValue={defaultValue} onChange={onChange} />)

    const inputEl = screen.getByDisplayValue(defaultValue)

    const value = 'iPhone 12'

    await userEvent.clear(inputEl)
    await userEvent.type(inputEl, value)

    expect(inputEl).toHaveValue(value)
    expect(onChange).toHaveBeenCalled()
  })

  it('should change value in controlled mode', async () => {
    const onChange = vi.fn()
    const value = 'Smartphone'

    render(<Input value={value} onChange={onChange} />)

    const inputEl = screen.getByDisplayValue(value)

    const current = 'iPhone 12'

    await userEvent.clear(inputEl)
    await userEvent.type(inputEl, current)

    expect(onChange).toHaveBeenCalled()
  })

  it('should not change value when is disabled', async () => {
    const placeholder = 'Smartphone'

    render(<Input placeholder={placeholder} disabled />)

    const inputEl = screen.getByPlaceholderText(placeholder)

    await userEvent.type(inputEl, 'iPhone 12')

    expect(inputEl).not.toHaveValue()
    expect(inputEl).toBeDisabled()
  })

  it('should not change value when is read only', async () => {
    const placeholder = 'Smartphone'

    render(<Input placeholder={placeholder} readOnly />)

    const inputEl = screen.getByPlaceholderText(placeholder)

    await userEvent.type(inputEl, 'iPhone 12')

    expect(inputEl).not.toHaveValue()
    expect(inputEl).toHaveAttribute('readonly')
  })

  it('should render addons within group', () => {
    const leftText = 'https://'
    const rightText = '.com'
    const placeholder = 'Smartphone'

    render(
      <InputGroup>
        <InputGroup.LeadingAddon>{leftText}</InputGroup.LeadingAddon>
        <Input placeholder={placeholder} />
        <InputGroup.TrailingAddon>{rightText}</InputGroup.TrailingAddon>
      </InputGroup>
    )

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    expect(screen.getByText(leftText)).toBeInTheDocument()
    expect(screen.getByText(rightText)).toBeInTheDocument()
  })

  it('should be read only when group is read only', () => {
    const placeholder = 'Smartphone'

    render(
      <InputGroup readOnly>
        <Input placeholder={placeholder} />
      </InputGroup>
    )

    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('readOnly')
  })

  it('should be disabled when group is disabled', () => {
    const placeholder = 'Smartphone'

    render(
      <InputGroup disabled>
        <Input placeholder={placeholder} />
      </InputGroup>
    )

    expect(screen.getByPlaceholderText(placeholder)).toBeDisabled()
  })

  it('should render icons within group', () => {
    const leftLabel = 'Check'
    const rightLabel = 'Euro'
    const placeholder = 'Smartphone'

    render(
      <InputGroup>
        <InputGroup.LeadingIcon label={leftLabel}>
          <Check />
        </InputGroup.LeadingIcon>
        <Input placeholder={placeholder} />
        <InputGroup.TrailingIcon label={rightLabel}>
          <Euro />
        </InputGroup.TrailingIcon>
      </InputGroup>
    )

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    expect(screen.getByText(rightLabel)).toBeInTheDocument()
    expect(screen.getByText(rightLabel)).toBeInTheDocument()
  })

  it('should not focus clear button', async () => {
    const clearLabel = 'Clear'
    const defaultValue = 'Smartphone'

    render(
      <InputGroup>
        <Input defaultValue={defaultValue} />

        <InputGroup.ClearButton aria-label={clearLabel} />
      </InputGroup>
    )

    const inputEl = screen.getByDisplayValue(defaultValue)

    inputEl.focus()

    await userEvent.tab()

    expect(screen.getByRole('button', { name: clearLabel })).not.toHaveFocus()
  })

  it('should clear input when clear button is clicked in uncontrolled mode', async () => {
    const clearLabel = 'Clear'
    const defaultValue = 'Smartphone'

    render(
      <InputGroup>
        <Input defaultValue={defaultValue} />

        <InputGroup.ClearButton aria-label={clearLabel} />
      </InputGroup>
    )

    const inputEl = screen.getByDisplayValue(defaultValue)

    expect(inputEl).toHaveValue(defaultValue)

    await userEvent.click(screen.getByRole('button', { name: clearLabel }))

    expect(inputEl).not.toHaveValue()
  })

  it('should clear input when clear button is clicked in controlled mode', async () => {
    const clearLabel = 'Clear'
    const value = 'Smartphone'
    const onClear = vi.fn()

    render(
      <InputGroup onClear={onClear}>
        <Input value={value} />

        <InputGroup.ClearButton aria-label={clearLabel} />
      </InputGroup>
    )

    const inputEl = screen.getByDisplayValue(value)

    expect(inputEl).toHaveValue(value)

    await userEvent.click(screen.getByRole('button', { name: clearLabel }))

    expect(onClear).toHaveBeenCalled()
  })

  it('should clear input when esc is pressed and clear button is defined', async () => {
    const defaultValue = 'Smartphone'

    render(
      <InputGroup>
        <Input defaultValue={defaultValue} />

        <InputGroup.ClearButton aria-label="Clear" />
      </InputGroup>
    )

    const inputEl = screen.getByDisplayValue(defaultValue)

    expect(inputEl).toHaveValue(defaultValue)

    inputEl.focus()

    await userEvent.keyboard('{Esc}')

    expect(inputEl).not.toHaveValue()
  })

  it('should not clear input when esc is pressed and clear button is not defined', async () => {
    const defaultValue = 'Smartphone'

    render(
      <InputGroup>
        <Input defaultValue={defaultValue} />
      </InputGroup>
    )

    const inputEl = screen.getByDisplayValue(defaultValue)

    expect(inputEl).toHaveValue(defaultValue)

    inputEl.focus()

    await userEvent.keyboard('{Esc}')

    expect(inputEl).toHaveValue()
  })

  it('should render label within field', () => {
    const name = 'title'
    const label = 'Title'

    render(
      <FormField name={name}>
        <FormField.Label>{label}</FormField.Label>

        <Input />
      </FormField>
    )

    const inputEl = screen.getByLabelText(label)

    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('name', name)
  })

  it('should render with required property within field', () => {
    render(
      <FormField name="title" isRequired>
        <FormField.Label>Title</FormField.Label>

        <Input />
      </FormField>
    )

    expect(screen.getByLabelText(/Title/)).toBeRequired()
  })

  it('should render with helper message within field', () => {
    const name = 'title'
    const label = 'Title'
    const helperText = 'An effective title significantly increases your chances of making a sale'

    render(
      <FormField name={name}>
        <FormField.Label>{label}</FormField.Label>

        <Input />

        <FormField.HelperMessage>{helperText}</FormField.HelperMessage>
      </FormField>
    )

    expect(screen.getByLabelText(label)).toHaveAccessibleDescription(helperText)
  })

  it('should render with validation error within field', () => {
    const name = 'title'
    const label = 'Title'
    const errorText = 'The title is invalid'

    render(
      <FormField name={name} state="error">
        <FormField.Label>{label}</FormField.Label>

        <Input />

        <FormField.ErrorMessage>{errorText}</FormField.ErrorMessage>
      </FormField>
    )

    const inputEl = screen.getByLabelText(label)

    expect(inputEl).toBeInvalid()
    expect(inputEl).toHaveAccessibleDescription(errorText)
  })

  it('should be read only when field is read only', () => {
    const label = 'Title'

    render(
      <FormField readOnly>
        <FormField.Label>{label}</FormField.Label>

        <Input />
      </FormField>
    )

    expect(screen.getByLabelText(label)).toHaveAttribute('readOnly')
  })

  it('should be disabled when field is disabled', () => {
    const label = 'Title'

    render(
      <FormField disabled>
        <FormField.Label>{label}</FormField.Label>

        <Input />
      </FormField>
    )

    expect(screen.getByLabelText(label)).toBeDisabled()
  })
})
