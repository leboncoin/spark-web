/* eslint-disable max-lines */
import { FormField } from '@spark-ui/form-field'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { Combobox } from '.'

const getInput = (accessibleName: string) => {
  return screen.getByRole('combobox', { name: accessibleName })
}

const getListbox = (accessibleName: string) => {
  return screen.getByRole('listbox', { name: accessibleName })
}

const getItemsGroup = (accessibleName: string) => {
  return screen.getByRole('group', { name: accessibleName })
}

const getItem = (accessibleName: string) => {
  return screen.getByRole('option', { name: accessibleName })
}

const queryItem = (accessibleName: string) => {
  return screen.queryByRole('option', { name: accessibleName })
}

describe('Combobox', () => {
  it('should render input and list of items', () => {
    render(
      <Combobox>
        <Combobox.Input aria-label="Book" />
        <Combobox.Popover>
          <Combobox.Items>
            <Combobox.Item value="book-1">War and Peace</Combobox.Item>
            <Combobox.Item value="book-2">1984</Combobox.Item>
            <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
          </Combobox.Items>
        </Combobox.Popover>
      </Combobox>
    )

    expect(getInput('Book')).toBeInTheDocument()

    expect(getListbox('Book')).toBeInTheDocument()

    expect(getItem('War and Peace')).toBeInTheDocument()
    expect(getItem('1984')).toBeInTheDocument()
    expect(getItem('Pride and Prejudice')).toBeInTheDocument()
  })

  describe('Popover behaviour', () => {
    it('should open/close the popover when interacting with its input', async () => {
      const user = userEvent.setup()

      // Given a close combobox (default state)
      render(
        <Combobox>
          <Combobox.Input aria-label="Book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      const input = getInput('Book')

      expect(input).toHaveAttribute('aria-expanded', 'false')

      // When the user interact with the input
      await user.click(input)

      // Then the combobox has expanded
      expect(input).toHaveAttribute('aria-expanded', 'true')

      // When the user interact with the input while expanded
      await user.click(input)

      // Then the combobox is closed again
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    it('should open/close the items list when interacting with its input (no popover)', async () => {
      const user = userEvent.setup()

      // Given a close combobox without a popover(default state)
      render(
        <Combobox>
          <Combobox.Input aria-label="Book" />

          <Combobox.Items>
            <Combobox.Item value="book-1">War and Peace</Combobox.Item>
            <Combobox.Item value="book-2">1984</Combobox.Item>
            <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
          </Combobox.Items>
        </Combobox>
      )

      const input = getInput('Book')

      expect(input).toHaveAttribute('aria-expanded', 'false')

      // When the user interact with the input
      await user.click(input)

      // Then the combobox has expanded
      expect(input).toHaveAttribute('aria-expanded', 'true')

      // When the user interact with the input while expanded
      await user.click(input)

      // Then the combobox is closed again
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    it('should remain forced opened', async () => {
      const user = userEvent.setup()

      // Given a combobox that should remain opened
      render(
        <Combobox open>
          <Combobox.Input aria-label="Book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      expect(getInput('Book')).toHaveAttribute('aria-expanded', 'true')

      // When the user interacts with the input
      await user.click(getInput('Book'))

      // Then the combobox remains opened
      expect(getInput('Book')).toHaveAttribute('aria-expanded', 'true')
    })

    it('should be opened by default but close upon interaction', async () => {
      const user = userEvent.setup()

      // Given a combobox that should remain opened
      render(
        <Combobox defaultOpen>
          <Combobox.Input aria-label="Book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      expect(getInput('Book')).toHaveAttribute('aria-expanded', 'true')

      // When the user interacts with the input
      await user.click(getInput('Book'))

      // Then the combobox remains opened
      expect(getInput('Book')).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Combobox.Group', () => {
    it('should link items groups with their label', () => {
      // Given a combobox with items groups and group labels
      render(
        <Combobox>
          <Combobox.Input aria-label="Book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Group>
                <Combobox.Label>Best-sellers</Combobox.Label>
                <Combobox.Item value="book-1">War and Peace</Combobox.Item>
                <Combobox.Item value="book-2">1984</Combobox.Item>
              </Combobox.Group>
              <Combobox.Divider />
              <Combobox.Group>
                <Combobox.Label>Novelties</Combobox.Label>
                <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
                <Combobox.Item value="book-4">Pride and Prejudice</Combobox.Item>
              </Combobox.Group>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // Then each group have an accessible label
      expect(getItemsGroup('Best-sellers')).toBeInTheDocument()
      expect(getItemsGroup('Novelties')).toBeInTheDocument()
    })
  })

  describe('statuses (combined with FormField', () => {
    it('should render error message when field is in error', () => {
      render(
        <FormField state="error">
          <FormField.Label>Book</FormField.Label>
          <Combobox>
            <Combobox.Input />
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
  })

  describe('single selection', () => {
    it('should select item', async () => {
      const user = userEvent.setup()

      // Given a combobox with no selected value yet
      render(
        <Combobox>
          <Combobox.Input aria-label="Book" placeholder="Pick a book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // Then placeholder should be displayed
      expect(getInput('Book').getAttribute('placeholder')).toBe('Pick a book')
      expect(getInput('Book').getAttribute('value')).toBe('')

      // When the user select an item
      await user.click(getInput('Book'))
      await user.click(getItem('Pride and Prejudice'))

      // Then placeholder is replaced by the selected value
      expect(screen.getByDisplayValue('Pride and Prejudice')).toBeInTheDocument()

      // Then the proper item is selected
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })

    it('should render default selected option', () => {
      // Given a combobox with a default selected value
      render(
        <Combobox defaultValue="book-2">
          <Combobox.Input aria-label="Book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // Then the corresponding item is selected
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')
    })

    it('should render default selected option with proper indicator when including it', () => {
      // Given a combobox with a default selected value
      render(
        <Combobox defaultValue="book-2">
          <Combobox.Input aria-label="Book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">
                <Combobox.ItemIndicator label={'selected'} />
                <Combobox.ItemText>War and Peace</Combobox.ItemText>
              </Combobox.Item>
              <Combobox.Item value="book-2">
                <Combobox.ItemIndicator label={'selected'} />
                <Combobox.ItemText>1984</Combobox.ItemText>
              </Combobox.Item>
              <Combobox.Item value="book-3">
                <Combobox.ItemIndicator label={'selected'} />
                <Combobox.ItemText>Pride and Prejudice</Combobox.ItemText>
              </Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // Then the corresponding item is selected
      expect(screen.getByLabelText('selected')).toBeVisible()
    })

    it('should control value', async () => {
      const user = userEvent.setup()

      // Given we control value by outside state and selected value
      const ControlledImplementation = () => {
        const [value, setValue] = useState('book-1')

        return (
          <Combobox value={value} onValueChange={setValue}>
            <Combobox.Input aria-label="Book" />
            <Combobox.Popover>
              <Combobox.Items>
                <Combobox.Item value="book-1">War and Peace</Combobox.Item>
                <Combobox.Item value="book-2">1984</Combobox.Item>
                <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
              </Combobox.Items>
            </Combobox.Popover>
          </Combobox>
        )
      }

      render(<ControlledImplementation />)

      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')

      expect(screen.getByDisplayValue('War and Peace')).toBeInTheDocument()

      // when the user select another item
      await user.click(getInput('Book'))
      await user.click(getItem('Pride and Prejudice'))

      // Then the selected value has been updated
      expect(screen.getByDisplayValue('Pride and Prejudice')).toBeInTheDocument()
    })

    it('should select item using autoSelect (keyboard)', async () => {
      const user = userEvent.setup()

      // Given a combobox with no selected value yet
      render(
        <Combobox autoSelect>
          <Combobox.Input aria-label="Book" placeholder="Pick a book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // Then placeholder should be displayed
      expect(getInput('Book').getAttribute('placeholder')).toBe('Pick a book')

      // When the user type "pri" to filter first item matching, then select it
      await user.click(getInput('Book'))
      await user.keyboard('{p}{r}{i}{ArrowDown}{Enter}')

      // Then placeholder is replaced by the selected value
      expect(screen.getByDisplayValue('Pride and Prejudice')).toBeInTheDocument()

      // Then the proper item is selected
      expect(queryItem('War and Peace')).not.toBeInTheDocument()
      expect(queryItem('1984')).not.toBeInTheDocument()
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('multiple selection', () => {
    it('should select items', async () => {
      const user = userEvent.setup()

      // Given a combobox with no selected value yet
      render(
        <Combobox multiple>
          <Combobox.Input aria-label="Book" placeholder="Pick a book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // Then placeholder should be displayed
      expect(getInput('Book').getAttribute('placeholder')).toBe('Pick a book')

      // When the user select two items
      await user.click(getInput('Book'))
      await user.click(getItem('1984'))
      await user.click(getItem('Pride and Prejudice'))

      // Then placeholder is replaced by the selected value and suffix indicating remaining items
      expect(getInput('Book').getAttribute('placeholder')).toBe('1984, Pride and Prejudice')

      // Then the proper items are selected
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })

    it('should select all items using keyboard navigation', async () => {
      const user = userEvent.setup()

      // Given a combobox with no selected value yet
      render(
        <Combobox multiple>
          <Combobox.Input aria-label="Book" placeholder="Pick a book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // Then placeholder should be displayed
      expect(getInput('Book').getAttribute('placeholder')).toBe('Pick a book')

      // When the user select all the items one by one using the keyboard
      await user.click(getInput('Book'))
      await user.keyboard('[ArrowDown][Enter]')
      await user.keyboard('[ArrowDown][Enter]')
      await user.keyboard('[ArrowDown][Enter]')

      // Then all items are selected
      expect(getInput('Book').getAttribute('placeholder')).toBe(
        'War and Peace, 1984, Pride and Prejudice'
      )
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })

    it('should be able to unselect a selected item', async () => {
      const user = userEvent.setup()

      // Given a combobox with no selected value yet
      render(
        <Combobox multiple>
          <Combobox.Input aria-label="Book" placeholder="Pick a book" />
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // When the user select an item
      await user.click(getInput('Book'))
      await user.click(getItem('1984'))

      // Then placeholder is replaced by the selected value
      expect(getInput('Book').getAttribute('placeholder')).toBe('1984')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')

      // When the user unselect that item
      await user.click(getItem('1984'))

      // Then placeholder is shown again as the item is no longer selected
      expect(getInput('Book').getAttribute('placeholder')).toBe('Pick a book')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
    })
  })
})
