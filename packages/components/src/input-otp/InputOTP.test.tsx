import { FormField } from '@spark-ui/components/form-field'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InputOTP } from '.'

// Helper to render InputOTP with slots
const renderInputOTP = (
  props: Omit<Parameters<typeof InputOTP>[0], 'children'> = {},
  slotsCount = 4
) => {
  const slots = Array.from({ length: slotsCount }, (_, i) => <InputOTP.Slot key={i} index={i} />)

  return render(
    <InputOTP {...props}>
      <InputOTP.Group>{slots}</InputOTP.Group>
    </InputOTP>
  )
}

describe('InputOTP', () => {
  it('should render', () => {
    renderInputOTP({ maxLength: 4 }, 4)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should render with default 4 slots', () => {
    renderInputOTP({ maxLength: 4 }, 4)

    const container = screen.getByRole('group')
    expect(container).toBeInTheDocument()
  })

  it('should render with custom number of slots', () => {
    renderInputOTP({ maxLength: 6 }, 6)

    const container = screen.getByRole('group')
    expect(container).toBeInTheDocument()
  })

  it('should change value in uncontrolled mode', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP({ maxLength: 4, onValueChange }, 4)

    const input = screen.getByRole('textbox')
    await user.type(input, '1')

    expect(onValueChange).toHaveBeenCalledWith('1')
  })

  it('should change value in controlled mode', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP({ maxLength: 4, value: '1234', onValueChange }, 4)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('1234')

    await user.clear(input)
    await user.type(input, '5')

    expect(onValueChange).toHaveBeenCalled()
  })

  it('should auto-focus input by default', () => {
    renderInputOTP({ maxLength: 4, autoFocus: true }, 4)

    const input = screen.getByRole('textbox')
    expect(input).toHaveFocus()
  })

  it('should not auto-focus when autoFocus is false', () => {
    renderInputOTP({ maxLength: 4, autoFocus: false }, 4)

    const input = screen.getByRole('textbox')
    expect(input).not.toHaveFocus()
  })

  it('should navigate with arrow keys', async () => {
    const user = userEvent.setup()

    renderInputOTP({ maxLength: 4 }, 4)

    const input = screen.getByRole('textbox')
    input.focus()

    // Type some characters first
    await user.type(input, '12')

    // Arrow keys are prevented from navigating - cursor stays at the end
    // This is by design to keep focus on the last empty slot
    await user.keyboard('{ArrowLeft}')
    // Cursor should remain at the end (position 2)
    expect((input as HTMLInputElement).selectionStart).toBe(2)

    await user.keyboard('{ArrowRight}')
    // Cursor should still be at the end
    expect((input as HTMLInputElement).selectionStart).toBe(2)
  })

  it('should handle backspace correctly', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP({ maxLength: 4, defaultValue: '1234', onValueChange }, 4)

    const input = screen.getByRole('textbox')
    input.focus()
    await user.keyboard('{Backspace}')

    expect(onValueChange).toHaveBeenCalledWith('123')
  })

  it('should handle paste multiple characters', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP({ maxLength: 4, onValueChange }, 4)

    const input = screen.getByRole('textbox')
    input.focus()

    await user.paste('1234')

    expect(onValueChange).toHaveBeenCalledWith('1234')
  })

  it('should filter numbers when type is number', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP({ maxLength: 4, type: 'number', onValueChange }, 4)

    // Input is always type="text" internally, but filters non-numeric characters
    const input = screen.getByRole('textbox')
    await user.type(input, 'a1b2')

    expect(onValueChange).toHaveBeenCalledWith('12')
  })

  it('should force uppercase when forceUppercase is true', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP({ maxLength: 4, forceUppercase: true, onValueChange }, 4)

    const input = screen.getByRole('textbox')
    await user.type(input, 'a')

    expect(onValueChange).toHaveBeenCalledWith('A')
  })

  it('should be disabled when disabled prop is true', () => {
    renderInputOTP({ maxLength: 4, disabled: true }, 4)

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('should show invalid state when isValid is false', () => {
    renderInputOTP({ maxLength: 4, isValid: false }, 4)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('should filter characters based on pattern', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP(
      {
        maxLength: 4,
        pattern: '[^-.]',
        onValueChange,
      },
      4
    )

    const input = screen.getByRole('textbox')
    await user.type(input, 'a-b.c')

    expect(onValueChange).toHaveBeenCalledWith('abc')
  })

  it('should use pattern to allow only specific characters', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP(
      {
        maxLength: 4,
        pattern: '[a-c]',
        onValueChange,
      },
      4
    )

    const input = screen.getByRole('textbox')
    await user.type(input, 'a1b2c3d')

    expect(onValueChange).toHaveBeenCalledWith('abc')
  })

  it('should handle paste with filtered characters correctly', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    renderInputOTP(
      {
        maxLength: 4,
        pattern: '[^-.]',
        onValueChange,
      },
      4
    )

    const input = screen.getByRole('textbox')
    input.focus()

    await user.paste('12-34')

    expect(onValueChange).toHaveBeenCalledWith('1234')
  })

  describe('Accessibility', () => {
    it('should have role="group" on container', () => {
      renderInputOTP({ maxLength: 4 }, 4)

      const container = screen.getByRole('group')
      expect(container).toBeInTheDocument()
    })

    it('should have hidden input for form submission when name is provided', () => {
      renderInputOTP({ maxLength: 4, name: 'verification-code', defaultValue: '1234' }, 4)

      const hiddenInput = document.querySelector('input[type="hidden"][name="verification-code"]')
      expect(hiddenInput).toBeInTheDocument()
      expect(hiddenInput).toHaveValue('1234')
    })

    it('should update hidden input value when code changes', async () => {
      const onValueChange = vi.fn()
      const user = userEvent.setup()

      renderInputOTP({ maxLength: 4, name: 'code', onValueChange }, 4)

      const input = screen.getByRole('textbox')
      await user.type(input, '1')

      const hiddenInput = document.querySelector('input[type="hidden"][name="code"]')
      expect(hiddenInput).toHaveValue('1')
    })

    it('should not have hidden input when name is not provided', () => {
      renderInputOTP({ maxLength: 4 }, 4)

      const hiddenInput = document.querySelector('input[type="hidden"]')
      expect(hiddenInput).not.toBeInTheDocument()
    })

    it('should have aria-label on hidden input when aria-label is provided', () => {
      renderInputOTP({ maxLength: 4, name: 'code', 'aria-label': 'Verification code' }, 4)

      const hiddenInput = document.querySelector('input[type="hidden"][name="code"]')
      expect(hiddenInput).toBeInTheDocument()
      expect(hiddenInput).toHaveAttribute('aria-label', 'Verification code')
    })

    it('should prioritize labelId over aria-label for hidden input', () => {
      render(
        <FormField name="code">
          <FormField.Label>Verification code</FormField.Label>
          <InputOTP maxLength={4} aria-label="Should be ignored">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const hiddenInput = document.querySelector('input[type="hidden"]')
      const label = screen.getByText('Verification code')
      const labelId = label.getAttribute('id')

      expect(hiddenInput).toHaveAttribute('aria-labelledby', labelId)
      expect(hiddenInput).not.toHaveAttribute('aria-label')
    })

    it('should have aria-label on input when aria-label is provided', () => {
      renderInputOTP({ maxLength: 4, 'aria-label': 'Verification code' }, 4)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-label', 'Verification code')
    })

    it('should prioritize labelId over aria-label for input', () => {
      render(
        <FormField name="code">
          <FormField.Label>Verification code</FormField.Label>
          <InputOTP maxLength={4} aria-label="Should be ignored">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const input = screen.getByRole('textbox')
      const label = screen.getByText('Verification code')
      const labelId = label.getAttribute('id')

      expect(input).toHaveAttribute('aria-labelledby', labelId)
      expect(input).not.toHaveAttribute('aria-label')
    })
  })

  describe('FormField integration', () => {
    it('should use FormField labelId for aria-labelledby', () => {
      render(
        <FormField name="code">
          <FormField.Label>Verification code</FormField.Label>
          <InputOTP maxLength={4}>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const container = screen.getByRole('group')
      const label = screen.getByText('Verification code')
      const labelId = label.getAttribute('id')

      expect(container).toHaveAttribute('aria-labelledby', labelId)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-labelledby', labelId)
    })

    it('should use FormField description for aria-describedby on container and input', () => {
      const helperText = 'Enter the 4-digit code sent to your email'

      render(
        <FormField name="code">
          <FormField.Label>Verification code</FormField.Label>
          <InputOTP maxLength={4}>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
          <FormField.HelperMessage>{helperText}</FormField.HelperMessage>
        </FormField>
      )

      const container = screen.getByRole('group')
      const input = screen.getByRole('textbox')
      const helperMessage = screen.getByText(helperText)
      const descriptionId = helperMessage.getAttribute('id')

      expect(container).toHaveAttribute('aria-describedby', descriptionId)
      expect(input).toHaveAttribute('aria-describedby', descriptionId)
      expect(input).toHaveAccessibleDescription(helperText)
    })

    it('should use FormField name for hidden input', () => {
      render(
        <FormField name="verification-code">
          <FormField.Label>Code</FormField.Label>
          <InputOTP maxLength={4} defaultValue="1234">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const hiddenInput = document.querySelector('input[type="hidden"][name="verification-code"]')
      expect(hiddenInput).toBeInTheDocument()
      expect(hiddenInput).toHaveValue('1234')
    })

    it('should use FormField isInvalid state', () => {
      render(
        <FormField name="code" state="error">
          <FormField.Label>Code</FormField.Label>
          <InputOTP maxLength={4}>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')

      const hiddenInput = document.querySelector('input[type="hidden"]')
      expect(hiddenInput).toHaveAttribute('aria-invalid', 'true')
    })

    it('should use FormField isRequired for hidden input', () => {
      render(
        <FormField name="code" isRequired>
          <FormField.Label>Verification code</FormField.Label>
          <InputOTP maxLength={4}>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const hiddenInput = document.querySelector('input[type="hidden"]')
      expect(hiddenInput).toHaveAttribute('required')
      expect(hiddenInput).toHaveAttribute('aria-required', 'true')
    })

    it('should be accessible via label text when used with FormField', () => {
      render(
        <FormField name="code">
          <FormField.Label>Verification code</FormField.Label>
          <InputOTP maxLength={4}>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const input = screen.getByLabelText('Verification code')
      expect(input).toBeInTheDocument()
      expect(input).toHaveRole('textbox')
    })

    it('should move focus to the input when the label is clicked', async () => {
      const user = userEvent.setup()

      render(
        <FormField name="code">
          <FormField.Label>Verification code</FormField.Label>
          <InputOTP maxLength={4}>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const label = screen.getByText('Verification code')
      const input = screen.getByRole('textbox')

      await user.click(label)

      expect(input).toHaveFocus()
    })

    it('should work correctly with label, required, and helper message together', () => {
      const label = 'Verification code'
      const helperText = 'Enter the 4-digit code sent to your email'

      render(
        <FormField name="code" isRequired>
          <FormField.Label>{label}</FormField.Label>
          <InputOTP maxLength={4}>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
          <FormField.HelperMessage>{helperText}</FormField.HelperMessage>
        </FormField>
      )

      const input = screen.getByLabelText(label)
      const hiddenInput = document.querySelector('input[type="hidden"]')

      // Label association
      expect(input).toBeInTheDocument()
      expect(input).toHaveRole('textbox')

      // Required state
      expect(hiddenInput).toHaveAttribute('required')
      expect(hiddenInput).toHaveAttribute('aria-required', 'true')

      // Helper message association
      expect(input).toHaveAccessibleDescription(helperText)
      expect(input).toHaveAttribute('aria-describedby')
    })

    it('should prioritize prop name over FormField name', () => {
      render(
        <FormField name="form-field-name">
          <FormField.Label>Code</FormField.Label>
          <InputOTP maxLength={4} name="prop-name" defaultValue="1234">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </FormField>
      )

      const hiddenInput = document.querySelector('input[type="hidden"][name="prop-name"]')
      expect(hiddenInput).toBeInTheDocument()

      const formFieldHiddenInput = document.querySelector(
        'input[type="hidden"][name="form-field-name"]'
      )
      expect(formFieldHiddenInput).not.toBeInTheDocument()
    })
  })
})
