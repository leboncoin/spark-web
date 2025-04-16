import { InfoFill } from '@spark-ui/icons/InfoFill'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AutoSuggest } from '..'
import { getInput, getItem, getListbox } from './test-utils'
import { useState } from 'react'

describe('AutoSuggest', () => {
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
        <AutoSuggest
          autoHighlight="match"
          selectOnBlur
          value={selectedBook}
          onValueChange={selected => {
            setSelectedBook(selected)
          }}
          getValueText={book => book?.name}
        >
          <AutoSuggest.Trigger>
            <AutoSuggest.Input aria-label="Book" placeholder="Pick a book" />
            <AutoSuggest.ClearButton aria-label="Clear input" />
            <AutoSuggest.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
          </AutoSuggest.Trigger>

          <AutoSuggest.Popover>
            <AutoSuggest.Items>
              <AutoSuggest.Empty>No results found</AutoSuggest.Empty>
              {books.map(book => (
                <AutoSuggest.Item value={book} disabled={book.disabled}>
                  {book.name}
                </AutoSuggest.Item>
              ))}
            </AutoSuggest.Items>
          </AutoSuggest.Popover>
        </AutoSuggest>
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
