import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FormField } from '../form-field'
import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

describe('Checkbox', () => {
  it('should render', () => {
    const label = 'Accept terms and conditions'

    render(<Checkbox>{label}</Checkbox>)

    const checkboxEl = screen.getByRole('checkbox', { name: label })

    expect(checkboxEl).toBeInTheDocument()
    expect(checkboxEl).not.toHaveAttribute('aria-required', 'true')
    expect(checkboxEl).not.toBeInvalid()
    expect(checkboxEl).not.toHaveAccessibleDescription()
    expect(document.querySelector('[data-spark-component="checkbox"]')).toBeInTheDocument()
  })

  it('should render checked state', () => {
    const label = 'Accept terms and conditions'

    render(<Checkbox defaultChecked>{label}</Checkbox>)

    const checkboxEl = screen.getByRole('checkbox', { name: label })

    expect(checkboxEl).toBeChecked()
    expect(checkboxEl).toHaveAttribute('value', 'on')
  })

  it('should render unchecked state', () => {
    const label = 'Accept terms and conditions'

    render(<Checkbox>{label}</Checkbox>)

    const checkboxEl = screen.getByRole('checkbox', { name: label })

    expect(checkboxEl).not.toBeChecked()
    expect(checkboxEl).toHaveAttribute('value', 'on')
  })

  it('should render indeterminate state', () => {
    const label = 'Accept terms and conditions'

    render(<Checkbox checked="indeterminate">{label}</Checkbox>)

    const checkboxEl = screen.getByRole('checkbox', { name: label })

    expect(checkboxEl).toHaveAttribute('aria-checked', 'mixed')
    expect(checkboxEl).toHaveAttribute('value', 'on')
  })

  it('should render as required', () => {
    const label = 'Accept terms and conditions'

    render(<Checkbox required>{label}</Checkbox>)

    const checkboxEl = screen.getByRole('checkbox', { name: label })

    expect(checkboxEl).toHaveAttribute('aria-required', 'true')
  })

  it('should toggle checked state when is clicked in uncontrolled mode', async () => {
    const onCheckedChange = vi.fn()
    const label = 'Accept terms and conditions'

    render(
      <Checkbox defaultChecked onCheckedChange={onCheckedChange}>
        {label}
      </Checkbox>
    )

    const checkboxEl = screen.getByRole('checkbox', { name: label })

    await userEvent.click(checkboxEl)

    expect(checkboxEl).not.toBeChecked()
    expect(onCheckedChange).toHaveBeenCalledTimes(1)
    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('should toggle checked state when is clicked in controlled mode', async () => {
    const onCheckedChange = vi.fn()
    const label = 'Accept terms and conditions'

    render(
      <Checkbox checked onCheckedChange={onCheckedChange}>
        {label}
      </Checkbox>
    )

    const checkboxEl = screen.getByRole('checkbox', { name: label })

    expect(checkboxEl).toBeChecked()

    await userEvent.click(checkboxEl)

    expect(onCheckedChange).toHaveBeenCalledTimes(1)
    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('should not toggle checked state when is disabled', async () => {
    const onCheckedChange = vi.fn()
    const label = 'Accept terms and conditions'

    render(<Checkbox disabled>{label}</Checkbox>)

    const checkboxEl = screen.getByRole('checkbox', { name: label })

    await userEvent.click(checkboxEl)

    expect(checkboxEl).not.toBeChecked()
    expect(onCheckedChange).toHaveBeenCalledTimes(0)
  })

  it('should handle the reverse prop', () => {
    const { rerender } = render(<Checkbox>hello</Checkbox>)
    const label = screen.getByText('hello')
    const checkboxInput = screen.getByRole('checkbox', {
      name: 'hello',
    })

    // checkbox input should be before label in the DOM
    expect(
      checkboxInput.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    rerender(<Checkbox reverse>hello</Checkbox>)
    // label should be before checkbox input in the DOM
    expect(
      label.compareDocumentPosition(checkboxInput) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })
})

describe('CheckboxGroup', () => {
  it('should render group', () => {
    render(
      <CheckboxGroup aria-label="Sports">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
      </CheckboxGroup>
    )

    const groupEl = screen.getByRole('group', { name: 'Sports' })

    expect(groupEl).toBeInTheDocument()

    const checkboxEls = within(groupEl).getAllByRole('checkbox')

    expect(checkboxEls[0]).toBeInTheDocument()
    expect(checkboxEls[1]).toBeInTheDocument()
  })

  it('should toggle checked state in a group when is clicked in uncontrolled mode', async () => {
    const onCheckedChange = vi.fn()

    render(
      <CheckboxGroup
        defaultValue={['baseball']}
        name="sports"
        aria-label="Sports"
        onCheckedChange={onCheckedChange}
      >
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
      </CheckboxGroup>
    )

    const groupEl = screen.getByRole('group', { name: 'Sports' })
    const checkboxEl = within(groupEl).getByRole('checkbox', { name: 'Soccer' })

    expect(groupEl).toBeInTheDocument()
    expect(checkboxEl).not.toBeChecked()
    expect(within(groupEl).getByRole('checkbox', { name: 'Baseball' })).toBeChecked()

    await userEvent.click(checkboxEl)

    expect(checkboxEl).toBeChecked()
    expect(onCheckedChange).toHaveBeenCalledTimes(1)
    expect(onCheckedChange).toHaveBeenCalledWith(['baseball', 'soccer'])
  })

  it('should toggle checked state in a group when is clicked in controlled mode', async () => {
    const onCheckedChange = vi.fn()

    render(
      <CheckboxGroup
        value={['baseball']}
        name="sports"
        aria-label="Sports"
        onCheckedChange={onCheckedChange}
      >
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
      </CheckboxGroup>
    )

    const groupEl = screen.getByRole('group', { name: 'Sports' })
    const checkboxEl = within(groupEl).getByRole('checkbox', { name: 'Soccer' })

    expect(groupEl).toBeInTheDocument()
    expect(checkboxEl).not.toBeChecked()
    expect(within(groupEl).getByRole('checkbox', { name: 'Baseball' })).toBeChecked()

    await userEvent.click(checkboxEl)

    expect(onCheckedChange).toHaveBeenCalledTimes(1)
    expect(onCheckedChange).toHaveBeenCalledWith(['baseball', 'soccer'])
  })

  it('should always have an accessible name', () => {
    // By default we should always define a direct label (children)...
    const { rerender } = render(
      <CheckboxGroup>
        <Checkbox value="accessible">My accessible label</Checkbox>
      </CheckboxGroup>
    )

    expect(screen.getByRole('checkbox', { name: 'My accessible label' })).toBeInTheDocument()

    // ...If not we should define an aria-label
    rerender(
      <CheckboxGroup>
        <Checkbox value="accessible" aria-label="My worst effort accessible label" />
      </CheckboxGroup>
    )

    expect(
      screen.getByRole('checkbox', { name: 'My worst effort accessible label' })
    ).toBeInTheDocument()

    // On using the FormField we also could be using the related subcomponent
    rerender(
      <FormField name="agreement">
        <FormField.Label>My accessible field label</FormField.Label>

        <CheckboxGroup>
          <Checkbox value="accessible" />
        </CheckboxGroup>
      </FormField>
    )

    expect(screen.getByRole('checkbox', { name: 'My accessible field label' })).toBeInTheDocument()
  })

  it('should handle the reverse prop', () => {
    const { rerender } = render(
      <CheckboxGroup>
        <Checkbox value="hello">hello</Checkbox>
      </CheckboxGroup>
    )
    const label = screen.getByText('hello')
    const checkboxInput = screen.getByRole('checkbox', {
      name: 'hello',
    })

    // checkbox input should be before label in the DOM
    expect(
      checkboxInput.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    rerender(
      <CheckboxGroup reverse>
        <Checkbox value="hello">hello</Checkbox>
      </CheckboxGroup>
    )
    // label should be before checkbox input in the DOM
    expect(
      label.compareDocumentPosition(checkboxInput) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  describe('with FormField', () => {
    it('should render with a label', () => {
      render(
        <FormField name="sports">
          <FormField.Label>Sports</FormField.Label>

          <CheckboxGroup>
            <Checkbox value="soccer">Soccer</Checkbox>
            <Checkbox value="baseball">Baseball</Checkbox>
          </CheckboxGroup>
        </FormField>
      )

      expect(screen.getByRole('group', { name: 'Sports' })).toBeInTheDocument()
    })

    it('should render aria-attributes following FormField implementation', () => {
      render(
        <FormField name="sports" state="error" isRequired>
          <FormField.Label>Sports</FormField.Label>

          <CheckboxGroup>
            <Checkbox value="soccer">Soccer</Checkbox>
            <Checkbox value="baseball">Baseball</Checkbox>
          </CheckboxGroup>

          <FormField.HelperMessage>Choose which sports you like</FormField.HelperMessage>
        </FormField>
      )

      const checkboxEls = within(screen.getByRole('group', { name: 'Sports' })).getAllByRole(
        'checkbox'
      )

      expect(checkboxEls[0]).toHaveAttribute('aria-required', 'true')
      expect(checkboxEls[1]).toHaveAttribute('aria-required', 'true')

      expect(checkboxEls[0]).toBeInvalid()
      expect(checkboxEls[1]).toBeInvalid()

      expect(
        screen.getByRole('group', {
          name: 'Sports',
          description: 'Choose which sports you like',
        })
      ).toBeInTheDocument()
    })

    it('should remove the required attribute from individual checkboxes when at least one checkbox is checked', async () => {
      render(
        <FormField name="sports" isRequired>
          <FormField.Label>Sports</FormField.Label>

          <CheckboxGroup>
            <Checkbox value="soccer">Soccer</Checkbox>
            <Checkbox value="baseball">Baseball</Checkbox>
          </CheckboxGroup>
        </FormField>
      )

      const checkboxEls = within(screen.getByRole('group', { name: 'Sports' })).getAllByRole(
        'checkbox'
      )

      expect(checkboxEls[0]).toHaveAttribute('aria-required', 'true')
      expect(checkboxEls[1]).toHaveAttribute('aria-required', 'true')

      await userEvent.click(
        screen.getByRole('checkbox', {
          name: 'Baseball',
        })
      )

      expect(checkboxEls[0]).toHaveAttribute('aria-required', 'false')
      expect(checkboxEls[0]).not.toBeRequired()

      expect(checkboxEls[1]).toHaveAttribute('aria-required', 'false')
      expect(checkboxEls[1]).not.toBeRequired()
    })
  })
})
