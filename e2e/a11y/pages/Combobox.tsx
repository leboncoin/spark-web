import { PenOutline } from '@spark-ui/icons/PenOutline'
import { Combobox } from '@spark-ui/components/combobox'
import React from 'react'

export const A11yCombobox = () => (
  <section>
    <div>
      <Combobox defaultOpen>
        <Combobox.Trigger>
          <Combobox.LeadingIcon>
            <PenOutline />
          </Combobox.LeadingIcon>
          <Combobox.Input aria-label="Book" placeholder="Pick a book" />
          <Combobox.ClearButton aria-label="Clear input" />
          <Combobox.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
        </Combobox.Trigger>

        <Combobox.Popover>
          <Combobox.Items>
            <Combobox.Empty>No results found</Combobox.Empty>
            <Combobox.Item value="book-1">To Kill a Mockingbird</Combobox.Item>
            <Combobox.Item value="book-2">War and Peace</Combobox.Item>
            <Combobox.Item value="book-3">The Idiot</Combobox.Item>
            <Combobox.Item value="book-4">A Picture of Dorian Gray</Combobox.Item>
            <Combobox.Item value="book-5">1984</Combobox.Item>
            <Combobox.Item value="book-6">Pride and Prejudice</Combobox.Item>
          </Combobox.Items>
        </Combobox.Popover>
      </Combobox>
    </div>

    <div>
      <Combobox defaultOpen multiple defaultValue={['book-1', 'book-2']}>
        <Combobox.Trigger>
          <Combobox.LeadingIcon>
            <PenOutline />
          </Combobox.LeadingIcon>
          <Combobox.SelectedItems />
          <Combobox.Input aria-label="Book" placeholder="Pick a book" />
          <Combobox.ClearButton aria-label="Clear input" />
          <Combobox.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
        </Combobox.Trigger>

        <Combobox.Popover>
          <Combobox.Items>
            <Combobox.Empty>No results found</Combobox.Empty>
            <Combobox.Item value="book-1">To Kill a Mockingbird</Combobox.Item>
            <Combobox.Item value="book-2">War and Peace</Combobox.Item>
            <Combobox.Item value="book-3">The Idiot</Combobox.Item>
            <Combobox.Item value="book-4">A Picture of Dorian Gray</Combobox.Item>
            <Combobox.Item value="book-5">1984</Combobox.Item>
            <Combobox.Item value="book-6">
              Pride and Prejudice but it is an extremely long title
            </Combobox.Item>
          </Combobox.Items>
        </Combobox.Popover>
      </Combobox>
    </div>
  </section>
)
