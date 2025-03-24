import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { FormField } from '../../form-field'
import { Combobox } from '..'
import { getInput } from './test-utils'

describe('Combobox', () => {
  describe('with FormField', () => {
    it('should render error message when field is in error', () => {
      render(
        <FormField state="error">
          <FormField.Label>Book</FormField.Label>
          <Combobox>
            <Combobox.Trigger>
              <Combobox.Input aria-label="Book" placeholder="Pick a book" />
            </Combobox.Trigger>
            <Combobox.Popover>
              <Combobox.Items>
                <Combobox.Item value="book-1">War and Peace</Combobox.Item>
                <Combobox.Item value="book-2">1984</Combobox.Item>
                <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
              </Combobox.Items>
            </Combobox.Popover>
          </Combobox>
          <FormField.ErrorMessage>You forgot to select a book</FormField.ErrorMessage>
        </FormField>
      )

      expect(getInput('Book')).toBeInTheDocument()

      expect(screen.getByText('You forgot to select a book')).toBeInTheDocument()
    })

    it('should move focus to the input field when the corresponding label is clicked', async () => {
      const user = userEvent.setup()

      render(
        <FormField>
          <FormField.Label>Click me</FormField.Label>
          <Combobox>
            <Combobox.Trigger>
              <Combobox.Input aria-label="Book" placeholder="Pick a book" />
            </Combobox.Trigger>
            <Combobox.Popover>
              <Combobox.Items>
                <Combobox.Item value="book-1">War and Peace</Combobox.Item>
                <Combobox.Item value="book-2">1984</Combobox.Item>
                <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
              </Combobox.Items>
            </Combobox.Popover>
          </Combobox>
          <FormField.ErrorMessage>You forgot to select a book</FormField.ErrorMessage>
        </FormField>
      )

      await user.click(screen.getByText('Click me'))

      expect(getInput('Click me')).toHaveFocus()
    })
  })
})
