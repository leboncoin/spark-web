import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormField } from '.'

describe('FormField', () => {
  it('should render', () => {
    render(
      <FormField name="email">
        <FormField.Label>Email</FormField.Label>

        <FormField.Control>
          {({ id, name, description }) => (
            <input type="email" id={id} name={name} aria-describedby={description} />
          )}
        </FormField.Control>
      </FormField>
    )

    expect(screen.getByLabelText('Email')).toHaveAttribute('name', 'email')
  })

  it('should render default required indicator', () => {
    render(
      <FormField name="email" isRequired>
        <FormField.Label>Email</FormField.Label>

        <FormField.Control>
          {({ id, name, description, isRequired }) => (
            <input
              type="email"
              id={id}
              name={name}
              aria-required={isRequired}
              required={isRequired}
              aria-describedby={description}
            />
          )}
        </FormField.Control>
      </FormField>
    )

    const inputEl = screen.getByLabelText(/Email/)
    const requiredEl = screen.getByText('*')

    expect(inputEl).toHaveAttribute('required')
    expect(inputEl).toHaveAttribute('aria-required', 'true')

    expect(requiredEl).toHaveAttribute('role', 'presentation')
    expect(requiredEl).toHaveAttribute('aria-hidden', 'true')
  })

  it('should render custom required indicator', () => {
    render(
      <FormField name="email" isRequired>
        <FormField.Label
          requiredIndicator={<FormField.RequiredIndicator>Required</FormField.RequiredIndicator>}
        >
          Email
        </FormField.Label>

        <FormField.Control>
          {({ id, name, description }) => (
            <input type="email" id={id} name={name} aria-describedby={description} />
          )}
        </FormField.Control>
      </FormField>
    )

    const requiredEl = screen.getByText('Required')

    expect(requiredEl).toHaveAttribute('role', 'presentation')
    expect(requiredEl).toHaveAttribute('aria-hidden', 'true')
  })

  it('should render helper message', () => {
    render(
      <FormField name="email">
        <FormField.Label>Email</FormField.Label>

        <FormField.Control>
          {({ id, name, description }) => (
            <input type="email" id={id} name={name} aria-describedby={description} />
          )}
        </FormField.Control>

        <FormField.HelperMessage>We will never share your email</FormField.HelperMessage>
      </FormField>
    )

    const inputEl = screen.getByLabelText('Email')
    const helperTextEl = screen.getByText('We will never share your email')

    expect(inputEl.getAttribute('aria-describedby')).toEqual(helperTextEl.getAttribute('id'))
  })

  it('should render using custom label', () => {
    render(
      <FormField name="category">
        <FormField.Label>
          <p>Category</p>
        </FormField.Label>

        <FormField.Control>
          {({ labelId, name }) => (
            <div role="radiogroup" aria-labelledby={labelId}>
              <label>
                <input name={name} type="radio" value="electronics" />
                Electronics
              </label>

              <label>
                <input name={name} type="radio" value="furnitures" />
                Furnitures
              </label>
            </div>
          )}
        </FormField.Control>
      </FormField>
    )

    expect(screen.getByRole('radiogroup', { name: 'Category' })).toBeInTheDocument()
    expect(screen.getByLabelText('Electronics')).toHaveAttribute('name', 'category')
    expect(screen.getByLabelText('Electronics')).toHaveAttribute('name', 'category')
  })
})

describe('FormField error message', () => {
  it('should not render error message when is not invalid', () => {
    render(
      <FormField name="email">
        <FormField.Label>Email</FormField.Label>

        <FormField.Control>
          {({ id, name, isInvalid, description }) => (
            <input
              type="email"
              id={id}
              name={name}
              aria-invalid={isInvalid}
              aria-describedby={description}
            />
          )}
        </FormField.Control>

        <FormField.ErrorMessage>We will never share your email</FormField.ErrorMessage>
      </FormField>
    )

    const inputEl = screen.getByLabelText('Email')

    expect(inputEl).toHaveAttribute('aria-invalid', 'false')
    expect(inputEl).not.toHaveAttribute('aria-describedby')
    expect(screen.queryByText('We will never share your email')).toBeNull()
  })

  it('should render error message when is invalid', () => {
    render(
      <FormField name="email" state="error">
        <FormField.Label>Email</FormField.Label>

        <FormField.Control>
          {({ id, name, isInvalid, description }) => (
            <input
              type="email"
              id={id}
              name={name}
              aria-invalid={isInvalid}
              aria-describedby={description}
            />
          )}
        </FormField.Control>

        <FormField.ErrorMessage>Email is required</FormField.ErrorMessage>
      </FormField>
    )

    const inputEl = screen.getByLabelText('Email')
    const errorTextEl = screen.getByText('Email is required')

    expect(inputEl).toHaveAttribute('aria-invalid', 'true')
    expect(inputEl).toHaveAttribute('aria-describedby', errorTextEl.getAttribute('id'))
    expect(errorTextEl).toHaveAttribute('aria-live', 'polite')
  })

  it('should render error and helper message when is invalid', () => {
    render(
      <FormField name="email" state="error">
        <FormField.Label>Email</FormField.Label>

        <FormField.Control>
          {({ id, name, description }) => (
            <input type="email" id={id} name={name} aria-describedby={description} />
          )}
        </FormField.Control>

        <FormField.ErrorMessage>Email is required</FormField.ErrorMessage>

        <FormField.HelperMessage>We will never share your email</FormField.HelperMessage>
      </FormField>
    )

    const inputEl = screen.getByLabelText('Email')
    const errorTextEl = screen.getByText('Email is required')
    const helperTextEl = screen.getByText('Email is required')

    expect(inputEl).toHaveAttribute('aria-describedby')

    const ids = (inputEl.getAttribute('aria-describedby') as string).split(' ')

    expect(ids).toContain(helperTextEl.getAttribute('id'))
    expect(ids).toContain(errorTextEl.getAttribute('id'))
  })

  it('should render the characters count component properly', () => {
    const MAX_LENGTH = 6
    const DEFAULT_VALUE = 'Hello'

    render(
      <FormField name="text">
        <FormField.Label>Text</FormField.Label>

        <FormField.Control>
          {({ id, name }) => (
            <input
              type="text"
              id={id}
              name={name}
              defaultValue={DEFAULT_VALUE}
              maxLength={MAX_LENGTH}
            />
          )}
        </FormField.Control>

        <div className="gap-md flex justify-between">
          <FormField.HelperMessage>We will never share your email</FormField.HelperMessage>

          <FormField.CharactersCount value={DEFAULT_VALUE} maxLength={MAX_LENGTH} />
        </div>
      </FormField>
    )

    expect(screen.getByLabelText('Text')).toHaveValue('Hello')
    expect(screen.getByText('5/6')).toBeVisible()
  })

  it('should render the characters count component properly when `value` is undefined', () => {
    const MAX_LENGTH = 6
    const DEFAULT_VALUE = undefined

    render(
      <FormField name="text">
        <FormField.Label>Text</FormField.Label>

        <FormField.Control>
          {({ id, name }) => (
            <input
              type="text"
              id={id}
              name={name}
              defaultValue={DEFAULT_VALUE}
              maxLength={MAX_LENGTH}
            />
          )}
        </FormField.Control>

        <div className="gap-md flex justify-between">
          <FormField.HelperMessage>We will never share your email</FormField.HelperMessage>

          <FormField.CharactersCount value={DEFAULT_VALUE} maxLength={MAX_LENGTH} />
        </div>
      </FormField>
    )

    expect(screen.getByLabelText('Text')).toHaveValue('')
    expect(screen.getByText('0/6')).toBeVisible()
  })
})
