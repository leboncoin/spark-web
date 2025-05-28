import { InfoFill } from '@spark-ui/icons/InfoFill'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AutoComplete } from '..'
import { getInput, getItem, getListbox } from './test-utils'
import { useState } from 'react'

describe('AutoComplete', () => {
  it('should render input and list of items', () => {
    const books = [
      { value: 'book-1', name: 'To Kill a Mockingbird' },
      { value: 'book-2', name: 'War and Peace' },
      { value: 'book-3', name: 'The Idiot', disabled: true },
      { value: 'book-4', name: 'A Picture of Dorian Gray' },
      { value: 'book-5', name: '1984' },
      { value: 'book-6', name: 'Pride and Prejudice' },
    ]

    const ControlledImplementation = () => {
      const [selectedBook, setSelectedBook] = useState(books[0])

      return (
        <AutoComplete
          autoHighlight="match"
          selectOnBlur
          value={selectedBook}
          onValueChange={selected => {
            setSelectedBook(selected)
          }}
        >
          <AutoComplete.Trigger>
            <AutoComplete.Input aria-label="Book" placeholder="Pick a book" />
            <AutoComplete.ClearButton aria-label="Clear input" />
            <AutoComplete.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
          </AutoComplete.Trigger>

          <AutoComplete.Popover>
            <AutoComplete.Items>
              <AutoComplete.Empty>No results found</AutoComplete.Empty>
              {books.map(book => (
                <AutoComplete.Item value={book.value} disabled={book.disabled}>
                  {book.name}
                </AutoComplete.Item>
              ))}
            </AutoComplete.Items>
          </AutoComplete.Popover>
        </AutoComplete>
      )
    }

    render(<ControlledImplementation />)

    expect(getInput('Book')).toBeInTheDocument()

    expect(getListbox('Book')).toBeInTheDocument()

    expect(getItem('War and Peace')).toBeInTheDocument()
    expect(getItem('1984')).toBeInTheDocument()
    expect(getItem('Pride and Prejudice')).toBeInTheDocument()
  })
})
