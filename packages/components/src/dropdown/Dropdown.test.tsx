/* eslint-disable max-lines */
import { BookmarkFill } from '@spark-ui/icons/BookmarkFill'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { FormField } from '../form-field'
import { Dropdown } from '.'

const getTrigger = (accessibleName: string) => {
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

describe('Dropdown', () => {
  it('should render trigger and list of items', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger aria-label="Book">
          <Dropdown.LeadingIcon>
            <BookmarkFill />
          </Dropdown.LeadingIcon>
          <Dropdown.Value placeholder="Pick a book" />
        </Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
            <Dropdown.Item value="book-2">1984</Dropdown.Item>
            <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>
    )

    expect(getTrigger('Book')).toBeInTheDocument()

    expect(getListbox('Book')).toBeInTheDocument()

    expect(getItem('War and Peace')).toBeInTheDocument()
    expect(getItem('1984')).toBeInTheDocument()
    expect(getItem('Pride and Prejudice')).toBeInTheDocument()
  })

  describe('Popover behaviour', () => {
    it('should open/close the popover when interacting with its trigger', async () => {
      const user = userEvent.setup()

      // Given a close dropdown (default state)
      render(
        <Dropdown>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      const trigger = getTrigger('Book')

      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      // When the user interact with the trigger
      await user.click(trigger)

      // Then the dropdown has expanded
      expect(trigger).toHaveAttribute('aria-expanded', 'true')

      // When the user interact with the trigger while expanded
      await user.click(trigger)

      // Then the dropdown is closed again
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('should open/close the items list when interacting with its trigger (no popover)', async () => {
      const user = userEvent.setup()

      // Given a close dropdown without a popover(default state)
      render(
        <Dropdown>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>

          <Dropdown.Items>
            <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
            <Dropdown.Item value="book-2">1984</Dropdown.Item>
            <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
          </Dropdown.Items>
        </Dropdown>
      )

      const trigger = getTrigger('Book')

      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      // When the user interact with the trigger
      await user.click(trigger)

      // Then the dropdown has expanded
      expect(trigger).toHaveAttribute('aria-expanded', 'true')

      // When the user interact with the trigger while expanded
      await user.click(trigger)

      // Then the dropdown is closed again
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('should remain forced opened', async () => {
      const user = userEvent.setup()

      // Given a dropdown that should remain opened
      render(
        <Dropdown open>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      expect(getTrigger('Book')).toHaveAttribute('aria-expanded', 'true')

      // When the user interacts with the trigger
      await user.click(getTrigger('Book'))

      // Then the dropdown remains opened
      expect(getTrigger('Book')).toHaveAttribute('aria-expanded', 'true')
    })

    it('should be opened by default but close upon interaction', async () => {
      const user = userEvent.setup()

      // Given a dropdown that should remain opened
      render(
        <Dropdown defaultOpen>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      expect(getTrigger('Book')).toHaveAttribute('aria-expanded', 'true')

      // When the user interacts with the trigger
      await user.click(getTrigger('Book'))

      // Then the dropdown remains opened
      expect(getTrigger('Book')).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Dropdown.Group', () => {
    it('should link items groups with their label', () => {
      // Given a dropdown with items groups and group labels
      render(
        <Dropdown>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Group>
                <Dropdown.Label>Best-sellers</Dropdown.Label>
                <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
                <Dropdown.Item value="book-2">1984</Dropdown.Item>
              </Dropdown.Group>
              <Dropdown.Divider />
              <Dropdown.Group>
                <Dropdown.Label>Novelties</Dropdown.Label>
                <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
                <Dropdown.Item value="book-4">Pride and Prejudice</Dropdown.Item>
              </Dropdown.Group>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then each group have an accessible label
      expect(getItemsGroup('Best-sellers')).toBeInTheDocument()
      expect(getItemsGroup('Novelties')).toBeInTheDocument()
    })
  })

  describe('Dropdown.Value', () => {
    it('should display custom value after selection', async () => {
      const user = userEvent.setup()

      // Given a dropdown with no selected value yet
      render(
        <Dropdown>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book">You have selected a book</Dropdown.Value>
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then placeholder should be displayed
      expect(getTrigger('Book')).toHaveTextContent('Pick a book')

      // When the user select an item
      await user.click(getTrigger('Book'))
      await user.click(getItem('Pride and Prejudice'))

      // Then placeholder is replaced by a custom value
      expect(getTrigger('Book')).toHaveTextContent('You have selected a book')
    })

    it('should display text in trigger when selecting an item with custom markup', async () => {
      const user = userEvent.setup()

      // Given a dropdown with no selected value yet and custom items markup
      render(
        <Dropdown>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">
                <span>New:</span>
                <Dropdown.ItemText>War and Peace</Dropdown.ItemText>
              </Dropdown.Item>
              <Dropdown.Item value="book-2">
                <span>New:</span>
                <Dropdown.ItemText>1984</Dropdown.ItemText>
              </Dropdown.Item>
              <Dropdown.Item value="book-3">
                <span>New:</span>
                <Dropdown.ItemText>Pride and Prejudice</Dropdown.ItemText>
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then placeholder should be displayed
      expect(getTrigger('Book')).toHaveTextContent('Pick a book')

      // When the user select an item
      await user.click(getTrigger('Book'))
      await user.click(getItem('Pride and Prejudice'))

      // Then placeholder is replaced by the raw text value
      expect(getTrigger('Book')).toHaveTextContent('Pride and Prejudice')
    })

    it('should update displayed text when selected item text changes', async () => {
      const user = userEvent.setup()
      const initialSelectedItemText = 'To Kill a Mockingbird'
      const updatedSelectedItemText = 'Updated title'

      const Implementation = () => {
        const [value, setValue] = useState('book-1')
        const [bookText, setBookText] = useState(initialSelectedItemText)

        return (
          <div className="pb-[300px]">
            <Dropdown value={value} onValueChange={setValue}>
              <Dropdown.Trigger aria-label="Book">
                <Dropdown.Value placeholder="Pick a book" />
              </Dropdown.Trigger>

              <button
                onClick={() => {
                  setBookText(updatedSelectedItemText)
                }}
              >
                Update book name
              </button>

              <Dropdown.Popover>
                <Dropdown.Items>
                  <Dropdown.Item value="book-1">{bookText}</Dropdown.Item>
                  <Dropdown.Item value="book-2">War and Peace</Dropdown.Item>
                  <Dropdown.Item value="book-3">The Idiot</Dropdown.Item>
                </Dropdown.Items>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        )
      }

      render(<Implementation />)

      // Then placeholder should be displayed
      expect(getTrigger('Book')).toHaveTextContent(initialSelectedItemText)

      await user.click(screen.getByText('Update book name'))

      // Then placeholder text should be updated
      expect(getTrigger('Book')).toHaveTextContent(updatedSelectedItemText)
    })
  })

  describe('statuses (combined with FormField', () => {
    it('should render error message when field is in error', () => {
      render(
        <FormField state="error">
          <FormField.Label>Book</FormField.Label>
          <Dropdown>
            <Dropdown.Trigger>
              <Dropdown.Value placeholder="Pick a book" />
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Items>
                <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
                <Dropdown.Item value="book-2">1984</Dropdown.Item>
                <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
              </Dropdown.Items>
            </Dropdown.Popover>
          </Dropdown>
          <FormField.ErrorMessage>You forgot to select a book</FormField.ErrorMessage>
        </FormField>
      )

      expect(getTrigger('Book')).toBeInTheDocument()

      expect(screen.getByText('You forgot to select a book')).toBeInTheDocument()
    })
  })

  describe('single selection', () => {
    it('should select item', async () => {
      const user = userEvent.setup()

      // Given a dropdown with no selected value yet
      render(
        <Dropdown>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then placeholder should be displayed
      expect(getTrigger('Book')).toHaveTextContent('Pick a book')

      // When the user select an item
      await user.click(getTrigger('Book'))
      await user.click(getItem('Pride and Prejudice'))

      // Then placeholder is replaced by the selected value
      expect(getTrigger('Book')).toHaveTextContent('Pride and Prejudice')

      // Then the proper item is selected
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })

    it('should render default selected option', () => {
      // Given a dropdown with a default selected value
      render(
        <Dropdown defaultValue="book-2">
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then the corresponding item is selected
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')
    })

    it('should render default selected option with proper indicator when including it', () => {
      // Given a dropdown with a default selected value
      render(
        <Dropdown defaultValue="book-2">
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">
                <Dropdown.ItemIndicator label={'selected'} />
                <Dropdown.ItemText>War and Peace</Dropdown.ItemText>
              </Dropdown.Item>
              <Dropdown.Item value="book-2">
                <Dropdown.ItemIndicator label={'selected'} />
                <Dropdown.ItemText>1984</Dropdown.ItemText>
              </Dropdown.Item>
              <Dropdown.Item value="book-3">
                <Dropdown.ItemIndicator label={'selected'} />
                <Dropdown.ItemText>Pride and Prejudice</Dropdown.ItemText>
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
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
          <Dropdown value={value} onValueChange={setValue}>
            <Dropdown.Trigger aria-label="Book">
              <Dropdown.Value placeholder="Pick a book" />
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Items>
                <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
                <Dropdown.Item value="book-2">1984</Dropdown.Item>
                <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
              </Dropdown.Items>
            </Dropdown.Popover>
          </Dropdown>
        )
      }

      render(<ControlledImplementation />)

      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')

      expect(getTrigger('Book')).toHaveTextContent('War and Peace')

      // when the user select another item
      await user.click(getTrigger('Book'))
      await user.click(getItem('Pride and Prejudice'))

      // Then the selected value has been updated
      expect(getTrigger('Book')).toHaveTextContent('Pride and Prejudice')
    })

    it('should select item using autocomplete (keyboard)', async () => {
      const user = userEvent.setup()

      // Given a dropdown with no selected value yet
      render(
        <Dropdown>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then placeholder should be displayed
      expect(getTrigger('Book')).toHaveTextContent('Pick a book')

      // When the user type "p" to highlight first item matching, then select it
      await user.click(getTrigger('Book'))
      await user.keyboard('{p}{Enter}')

      // Then placeholder is replaced by the selected value
      expect(getTrigger('Book')).toHaveTextContent('Pride and Prejudice')

      // Then the proper item is selected
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('multiple selection', () => {
    it('should select items', async () => {
      const user = userEvent.setup()

      // Given a dropdown with no selected value yet
      render(
        <Dropdown multiple>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then placeholder should be displayed
      expect(getTrigger('Book')).toHaveTextContent('Pick a book')

      // When the user select two items
      await user.click(getTrigger('Book'))
      await user.click(getItem('1984'))
      await user.click(getItem('Pride and Prejudice'))

      // Then placeholder is replaced by the selected value and suffix indicating remaining items
      expect(getTrigger('Book')).toHaveTextContent('1984, +1')

      // Then the proper items are selected
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })

    it('should select all items using keyboard navigation', async () => {
      const user = userEvent.setup()

      // Given a dropdown with no selected value yet
      render(
        <Dropdown multiple>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then placeholder should be displayed
      expect(getTrigger('Book')).toHaveTextContent('Pick a book')

      // When the user select all the items one by one using the keyboard
      await user.click(getTrigger('Book'))
      await user.keyboard('[ArrowDown][Enter]')
      await user.keyboard('[ArrowDown][Enter]')
      await user.keyboard('[ArrowDown][Enter]')

      // Then all items are selected
      expect(getTrigger('Book')).toHaveTextContent('War and Peace, +2')
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })

    it('should be able to unselect a selected item', async () => {
      const user = userEvent.setup()

      // Given a dropdown with no selected value yet
      render(
        <Dropdown multiple>
          <Dropdown.Trigger aria-label="Book">
            <Dropdown.Value placeholder="Pick a book" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="book-1">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-2">1984</Dropdown.Item>
              <Dropdown.Item value="book-3">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
      )

      // Then placeholder should be displayed
      expect(getTrigger('Book')).toHaveTextContent('Pick a book')

      // When the user select an item
      await user.click(getTrigger('Book'))
      await user.click(getItem('1984'))

      // Then placeholder is replaced by the selected value
      expect(getTrigger('Book')).toHaveTextContent('1984')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')

      // When the user unselect that item
      await user.click(getItem('1984'))

      // Then placeholder is shown again as the item is no longer selected
      expect(getTrigger('Book')).toHaveTextContent('Pick a book')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
    })

    // it('should render default selected items', () => {})
    // it('should control value', async () => {})
  })
})
