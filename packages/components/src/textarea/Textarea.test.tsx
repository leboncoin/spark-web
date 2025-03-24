import { Check } from '@spark-ui/icons/Check'
import { Euro } from '@spark-ui/icons/Euro'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FormField } from '../form-field'
import { Textarea, TextareaGroup } from '.'

describe('Textarea', () => {
  it('should render', () => {
    const placeholder = 'Smartphone'

    render(<Textarea placeholder={placeholder} />)

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it('should change value in uncontrolled mode', async () => {
    const onChange = vi.fn()
    const defaultValue = 'Smartphone'
    const user = userEvent.setup()

    render(<Textarea defaultValue={defaultValue} onChange={onChange} />)

    const textareaEl = screen.getByDisplayValue(defaultValue)

    const value = 'Iphone 12'

    await user.clear(textareaEl)
    await user.type(textareaEl, value)

    expect(textareaEl).toHaveValue(value)
    expect(onChange).toHaveBeenCalled()
  })

  it('should change value in controlled mode', async () => {
    const onChange = vi.fn()
    const value = 'Smartphone'
    const user = userEvent.setup()

    render(<Textarea value={value} onChange={onChange} />)

    const textareaEl = screen.getByDisplayValue(value)

    const current = 'Iphone 12'

    await user.clear(textareaEl)
    await user.type(textareaEl, current)

    expect(onChange).toHaveBeenCalled()
  })

  it('should not change value when is disabled', async () => {
    const placeholder = 'Smartphone'
    const user = userEvent.setup()

    render(<Textarea placeholder={placeholder} disabled />)

    const textareaEl = screen.getByPlaceholderText(placeholder)

    await user.type(textareaEl, 'Iphone 12')

    expect(textareaEl).not.toHaveValue()
    expect(textareaEl).toBeDisabled()
  })

  it('should render elements within group', () => {
    const leftLabel = 'Check'
    const rightLabel = 'Euro'
    const placeholder = 'Smartphone'

    render(
      <TextareaGroup>
        <TextareaGroup.LeadingIcon label={leftLabel}>
          <Check />
        </TextareaGroup.LeadingIcon>

        <Textarea placeholder={placeholder} />

        <TextareaGroup.TrailingIcon label={rightLabel}>
          <Euro />
        </TextareaGroup.TrailingIcon>
      </TextareaGroup>
    )

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    expect(screen.getByText(leftLabel)).toBeInTheDocument()
    expect(screen.getByText(rightLabel)).toBeInTheDocument()
  })

  it.skip('should render label within field', () => {
    const name = 'title'
    const label = 'Title'

    render(
      <FormField name={name}>
        <FormField.Label>{label}</FormField.Label>

        <Textarea />
      </FormField>
    )

    const textareaEl = screen.getByLabelText(label)

    expect(textareaEl).toBeInTheDocument()
    expect(textareaEl).toHaveAttribute('name', name)
  })

  it.skip('should render with required property within field', () => {
    render(
      <FormField name="title" isRequired>
        <FormField.Label>Title</FormField.Label>

        <Textarea />
      </FormField>
    )

    expect(screen.getByLabelText(/Title/)).toBeRequired()
  })

  it.skip('should render with helper message within field', () => {
    const name = 'title'
    const label = 'Title'
    const helperText = 'An effective title significantly increases your chances of making a sale'

    render(
      <FormField name={name}>
        <FormField.Label>{label}</FormField.Label>

        <Textarea />

        <FormField.HelperMessage>{helperText}</FormField.HelperMessage>
      </FormField>
    )

    expect(screen.getByLabelText(label)).toHaveAccessibleDescription(helperText)
  })

  it.skip('should render with validation error within field', () => {
    const name = 'title'
    const label = 'Title'
    const errorText = 'The title is invalid'

    render(
      <FormField name={name} state="error">
        <FormField.Label>{label}</FormField.Label>

        <Textarea />

        <FormField.ErrorMessage>{errorText}</FormField.ErrorMessage>
      </FormField>
    )

    const textareaEl = screen.getByLabelText(label)

    expect(textareaEl).toBeInvalid()
    expect(textareaEl).toHaveAccessibleDescription(errorText)
  })
})
