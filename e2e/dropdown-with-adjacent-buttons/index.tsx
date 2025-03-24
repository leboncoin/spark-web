import { Button } from '@spark-ui/components/button'
import { Dropdown } from '@spark-ui/components/dropdown'
import { FormField } from '@spark-ui/components/form-field'
import React from 'react'

export function DropdownWithAdjacentButtons() {
  const [firstBtnText, setFirstBtnText] = React.useState('hello')
  const [secondBtnText, setSecondBtnText] = React.useState('there')

  return (
    <div style={{ height: '100vh', display: 'grid', alignItems: 'center' }}>
      <div>
        <Button className="my-sm" onClick={() => setFirstBtnText('clicked on first btn')}>
          {firstBtnText}
        </Button>
        <FormField name="books">
          <FormField.Label className="text-body-2">Books</FormField.Label>
          <Dropdown>
            <Dropdown.Trigger aria-label="Book">
              <Dropdown.LeadingIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
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
        </FormField>
        <Button className="my-sm" onClick={() => setSecondBtnText('clicked on second btn')}>
          {secondBtnText}
        </Button>
      </div>
    </div>
  )
}
