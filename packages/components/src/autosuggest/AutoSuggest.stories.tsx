/* eslint-disable max-lines */
// import { Button } from '../button'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { Search } from '@spark-ui/icons/Search'
import { Meta, StoryFn } from '@storybook/react'
import { ComponentProps, useState } from 'react'

import { Button } from '../button'
import { Chip } from '../chip'
import { Dialog } from '../dialog'
import { FormField } from '../form-field'
import { Icon } from '../icon'
import { Input } from '../input'
import { RadioGroup } from '../radio-group'
import { Switch } from '../switch'
import { Tag } from '../tag'
import { VisuallyHidden } from '../visually-hidden'
import { Select } from '../select'
import { AutoSuggest } from '.'

const meta: Meta<typeof AutoSuggest> = {
  title: 'Components/AutoSuggest',
  component: AutoSuggest,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=28629-4001&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => {
  const books = [
    { value: 'book-1', name: 'To Kill a Mockingbird' },
    { value: 'book-2', name: 'War and Peace' },
    { value: 'book-3', name: 'The Idiot', disabled: true },
    { value: 'book-4', name: 'A Picture of Dorian Gray' },
    { value: 'book-5', name: '1984' },
    { value: 'book-6', name: 'Pride and Prejudice' },
  ]

  const [selectedBook, setSelectedBook] = useState(books[0])
  const [query, setQuery] = useState('')

  // Controlled props state
  const [filtering, setFiltering] = useState(true)

  const filteredBooks =
    query === '' || !filtering
      ? books
      : books.filter(books => {
          return books.name.toLowerCase().includes(query.toLowerCase())
        })

  const handleChange = (value: unknown) => {
    setSelectedBook(value)
  }

  const handleFilteringChange = (value: string) => {
    setFiltering(value !== 'no-filtering')
  }

  return (
    <div className="pb-[300px]">
      <Select
        name="book"
        value={filtering ? 'filtering' : 'no-filtering'}
        onValueChange={handleFilteringChange}
      >
        <Select.Trigger aria-label="Book">
          <Select.Value placeholder="Pick a book" />
        </Select.Trigger>

        <Select.Items>
          <Select.Item value="no-filtering">No filtering</Select.Item>
          <Select.Item value="filtering">Filtering</Select.Item>
        </Select.Items>
      </Select>

      <p>Filter query: {query}</p>

      <AutoSuggest
        autoHighlight="match"
        selectOnBlur
        value={selectedBook}
        onValueChange={handleChange}
        onOpenChange={isOpen => {
          if (!isOpen) {
            setQuery('')
          }
        }}
        getValueText={book => book?.name}
      >
        <AutoSuggest.Trigger>
          <AutoSuggest.LeadingIcon>
            <PenOutline />
          </AutoSuggest.LeadingIcon>
          <AutoSuggest.Input
            aria-label="Book"
            placeholder="Pick a book"
            onValueChange={value => {
              console.log('SET OUTSIDE QUERY', value)
              setQuery(value)
            }}
          />
          <AutoSuggest.ClearButton aria-label="Clear input" />
          <AutoSuggest.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
        </AutoSuggest.Trigger>

        <AutoSuggest.Popover>
          <AutoSuggest.Items>
            <AutoSuggest.Empty>No results found</AutoSuggest.Empty>
            {filteredBooks.map(book => (
              <AutoSuggest.Item value={book} disabled={book.disabled}>
                {book.name}
              </AutoSuggest.Item>
            ))}
          </AutoSuggest.Items>
        </AutoSuggest.Popover>
      </AutoSuggest>
    </div>
  )
}
