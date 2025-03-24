import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { Combobox } from '..'
import {
  getClearButton,
  getInput,
  getItem,
  getSelectedItem,
  getSelectedItemClearButton,
} from './test-utils'

describe('Combobox', () => {
  describe('multiple selection', () => {
    it('should select items', async () => {
      const user = userEvent.setup()

      // Given a combobox with no selected value yet
      render(
        <Combobox multiple>
          <Combobox.Trigger>
            <Combobox.SelectedItems />
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
      )

      // When the user select two items
      await user.click(getInput('Book'))
      await user.click(getItem('1984'))
      await user.click(getItem('Pride and Prejudice'))

      // Then matching selected items (chips) are displayed
      expect(getSelectedItem('1984')).toBeInTheDocument()
      expect(getSelectedItem('Pride and Prejudice')).toBeInTheDocument()

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
          <Combobox.Trigger>
            <Combobox.SelectedItems />
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
      )

      // When the user select all the items one by one using the keyboard
      await user.click(getInput('Book'))
      await user.keyboard('[ArrowDown][Enter]')
      await user.keyboard('[ArrowDown][Enter]')
      await user.keyboard('[ArrowDown][Enter]')

      // Then all items are selected
      expect(getSelectedItem('War and Peace')).toBeInTheDocument()
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')

      expect(getSelectedItem('1984')).toBeInTheDocument()
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')

      expect(getSelectedItem('Pride and Prejudice')).toBeInTheDocument()
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })

    it('should be able to unselect a selected item', async () => {
      const user = userEvent.setup()

      // Given a combobox with no selected value yet
      render(
        <Combobox multiple>
          <Combobox.Trigger>
            <Combobox.SelectedItems />
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
      )

      // When the user select an item
      await user.click(getInput('Book'))
      await user.click(getItem('1984'))

      // Then selected item chip is displayed
      expect(getSelectedItem('1984')).toBeInTheDocument()
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')

      // When the user unselect that item
      await user.click(getItem('1984'))

      // Then chip has been removed and item is unselected
      expect(getSelectedItem('1984')).not.toBeInTheDocument()
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
    })

    it('should clear using clearButton', async () => {
      const user = userEvent.setup()

      // Given a combobox that allows custom value and has a selected item
      render(
        <Combobox multiple allowCustomValue defaultValue={['book-1', 'book-2']} filtering="none">
          <Combobox.Trigger>
            <Combobox.SelectedItems />
            <Combobox.Input aria-label="Book" placeholder="Pick a book" />
            <Combobox.ClearButton aria-label="Clear input" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // When the user type "pri" to filter first item matching, then select it
      await user.click(getInput('Book'))
      await user.keyboard('{p}{r}{i}')

      // Then the input has the typed value and item is still selected
      expect(screen.getByDisplayValue('pri')).toBeInTheDocument()
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')

      // When the user clicks the clear button
      await user.click(getClearButton('Clear input'))

      // Then input value has been cleared and all items have been unselected
      expect(screen.getByDisplayValue('')).toBeInTheDocument()
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'false')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
    })

    it('should focus on last selected item chip from input', async () => {
      const user = userEvent.setup()

      // Given a combobox with two selected items
      render(
        <Combobox multiple defaultValue={['book-1', 'book-2']}>
          <Combobox.Trigger>
            <Combobox.SelectedItems />
            <Combobox.Input aria-label="Book" placeholder="Pick a book" />
            <Combobox.ClearButton aria-label="Clear input" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // When the user focuses the input
      await user.click(getInput('Book'))

      // Then the input is focused
      expect(getInput('Book')).toHaveFocus()

      // When the user use ArrowLeft
      await user.keyboard('[ArrowLeft]')

      // Then the last selected item chip is focused
      expect(getSelectedItem('1984')).toHaveFocus()
    })

    it('should remove selected item from chip using the keyboard (delete)', async () => {
      const user = userEvent.setup()

      // Given a combobox with two selected items
      render(
        <Combobox multiple defaultValue={['book-1', 'book-2']}>
          <Combobox.Trigger>
            <Combobox.SelectedItems />
            <Combobox.Input aria-label="Book" placeholder="Pick a book" />
            <Combobox.ClearButton aria-label="Clear input" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // When the user focuses the input
      await user.click(getInput('Book'))

      // Then the input is focused
      expect(getInput('Book')).toHaveFocus()

      // When the user use ArrowLeft then Delete to focus the last selected item chip and remove it
      await user.keyboard('[ArrowLeft][Delete]')

      // Then the focus is moved to the input and item is unselected
      expect(getInput('Book')).toHaveFocus()
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
    })

    it('should remove selected item from chip using the keyboard (backspace)', async () => {
      const user = userEvent.setup()

      // Given a combobox with two selected items
      render(
        <Combobox multiple defaultValue={['book-1', 'book-2']}>
          <Combobox.Trigger>
            <Combobox.SelectedItems />
            <Combobox.Input aria-label="Book" placeholder="Pick a book" />
            <Combobox.ClearButton aria-label="Clear input" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // When the user focuses the input
      await user.click(getInput('Book'))

      // Then the input is focused
      expect(getInput('Book')).toHaveFocus()

      // When the user use ArrowLeft then BackSpace to focus the last selected item chip and remove it
      await user.keyboard('[ArrowLeft][BackSpace]')

      // Then the focus is moved to the previous chip instead of the input
      expect(getSelectedItem('War and Peace')).toHaveFocus()
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
    })

    it('should remove selected item from chip using the mouse', async () => {
      const user = userEvent.setup()

      // Given a combobox with two selected items
      render(
        <Combobox multiple defaultValue={['book-1', 'book-2']}>
          <Combobox.Trigger>
            <Combobox.SelectedItems />
            <Combobox.Input aria-label="Book" placeholder="Pick a book" />
            <Combobox.ClearButton aria-label="Clear input" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'true')

      // When the user clicks the delete button of the last selected item
      await user.click(getSelectedItemClearButton('1984'))

      // Then the focus is moved to the input and item has been unselected
      expect(getInput('Book')).toHaveFocus()
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')
      expect(getItem('1984')).toHaveAttribute('aria-selected', 'false')
    })

    it('should focus the input when clicking on a selected item chip', async () => {
      const user = userEvent.setup()

      // Given a combobox with two selected items
      render(
        <Combobox multiple defaultValue={['book-1', 'book-2']}>
          <Combobox.Trigger>
            <Combobox.SelectedItems />
            <Combobox.Input aria-label="Book" placeholder="Pick a book" />
            <Combobox.ClearButton aria-label="Clear input" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // When the user clicks the delete button of the last selected item
      await user.click(getSelectedItem('1984'))

      // Then the focus is moved to the input and item has been unselected
      expect(getInput('Book')).toHaveFocus()
    })

    it('should update value in controlled mode', async () => {
      const user = userEvent.setup()

      // Given we control value by outside state and selected value
      const ControlledImplementation = () => {
        const [value, setValue] = useState(['book-1'])

        return (
          <Combobox multiple value={value} onValueChange={setValue} filtering="none">
            <Combobox.Trigger>
              <Combobox.SelectedItems />
              <Combobox.Input aria-label="Book" />
            </Combobox.Trigger>
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
      expect(getSelectedItem('War and Peace')).toBeInTheDocument()

      expect(screen.getByDisplayValue('')).toBeInTheDocument()

      // when the user select another item
      await user.click(getInput('Book'))
      await user.click(getItem('Pride and Prejudice'))

      // Then the selected values have been updated and input remain empty
      expect(screen.getByDisplayValue('')).toBeInTheDocument()

      expect(getSelectedItem('War and Peace')).toBeInTheDocument()
      expect(getItem('War and Peace')).toHaveAttribute('aria-selected', 'true')

      expect(getSelectedItem('Pride and Prejudice')).toBeInTheDocument()
      expect(getItem('Pride and Prejudice')).toHaveAttribute('aria-selected', 'true')
    })

    describe('blur behaviour', () => {
      it('should not clear input value when custom value is allowed', async () => {
        const user = userEvent.setup()

        // Given a combobox that allows custom input value
        render(
          <Combobox multiple allowCustomValue>
            <Combobox.Trigger>
              <Combobox.SelectedItems />
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
        )

        // When the user type "pri" in the input
        await user.click(getInput('Book'))
        await user.keyboard('{p}{r}{i}')

        // When the user focus leaves the input
        await user.click(document.body)

        // Then input value is preserved as custom values are allowed
        expect(screen.getByDisplayValue('pri')).toBeInTheDocument()
      })

      it('should clear input value if custom value is not allowed', async () => {
        const user = userEvent.setup()

        // Given a combobox that does not allow custom input value
        render(
          <Combobox multiple allowCustomValue={false}>
            <Combobox.Trigger>
              <Combobox.SelectedItems />
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
        )

        // Then placeholder should be displayed
        expect(getInput('Book').getAttribute('placeholder')).toBe('Pick a book')

        // When the user type "pri" to filter first item matching, then select it
        await user.click(getInput('Book'))
        await user.keyboard('{p}{r}{i}')

        // When the user focus leaves the input
        await user.click(document.body)

        // Then input value has been cleared
        expect(screen.getByDisplayValue('')).toBeInTheDocument()
      })
    })
  })
})
