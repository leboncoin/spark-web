/* eslint-disable max-lines */
import { BookmarkFill } from '@spark-ui/icons/BookmarkFill'
import { Meta, StoryFn } from '@storybook/react'
import { ComponentProps, useState } from 'react'

import { Button } from '../button'
import { FormField } from '../form-field'
import { Tag } from '../tag'
import { VisuallyHidden } from '../visually-hidden'
import { Dropdown } from '.'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=46530-8050&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown>
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
  )
}

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState('book-1')

  return (
    <div className="pb-[300px]">
      <Dropdown value={value} onValueChange={setValue}>
        <Dropdown.Trigger aria-label="Book">
          <Dropdown.Value placeholder="Pick a book" />
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="">-- Pick a book --</Dropdown.Item>
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
  )
}

export const ControlledOpenState: StoryFn = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="gap-lg flex flex-col">
      <div className="gap-md flex">
        <Button design="outlined" intent="success" disabled={open} onClick={() => setOpen(true)}>
          Open
        </Button>
        <Button design="outlined" intent="danger" disabled={!open} onClick={() => setOpen(false)}>
          Close
        </Button>
      </div>

      <div className="pb-[300px]">
        <Dropdown open={open} onOpenChange={setOpen}>
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
    </div>
  )
}

export const CustomItem: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown>
        <Dropdown.Trigger aria-label="Book">
          <Dropdown.Value placeholder="Pick a book" />
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="book-1" className="gap-md flex items-center">
              <Dropdown.ItemText>To Kill a Mockingbird</Dropdown.ItemText>
              <Tag>New</Tag>
            </Dropdown.Item>
            <Dropdown.Item value="book-2" className="gap-md flex items-center">
              <Dropdown.ItemText>War and Peace</Dropdown.ItemText>
              <Tag>New</Tag>
            </Dropdown.Item>
            <Dropdown.Item value="book-3" className="gap-md flex items-center">
              <Dropdown.ItemText>The Idiot</Dropdown.ItemText>
              <Tag>New</Tag>
            </Dropdown.Item>
            <Dropdown.Item value="book-4" className="gap-md flex items-center">
              <Dropdown.ItemText>A Picture of Dorian Gray</Dropdown.ItemText>
              <Tag>New</Tag>
            </Dropdown.Item>
            <Dropdown.Item value="book-5" className="gap-md flex items-center">
              <Dropdown.ItemText>1984</Dropdown.ItemText>
              <Tag>New</Tag>
            </Dropdown.Item>
            <Dropdown.Item value="book-6" className="gap-md flex items-center">
              <Dropdown.ItemText>Pride and Prejudice</Dropdown.ItemText>
              <Tag>New</Tag>
            </Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
}

export const Disabled: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown disabled>
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
  )
}

export const ReadOnly: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown readOnly>
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
  )
}

export const DisabledItem: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown>
        <Dropdown.Trigger aria-label="Book">
          <Dropdown.Value placeholder="Pick a book" />
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="book-1">To Kill a Mockingbird</Dropdown.Item>
            <Dropdown.Item value="book-2">War and Peace</Dropdown.Item>
            <Dropdown.Item value="book-3" disabled>
              The Idiot
            </Dropdown.Item>
            <Dropdown.Item value="book-4">A Picture of Dorian Gray</Dropdown.Item>
            <Dropdown.Item value="book-5">1984</Dropdown.Item>
            <Dropdown.Item value="book-6">Pride and Prejudice</Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
}

export const Grouped: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown>
        <Dropdown.Trigger aria-label="Book">
          <Dropdown.Value placeholder="Pick a book" />
        </Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Group>
              <Dropdown.Label>Best-sellers</Dropdown.Label>
              <Dropdown.Item value="book-1">To Kill a Mockingbird</Dropdown.Item>
              <Dropdown.Item value="book-2">War and Peace</Dropdown.Item>
              <Dropdown.Item value="book-3">The Idiot</Dropdown.Item>
            </Dropdown.Group>

            <Dropdown.Divider />

            <Dropdown.Group>
              <Dropdown.Label>Novelties</Dropdown.Label>
              <Dropdown.Item value="book-4">A Picture of Dorian Gray</Dropdown.Item>
              <Dropdown.Item value="book-5">1984</Dropdown.Item>
              <Dropdown.Item value="book-6">Pride and Prejudice</Dropdown.Item>
            </Dropdown.Group>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
}

