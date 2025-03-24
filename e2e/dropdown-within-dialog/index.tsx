import { Button } from '@spark-ui/components/button'
import { Dropdown } from '@spark-ui/components/dropdown'
import { Dialog } from '@spark-ui/components/dialog'
import { FormField } from '@spark-ui/components/form-field'
import React from 'react'

export function DropdownWithinDialog() {
  const [open, setOpen] = React.useState(false)
  const [buttonText, setButtonText] = React.useState('hello')

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <div className="gap-y-3xl p-lg grid h-full place-items-center">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <Button>Create account</Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay />

          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create account</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body className="gap-lg flex flex-col">
              <FormField name="books">
                <FormField.Label className="text-body-2">books</FormField.Label>
                <Dropdown>
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
              </FormField>
              <Button onClick={() => setButtonText('clicked')}>{buttonText}</Button>
            </Dialog.Body>

            <Dialog.CloseButton aria-label="Close dialog" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </div>
  )
}
