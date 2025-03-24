import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { FormField } from '../form-field'
import { Switch } from './Switch'

describe('Switch', () => {
  it('should render', () => {
    render(<Switch>My agreement</Switch>)

    expect(document.querySelector('[data-spark-component="switch"]')).toBeInTheDocument()

    expect(screen.getByRole('switch', { name: 'My agreement' })).toBeInTheDocument()
  })

  it('should be unchecked by default', () => {
    render(<Switch />)

    expect(screen.getByRole('switch')).not.toBeChecked()
  })

  it('should be checked by default when using `defaultChecked`', () => {
    render(<Switch defaultChecked />)

    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('should always have an accessible name', () => {
    // By default we should always define a direct label (children)...
    const { rerender } = render(<Switch>My accessible label</Switch>)

    expect(screen.getByRole('switch', { name: 'My accessible label' })).toBeInTheDocument()

    // ...If not we should define an aria-label
    rerender(<Switch aria-label="My worst effort accessible label" />)

    expect(
      screen.getByRole('switch', { name: 'My worst effort accessible label' })
    ).toBeInTheDocument()

    // On using the FormField we also could be using the related subcomponent
    rerender(
      <FormField name="agreement">
        <FormField.Label>My accessible field label</FormField.Label>

        <Switch />
      </FormField>
    )

    expect(screen.getByRole('switch', { name: 'My accessible field label' })).toBeInTheDocument()
  })

  it('should handle the reverse prop', () => {
    const { rerender } = render(<Switch>hello</Switch>)
    const label = screen.getByText('hello')
    const switchInput = screen.getByRole('switch', {
      name: 'hello',
    })

    // switch input should be before label in the DOM
    expect(
      switchInput.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    rerender(<Switch reverse>hello</Switch>)
    // label should be before switch input in the DOM
    expect(
      label.compareDocumentPosition(switchInput) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  describe('user interactions', () => {
    it('should check/uncheck upon click', async () => {
      const user = userEvent.setup()

      render(<Switch />)

      await user.click(screen.getByRole('switch'))

      expect(screen.getByRole('switch')).toBeChecked()

      await user.click(screen.getByRole('switch'))

      expect(screen.getByRole('switch')).not.toBeChecked()
    })

    it('should not be interactive when disabled', async () => {
      const user = userEvent.setup()

      render(<Switch disabled />)

      await user.click(screen.getByRole('switch'))

      expect(screen.getByRole('switch')).not.toBeChecked()
    })

    it('should check/uncheck using the keyboard', async () => {
      const user = userEvent.setup()

      render(<Switch />)

      await user.keyboard('{Tab}') // pass focus to the Switch
      await user.keyboard('{Enter}') // Trigger the Switch

      expect(screen.getByRole('switch')).toBeChecked()

      await user.keyboard('{Enter}') // Trigger the Switch

      expect(screen.getByRole('switch')).not.toBeChecked()
    })
  })

  describe('controlled mode', () => {
    const ControlledSwitch = ({
      spyOnCheckedChange,
    }: {
      spyOnCheckedChange: (checked: boolean) => void
    }) => {
      const [isChecked, setIsChecked] = useState(false)

      const handleInteraction = (value: boolean): void => {
        spyOnCheckedChange(value)
        setIsChecked(value)
      }

      return (
        <div>
          <Switch checked={isChecked} onCheckedChange={handleInteraction} />
        </div>
      )
    }

    it('should trigger `onCheckedChange` on interaction', async () => {
      const spyOnCheckedChange = vi.fn()
      const user = userEvent.setup()

      render(<ControlledSwitch spyOnCheckedChange={spyOnCheckedChange} />)

      expect(spyOnCheckedChange).not.toHaveBeenCalled()
      expect(screen.getByRole('switch')).not.toBeChecked()

      await user.click(screen.getByRole('switch'))

      expect(spyOnCheckedChange).toHaveBeenCalledTimes(1)
      expect(screen.getByRole('switch')).toBeChecked()
    })
  })

  describe('with FormField', () => {
    it('should render with label and name', () => {
      render(
        <FormField name="agreement">
          <FormField.Label>
            <p>Agreement</p>
          </FormField.Label>

          <Switch />
        </FormField>
      )

      expect(screen.getByRole('switch', { name: 'Agreement' })).toBeInTheDocument()
    })

    it('should render aria-attributes following FormField implementation', () => {
      render(
        <FormField name="agreement" state="error" isRequired>
          <FormField.Label>
            <p>Agreement</p>
          </FormField.Label>

          <Switch />

          <FormField.ErrorMessage>Agreement is required</FormField.ErrorMessage>
        </FormField>
      )

      expect(screen.getByRole('switch', { name: 'Agreement' })).toHaveAttribute(
        'aria-required',
        'true'
      )

      expect(screen.getByRole('switch', { name: 'Agreement' })).toHaveAttribute(
        'aria-invalid',
        'true'
      )

      expect(screen.getByRole('switch', { name: 'Agreement' })).toHaveAttribute(
        'aria-describedby',
        screen.getByText('Agreement is required').getAttribute('id')
      )
    })
  })
})
