/* eslint-disable max-lines */
// import { Button } from '../button'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { Search } from '@spark-ui/icons/Search'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Button } from '../button'
import { Chip } from '../chip'
import { Dialog } from '../dialog'
// import { FormField } from '../form-field'
import { Icon } from '../icon'
// import { Input } from '../input'
// import { RadioGroup } from '../radio-group'
// import { Select } from '../select'
import { Switch } from '../switch'
import { Tag } from '../tag'
// import { VisuallyHidden } from '../visually-hidden'
import { AutoComplete } from '.'

const meta: Meta<typeof AutoComplete> = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
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

  const [autoHighlight, setAutoHighlight] = useState(true)
  const [selectOnBlur, setSelectOnBlur] = useState(true)

  return (
    <div className="gap-md flex flex-col pb-[300px]">
      <div className="gap-md flex">
        <Switch id="auto-highlight" checked={autoHighlight} onCheckedChange={setAutoHighlight}>
          Auto highlight
        </Switch>
        <Switch id="select-on-blur" checked={selectOnBlur} onCheckedChange={setSelectOnBlur}>
          Select on blur
        </Switch>
      </div>
      <AutoComplete
        defaultValue="book-1"
        autoHighlight={autoHighlight ? 'match' : 'none'}
        selectOnBlur={selectOnBlur}
      >
        <AutoComplete.Trigger>
          <AutoComplete.LeadingIcon>
            <PenOutline />
          </AutoComplete.LeadingIcon>
          <AutoComplete.Input aria-label="Book" placeholder="Pick a book" />
          <AutoComplete.ClearButton aria-label="Clear input" />
          <AutoComplete.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
        </AutoComplete.Trigger>

        <AutoComplete.Popover>
          <AutoComplete.Items>
            <AutoComplete.Empty>No results found</AutoComplete.Empty>
            {books.map(book => (
              <AutoComplete.Item value={book.value} disabled={book.disabled}>
                <AutoComplete.ItemIndicator />
                <AutoComplete.ItemText>{book.name}</AutoComplete.ItemText>
              </AutoComplete.Item>
            ))}
          </AutoComplete.Items>
        </AutoComplete.Popover>
      </AutoComplete>
    </div>
  )
}

export const Controlled: StoryFn = _args => {
  interface Book {
    value: string
    name: string
    disabled?: boolean
  }

  const books: Book[] = [
    { value: 'book-1', name: 'To Kill a Mockingbird' },
    { value: 'book-2', name: 'War and Peace' },
    { value: 'book-3', name: 'The Idiot', disabled: true },
    { value: 'book-4', name: 'A Picture of Dorian Gray' },
    { value: 'book-5', name: '1984' },
    { value: 'book-6', name: 'Pride and Prejudice' },
  ]

  const [open, setOpen] = useState(false)
  const [onOpenChangeCalls, setOnOpenChangeCalls] = useState(0)

  const [value, setValue] = useState<string | null>('book-2')
  const [onValueChangeCalls, setOnValueChangeCalls] = useState(0)

  const selectedBook = books.find(book => book.value === value)

  return (
    <div className="gap-md flex flex-col pb-[300px]">
      <div className="gap-md flex">
        <Tag>Open: {open ? 'true' : 'false'}</Tag>
        <Tag>Selected: {selectedBook?.name || 'null'}</Tag>
        <Tag>onOpenChange calls: {onOpenChangeCalls}</Tag>
        <Tag>onValueChange calls: {onValueChangeCalls}</Tag>
      </div>

      <AutoComplete
        autoHighlight="match"
        selectOnBlur
        open={open}
        onOpenChange={value => {
          setOpen(value)
          setOnOpenChangeCalls(onOpenChangeCalls + 1)
        }}
        value={value}
        onValueChange={value => {
          setValue(value)
          setOnValueChangeCalls(onValueChangeCalls + 1)
        }}
      >
        <AutoComplete.Trigger>
          <AutoComplete.LeadingIcon>
            <PenOutline />
          </AutoComplete.LeadingIcon>
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
    </div>
  )
}

