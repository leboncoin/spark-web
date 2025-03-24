import { Button } from '@spark-ui/components/button'
import { Combobox } from '@spark-ui/components/combobox'
import { Dialog } from '@spark-ui/components/dialog'
import { FormField } from '@spark-ui/components/form-field'
import React from 'react'

export function ComboboxWithinDialog() {
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
                <Combobox>
                  <Combobox.Trigger>
                    <Combobox.Input aria-label="Book" placeholder="Pick a book" />
                    <Combobox.ClearButton aria-label="Clear input" />
                    <Combobox.Disclosure closedLabel="Open popup" openedLabel="Close popup" />
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
