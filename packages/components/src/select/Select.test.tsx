import { BookmarkFill } from '@spark-ui/icons/BookmarkFill'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vitest } from 'vitest'

import { FormField } from '../form-field'
import { Select } from '.'

const getSelect = (accessibleName: string) => {
  return screen.getByRole('combobox', { name: accessibleName })
}

const getFakeTrigger = () => {
  return screen.getByRole('presentation')
}

const getItemsGroup = (accessibleName: string) => {
  return screen.getByRole('group', { name: accessibleName })
}

const getItem = (accessibleName: string) => {
  return screen.getByRole('option', { name: accessibleName })
}

describe('Select', () => {
  it('should render select and list of items', () => {
    render(
      <Select>
        <Select.Trigger aria-label="Book">
          <Select.LeadingIcon>
            <BookmarkFill />
          </Select.LeadingIcon>
          <Select.Value placeholder="Pick a book" />
        </Select.Trigger>

        <Select.Items>
          <Select.Item value="book-1">War and Peace</Select.Item>
          <Select.Item value="book-2">1984</Select.Item>
          <Select.Item value="book-3">Pride and Prejudice</Select.Item>
        </Select.Items>
      </Select>
    )

    expect(getSelect('Book')).toBeInTheDocument()

    expect(getItem('War and Peace')).toBeInTheDocument()
    expect(getItem('1984')).toBeInTheDocument()
    expect(getItem('Pride and Prejudice')).toBeInTheDocument()
  })

  describe('Select.Group', () => {
    it('should link items groups with their label', () => {
      // Given a Select with items groups and group labels
      render(
        <Select>
          <Select.Trigger aria-label="Book">
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Group>
              <Select.Label>Best-sellers</Select.Label>
              <Select.Item value="book-1">War and Peace</Select.Item>
              <Select.Item value="book-2">1984</Select.Item>
            </Select.Group>

            <Select.Group>
              <Select.Label>Novelties</Select.Label>
              <Select.Item value="book-3">Pride and Prejudice</Select.Item>
              <Select.Item value="book-4">Pride and Prejudice</Select.Item>
            </Select.Group>
          </Select.Items>
        </Select>
      )

      // Then each group have an accessible label
      expect(getItemsGroup('Best-sellers')).toBeInTheDocument()
      expect(getItemsGroup('Novelties')).toBeInTheDocument()
    })
  })

  describe('Select.Value', () => {
    it('should display custom value after selection', async () => {
      const user = userEvent.setup()

      // Given a Select with no selected value yet
      render(
        <Select>
          <Select.Trigger aria-label="Book">
            <Select.Value placeholder="Pick a book">You have selected a book</Select.Value>
          </Select.Trigger>

          <Select.Items>
            <Select.Placeholder>--Pick a book--</Select.Placeholder>
            <Select.Item value="book-1">War and Peace</Select.Item>
            <Select.Item value="book-2">1984</Select.Item>
            <Select.Item value="book-3">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      )

      // Then placeholder should be displayed
      expect(getFakeTrigger()).toHaveTextContent('Pick a book')

      // When the user select an item
      await user.selectOptions(getSelect('Book'), 'Pride and Prejudice')

      // Then placeholder is replaced by a custom value
      expect(getFakeTrigger()).toHaveTextContent('You have selected a book')
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
            <button
              onClick={() => {
                setBookText(updatedSelectedItemText)
              }}
            >
              Update book name
            </button>

            <Select value={value} onValueChange={setValue}>
              <Select.Trigger aria-label="Book">
                <Select.Value placeholder="Pick a book" />
              </Select.Trigger>

              <Select.Items>
                <Select.Placeholder>--Pick a book--</Select.Placeholder>
                <Select.Item value="book-1">{bookText}</Select.Item>
                <Select.Item value="book-2">War and Peace</Select.Item>
                <Select.Item value="book-3">The Idiot</Select.Item>
              </Select.Items>
            </Select>
          </div>
        )
      }

      render(<Implementation />)

      // Then placeholder should be displayed
      expect(getFakeTrigger()).toHaveTextContent(initialSelectedItemText)

      await user.click(screen.getByText('Update book name'))

      // Then placeholder text should be updated
      expect(getFakeTrigger()).toHaveTextContent(updatedSelectedItemText)
    })
  })

  describe('statuses (combined with FormField', () => {
    it('should render error message when field is in error', () => {
      render(
        <FormField state="error">
          <FormField.Label>Book</FormField.Label>
          <Select>
            <Select.Trigger>
              <Select.Value placeholder="Pick a book" />
            </Select.Trigger>

            <Select.Items>
              <Select.Placeholder>--Pick a book--</Select.Placeholder>
              <Select.Item value="book-1">War and Peace</Select.Item>
              <Select.Item value="book-2">1984</Select.Item>
              <Select.Item value="book-3">Pride and Prejudice</Select.Item>
            </Select.Items>
          </Select>
          <FormField.ErrorMessage>You forgot to select a book</FormField.ErrorMessage>
        </FormField>
      )

      expect(getSelect('Book')).toBeInTheDocument()

      expect(screen.getByText('You forgot to select a book')).toBeInTheDocument()
    })
  })

  describe('usage with FormField', () => {
    it('should associate label and select element correctly', async () => {
      const user = userEvent.setup()

      render(
        <FormField>
          <FormField.Label>Book</FormField.Label>
          <Select>
            <Select.Trigger>
              <Select.Value placeholder="Pick a book" />
            </Select.Trigger>

            <Select.Items>
              <Select.Placeholder>--Pick a book--</Select.Placeholder>
              <Select.Item value="book-1">War and Peace</Select.Item>
            </Select.Items>
          </Select>
          <FormField.ErrorMessage>You forgot to select a book</FormField.ErrorMessage>
        </FormField>
      )

      await user.click(screen.getByText('Book'))
      expect(getSelect('Book')).toHaveFocus()
    })
  })

  describe('single selection', () => {
    it('should select item', async () => {
      const user = userEvent.setup()

      // Given a Select with no selected value yet
      render(
        <Select>
          <Select.Trigger aria-label="Book">
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Placeholder>--Pick a book--</Select.Placeholder>
            <Select.Item value="book-1">War and Peace</Select.Item>
            <Select.Item value="book-2">1984</Select.Item>
            <Select.Item value="book-3">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      )

      // Then placeholder should be displayed
      expect(getFakeTrigger()).toHaveTextContent('Pick a book')

      // When the user select an item
      await user.selectOptions(getSelect('Book'), 'Pride and Prejudice')

      // Then placeholder is replaced by the selected value
      expect(getFakeTrigger()).toHaveTextContent('Pride and Prejudice')

      // Then the proper item is selected
      expect(screen.queryByDisplayValue('War and Peace')).not.toBeInTheDocument()
      expect(screen.queryByDisplayValue('1984')).not.toBeInTheDocument()
      expect(screen.getByDisplayValue('Pride and Prejudice')).toBeInTheDocument()
    })

    it('should render default selected option', () => {
      // Given a Select with a default selected value
      render(
        <Select defaultValue="book-2">
          <Select.Trigger aria-label="Book">
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Placeholder>--Pick a book--</Select.Placeholder>
            <Select.Item value="book-1">War and Peace</Select.Item>
            <Select.Item value="book-2">1984</Select.Item>
            <Select.Item value="book-3">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      )

      // Then the corresponding item is selected
      expect(screen.getByDisplayValue('1984')).toBeInTheDocument()
    })

    it('should control value', async () => {
      const user = userEvent.setup()

      // Given we control value by outside state and selected value
      const ControlledImplementation = () => {
        const [value, setValue] = useState('book-1')

        return (
          <Select value={value} onValueChange={setValue}>
            <Select.Trigger aria-label="Book">
              <Select.Value placeholder="Pick a book" />
            </Select.Trigger>

            <Select.Items>
              <Select.Placeholder>--Pick a book--</Select.Placeholder>
              <Select.Item value="book-1">War and Peace</Select.Item>
              <Select.Item value="book-2">1984</Select.Item>
              <Select.Item value="book-3">Pride and Prejudice</Select.Item>
            </Select.Items>
          </Select>
        )
      }

      render(<ControlledImplementation />)

      expect(screen.getByDisplayValue('War and Peace')).toBeInTheDocument()

      expect(getFakeTrigger()).toHaveTextContent('War and Peace')

      // when the user select another item
      await user.selectOptions(getSelect('Book'), 'Pride and Prejudice')

      // Then the selected value has been updated
      expect(getFakeTrigger()).toHaveTextContent('Pride and Prejudice')
    })
  })

  describe('onValueChange', () => {
    beforeEach(vitest.clearAllMocks)

    const onValueChangeSpy = vitest.fn()

    const ControlledImplementation = () => {
      const [value, setValue] = useState('book-1')

      return (
        <Select
          value={value}
          onValueChange={newValue => {
            setValue(newValue)
            onValueChangeSpy()
          }}
        >
          <Select.Trigger aria-label="Book">
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Placeholder>--Pick a book--</Select.Placeholder>
            <Select.Item value="book-1">War and Peace</Select.Item>
            <Select.Item value="book-2">1984</Select.Item>
            <Select.Item value="book-3">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      )
    }

    it('should only call the onValueChange prop once when value changes', async () => {
      const user = userEvent.setup()

      render(<ControlledImplementation />)

      await user.selectOptions(getSelect('Book'), 'Pride and Prejudice')
      expect(onValueChangeSpy).toHaveBeenCalledTimes(1)
    })

    it('should only call the onValueChange prop when value changes', async () => {
      render(<ControlledImplementation />)

      expect(onValueChangeSpy).not.toHaveBeenCalled()
    })
  })
})