export const LeadingIcon: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown>
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
  )
}

export const ItemIndicator: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown multiple defaultValue={['book-1', 'book-2']}>
        <Dropdown.Trigger aria-label="Book">
          <Dropdown.Value placeholder="Pick a book" />
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="book-1" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>To Kill a Mockingbird</Dropdown.ItemText>
            </Dropdown.Item>
            <Dropdown.Item value="book-2" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>War and Peace</Dropdown.ItemText>
            </Dropdown.Item>
            <Dropdown.Item value="book-3" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>The Idiot</Dropdown.ItemText>
            </Dropdown.Item>
            <Dropdown.Item value="book-4" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>A Picture of Dorian Gray</Dropdown.ItemText>
            </Dropdown.Item>
            <Dropdown.Item value="book-5" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>1984</Dropdown.ItemText>
            </Dropdown.Item>
            <Dropdown.Item value="book-6" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>Pride and Prejudice</Dropdown.ItemText>
            </Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
}

export const Statuses: StoryFn = () => {
  type Status = ComponentProps<typeof Dropdown>['state']

  const statuses: Status[] = ['error', 'alert', 'success']

  return (
    <div className="gap-lg flex flex-col pb-[300px]">
      {statuses.map(status => {
        return (
          <Dropdown state={status} key={status}>
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
        )
      })}
    </div>
  )
}

export const MultipleSelection: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <Dropdown multiple defaultValue={['book-1', 'book-2']}>
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
  )
}

export const MultipleSelectionControlled: StoryFn = () => {
  const [values, setValues] = useState(['book-1', 'book-2'])

  return (
    <div className="pb-[300px]">
      <Dropdown multiple value={values} onValueChange={setValues}>
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
  )
}

export const FormFieldLabel: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <FormField>
        <FormField.Label>Book</FormField.Label>
        <Dropdown>
          <Dropdown.Trigger>
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
    </div>
  )
}

export const FormFieldHiddenLabel: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <FormField>
        <FormField.Label>
          <VisuallyHidden>Book</VisuallyHidden>
        </FormField.Label>
        <Dropdown>
          <Dropdown.Trigger>
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
    </div>
  )
}

export const FormFieldReadOnly: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <FormField readOnly>
        <FormField.Label>Book</FormField.Label>
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
    </div>
  )
}

export const FormFieldDisabled: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <FormField disabled>
        <FormField.Label>Book</FormField.Label>
        <Dropdown>
          <Dropdown.Trigger>
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
    </div>
  )
}

export const FormFieldRequired: StoryFn = _args => {
  return (
    <div className="pb-[300px]">
      <FormField isRequired>
        <FormField.Label>Book</FormField.Label>
        <Dropdown>
          <Dropdown.Trigger>
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
    </div>
  )
}

export const FormFieldValidation: StoryFn = () => {
  const [state, setState] = useState<undefined | 'success' | 'alert' | 'error'>('error')

  return (
    <div className="pb-[300px]">
      <FormField state={state}>
        <FormField.Label>Statuses</FormField.Label>
        <Dropdown
          onValueChange={value => {
            setState(value === 'default' ? undefined : (value as 'success' | 'alert' | 'error'))
          }}
        >
          <Dropdown.Trigger>
            <Dropdown.Value placeholder="Pick a state" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Items>
              <Dropdown.Item value="default">default</Dropdown.Item>
              <Dropdown.Item value="success">success</Dropdown.Item>
              <Dropdown.Item value="alert">alert</Dropdown.Item>
              <Dropdown.Item value="error">error</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Popover>
        </Dropdown>
        <FormField.HelperMessage>
          An effective title significantly increases your chances of making a sale
        </FormField.HelperMessage>
        <FormField.SuccessMessage>Well done!</FormField.SuccessMessage>
        <FormField.AlertMessage>Take care of this field</FormField.AlertMessage>
        <FormField.ErrorMessage>The field is invalid</FormField.ErrorMessage>
      </FormField>
    </div>
  )
}
