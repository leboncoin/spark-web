import { BookmarkFill } from '@spark-ui/icons/BookmarkFill'
import { Select } from '@spark-ui/components/select'
import React from 'react'

export const A11ySelect = () => (
  <section>
    <div>
      <Select name="book">
        <Select.Trigger aria-label="Book">
          <Select.LeadingIcon>
            <BookmarkFill />
          </Select.LeadingIcon>
          <Select.Value placeholder="Pick a book" />
        </Select.Trigger>

        <Select.Items>
          <Select.Placeholder>--Pick a book--</Select.Placeholder>
          <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
          <Select.Item value="book-2">War and Peace</Select.Item>
          <Select.Item value="book-3">The Idiot</Select.Item>
          <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
          <Select.Item value="book-5">1984</Select.Item>
          <Select.Item value="book-6">Pride and Prejudice</Select.Item>
        </Select.Items>
      </Select>
    </div>

    <div>
      <Select name="book">
        <Select.Trigger aria-label="Book">
          <Select.Value placeholder="Pick a book" />
        </Select.Trigger>

        <Select.Items>
          <Select.Placeholder>--Pick a book--</Select.Placeholder>
          <Select.Group>
            <Select.Label>Best-sellers</Select.Label>
            <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
            <Select.Item value="book-2">War and Peace</Select.Item>
            <Select.Item value="book-3">The Idiot</Select.Item>
          </Select.Group>

          <Select.Group>
            <Select.Label>Novelties</Select.Label>
            <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
            <Select.Item value="book-5">1984</Select.Item>
            <Select.Item value="book-6">Pride and Prejudice</Select.Item>
          </Select.Group>
        </Select.Items>
      </Select>
    </div>
  </section>
)
