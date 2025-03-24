import { BookmarkFill } from '@spark-ui/icons/BookmarkFill'
import { Dropdown } from '@spark-ui/components/dropdown'
import React from 'react'

export const A11yDropdown = () => (
  <section>
    <div>
      <Dropdown defaultOpen>
        <Dropdown.Trigger aria-label="Book">
          <Dropdown.LeadingIcon>
            <BookmarkFill />
          </Dropdown.LeadingIcon>
          <Dropdown.Value placeholder="Pick a book" />
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="book-1">To Kill a Mockingbird</Dropdown.Item>
            <Dropdown.Item value="book-2">War and Peace</Dropdown.Item>
            <Dropdown.Item value="book-3">The Idiot</Dropdown.Item>
            <Dropdown.Item value="book-4">A Picture of Dorian Gray</Dropdown.Item>
            <Dropdown.Item value="book-5">1984</Dropdown.Item>
            <Dropdown.Item value="book-6">Pride and Prejudice</Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>
    </div>

    <div>
      <Dropdown defaultOpen multiple defaultValue={['book-1', 'book-2']}>
        <Dropdown.Trigger aria-label="Book">
          <Dropdown.Value placeholder="Pick a book" />
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="book-1">To Kill a Mockingbird</Dropdown.Item>
            <Dropdown.Item value="book-2">War and Peace</Dropdown.Item>
            <Dropdown.Item value="book-3">The Idiot</Dropdown.Item>
            <Dropdown.Item value="book-4">A Picture of Dorian Gray</Dropdown.Item>
            <Dropdown.Item value="book-5">1984</Dropdown.Item>
            <Dropdown.Item value="book-6">Pride and Prejudice</Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  </section>
)