export const CustomItem: StoryFn = _args => {
  const books = [
    { value: 'book-1', name: 'To Kill a Mockingbird' },
    { value: 'book-2', name: 'War and Peace' },
    { value: 'book-3', name: 'The Idiot', disabled: true },
    { value: 'book-4', name: 'A Picture of Dorian Gray' },
    { value: 'book-5', name: '1984' },
    { value: 'book-6', name: 'Pride and Prejudice' },
  ]

  return (
    <div className="gap-md flex flex-col pb-[300px]">
      <AutoComplete>
        <AutoComplete.Trigger>
          <AutoComplete.LeadingIcon>
            <PenOutline />
          </AutoComplete.LeadingIcon>
          <AutoComplete.Input aria-label="Book" placeholder="Pick a book" />
          <AutoComplete.ClearButton aria-label="Clear input" />
          <AutoComplete.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
        </AutoComplete.Trigger>

        <AutoComplete.Popover>
          <AutoComplete.Items>
            <AutoComplete.Empty>No results found</AutoComplete.Empty>
            {books.map(book => (
              <AutoComplete.Item
                value={book.value}
                disabled={book.disabled}
                className="gap-md flex"
              >
                <AutoComplete.ItemText>{book.name}</AutoComplete.ItemText>
                <Tag>New</Tag>
              </AutoComplete.Item>
            ))}
          </AutoComplete.Items>
        </AutoComplete.Popover>
      </AutoComplete>
    </div>
  )
}

export const CustomDialog: StoryFn = () => {
  const books = [
    { value: '1', name: 'Things Fall Apart' },
    { value: '2', name: 'The Catcher in the Rye' },
    { value: '3', name: 'The Great Gatsby' },
    { value: '4', name: 'Fairy tales' },
    { value: '5', name: 'The Hobbit' },
    { value: '6', name: 'The Lord of the Rings' },
    { value: '7', name: 'And Then There Were None' },
    { value: '8', name: 'The Da Vinci Code' },
    { value: '9', name: 'The Alchemist' },
    { value: '10', name: 'The Epic Of Gilgamesh' },
    { value: '11', name: 'The Book Thief' },
    { value: '12', name: 'The Little Prince' },
    { value: '13', name: 'The Book Of Job' },
    { value: '14', name: 'The Grapes Of Wrath' },
    { value: '15', name: 'Pride and Prejudice' },
    { value: '16', name: 'The Odyssey' },
    { value: '17', name: 'One Hundred Years of Solitude' },
    { value: '18', name: 'Crime and Punishment' },
    { value: '19', name: 'Gypsy Ballads' },
    { value: '20', name: 'Love in the Time of Cholera' },
    { value: '21', name: 'Hunger' },
    { value: '22', name: 'The Old Man and the Sea' },
    { value: '23', name: 'To Kill a Mockingbird' },
    { value: '24', name: 'War and Peace' },
    { value: '25', name: 'The Idiot' },
    { value: '26', name: 'Scaramouche' },
    { value: '27', name: 'A Picture of Dorian Gray' },
    { value: '28', name: '1984' },
  ] as const

  const [value, setValue] = useState<string | null>('4')
  const [inputValue, setInputValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const selectedBook = books.find(book => book.value === value)

  return (
    <div className="m-sm border-sm from-main to-support-variant text-surface flex h-[600px] w-full items-center justify-center border-dashed bg-linear-to-br">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {selectedBook ? (
          <Chip
            intent="surface"
            onClear={() => {
              setValue(null)
              setInputValue('')
            }}
            onClick={() => {
              setIsOpen(true)
            }}
          >
            <Chip.Content>{selectedBook?.name}</Chip.Content>
            <Chip.ClearButton label={'Clear'} />
          </Chip>
        ) : (
          <Button design="outlined" intent="surface" onClick={() => setIsOpen(true)}>
            <span>Search a book...</span>
            <Icon size="sm">
              <Search />
            </Icon>
          </Button>
        )}
        <Dialog.Overlay />
        <Dialog.Portal>
          <Dialog.Content size="sm">
            <AutoComplete
              onValueChange={book => {
                setValue(book)
                setIsOpen(false)
              }}
              value={value}
            >
              <Dialog.Header>
                <AutoComplete.Trigger>
                  <AutoComplete.Input
                    aria-label="Book"
                    value={inputValue}
                    onValueChange={setInputValue}
                    placeholder="Pick a book"
                  />
                  <AutoComplete.ClearButton aria-label={'Clear input'} />
                </AutoComplete.Trigger>
              </Dialog.Header>

              <Dialog.Body>
                <AutoComplete.Items>
                  <AutoComplete.Empty>No results found</AutoComplete.Empty>
                  {books.map(book => (
                    <AutoComplete.Item key={book.value} value={book.value}>
                      {book.name}
                    </AutoComplete.Item>
                  ))}
                </AutoComplete.Items>
              </Dialog.Body>
            </AutoComplete>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </div>
  )
}

export const Disabled: StoryFn = _args => {
  const books = [
    { value: 'book-1', name: 'To Kill a Mockingbird' },
    { value: 'book-2', name: 'War and Peace' },
    { value: 'book-3', name: 'The Idiot', disabled: true },
    { value: 'book-4', name: 'A Picture of Dorian Gray' },
    { value: 'book-5', name: '1984' },
    { value: 'book-6', name: 'Pride and Prejudice' },
  ]

  return (
    <div className="gap-lg flex flex-col">
      <div>
        <Tag className="mb-md">disabled</Tag>
        <AutoComplete disabled>
          <AutoComplete.Trigger>
            <AutoComplete.LeadingIcon>
              <PenOutline />
            </AutoComplete.LeadingIcon>
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
      </div>

      <div>
        <Tag className="mb-md">readOnly</Tag>
        <AutoComplete readOnly defaultValue="book-1">
          <AutoComplete.Trigger>
            <AutoComplete.LeadingIcon>
              <PenOutline />
            </AutoComplete.LeadingIcon>
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
      </div>
    </div>
  )
}

export const Filtering: StoryFn = _args => {
  const books = [
    { value: 'book-1', name: 'To Kill a Mockingbird' },
    { value: 'book-2', name: 'War and Peace' },
    { value: 'book-3', name: 'The Idiot', disabled: true },
    { value: 'book-4', name: 'A Picture of Dorian Gray' },
    { value: 'book-5', name: '1984' },
    { value: 'book-6', name: 'Pride and Prejudice' },
  ]

  const [selectedBook, setSelectedBook] = useState(null)
  const [query, setQuery] = useState('')

  const filteredBooks = books.filter(books => {
    return books.name.toLowerCase().includes(query.toLowerCase())
  })

  const handleChange = (value: unknown) => {
    setSelectedBook(value)
  }

  return (
    <div className="pb-[300px]">
      <p>Query: {query}</p>
      <AutoComplete
        value={selectedBook}
        onValueChange={handleChange}
        onOpenChange={isOpen => {
          if (!isOpen) {
            setQuery('') // reset filtering when the popup is closed
          }
        }}
      >
        <AutoComplete.Trigger>
          <AutoComplete.LeadingIcon>
            <PenOutline />
          </AutoComplete.LeadingIcon>
          <AutoComplete.Input
            aria-label="Book"
            placeholder="Pick a book"
            onValueChange={setQuery}
          />
          <AutoComplete.ClearButton aria-label="Clear input" />
          <AutoComplete.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
        </AutoComplete.Trigger>

        <AutoComplete.Popover>
          <AutoComplete.Items>
            <AutoComplete.Empty>No results found</AutoComplete.Empty>
            {filteredBooks.map(book => (
              <AutoComplete.Item value={book.value} disabled={book.disabled}>
                {book.name}
              </AutoComplete.Item>
            ))}
          </AutoComplete.Items>
        </AutoComplete.Popover>
      </AutoComplete>
    </div>
  )
}

export const Groups: StoryFn = _args => {
  const [query, setQuery] = useState('')

  const booksGroups = [
    {
      groupName: 'Best-sellers',
      items: [
        { value: 'book-1', name: 'To Kill a Mockingbird' },
        { value: 'book-2', name: 'War and Peace' },
        { value: 'book-3', name: 'The Idiot', disabled: true },
      ],
    },
    {
      groupName: 'Novelties',
      items: [
        { value: 'book-4', name: 'A Picture of Dorian Gray' },
        { value: 'book-5', name: '1984' },
        { value: 'book-6', name: 'Pride and Prejudice' },
      ],
    },
  ]

  return (
    <div className="gap-md flex flex-col pb-[300px]">
      <AutoComplete
        defaultValue="book-1"
        onOpenChange={isOpen => {
          if (!isOpen) {
            setQuery('') // reset filtering when the popup is closed
          }
        }}
      >
        <AutoComplete.Trigger>
          <AutoComplete.LeadingIcon>
            <PenOutline />
          </AutoComplete.LeadingIcon>
          <AutoComplete.Input
            aria-label="Book"
            placeholder="Pick a book"
            onValueChange={setQuery}
          />
          <AutoComplete.ClearButton aria-label="Clear input" />
          <AutoComplete.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
        </AutoComplete.Trigger>

        <AutoComplete.Popover>
          <AutoComplete.Items>
            <AutoComplete.Empty>No results found</AutoComplete.Empty>
            {booksGroups.map(group => (
              <AutoComplete.Group key={group.groupName}>
                <AutoComplete.Label>{group.groupName}</AutoComplete.Label>
                {group.items
                  .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                  .map(item => (
                    <AutoComplete.Item value={item.value} disabled={item.disabled}>
                      <AutoComplete.ItemIndicator />
                      <AutoComplete.ItemText>{item.name}</AutoComplete.ItemText>
                    </AutoComplete.Item>
                  ))}
              </AutoComplete.Group>
            ))}
          </AutoComplete.Items>
        </AutoComplete.Popover>
      </AutoComplete>
    </div>
  )
}
