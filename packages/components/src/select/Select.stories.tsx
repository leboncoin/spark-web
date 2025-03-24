/* eslint-disable max-lines */
import { BookmarkFill } from '@spark-ui/icons/BookmarkFill'
import { Meta, StoryFn } from '@storybook/react'
import { ComponentProps, useState } from 'react'

import { FormField } from '../form-field'
import { VisuallyHidden } from '../visually-hidden'
import { Select } from '.'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=16619-4434&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => {
  return (
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
  )
}

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState('book-3')

  return (
    <div>
      <Select name="book" value={value} onValueChange={setValue}>
        <Select.Trigger aria-label="Book">
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
  )
}

export const Disabled: StoryFn = _args => {
  return (
    <div>
      <Select name="book" disabled>
        <Select.Trigger aria-label="Book">
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
  )
}

export const ReadOnly: StoryFn = _args => {
  return (
    <div>
      <Select name="book" readOnly>
        <Select.Trigger aria-label="Book">
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
  )
}

export const DisabledItem: StoryFn = _args => {
  return (
    <div>
      <Select name="book">
        <Select.Trigger aria-label="Book">
          <Select.Value placeholder="Pick a book" />
        </Select.Trigger>

        <Select.Items>
          <Select.Placeholder>--Pick a book--</Select.Placeholder>
          <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
          <Select.Item value="book-2">War and Peace</Select.Item>
          <Select.Item value="book-3" disabled>
            The Idiot
          </Select.Item>
          <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
          <Select.Item value="book-5">1984</Select.Item>
          <Select.Item value="book-6">Pride and Prejudice</Select.Item>
        </Select.Items>
      </Select>
    </div>
  )
}

export const Grouped: StoryFn = _args => {
  return (
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
  )
}

export const LeadingIcon: StoryFn = _args => {
  return (
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
  )
}

export const Statuses: StoryFn = () => {
  type Status = ComponentProps<typeof Select>['state']

  const statuses: Status[] = ['error', 'alert', 'success']

  return (
    <div className="gap-lg flex flex-col">
      {statuses.map(status => {
        return (
          <Select key={status} name={'book-' + status} state={status}>
            <Select.Trigger aria-label="Book">
              <Select.Value placeholder="Pick a book" />
            </Select.Trigger>

            <Select.Items>
              <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
              <Select.Item value="book-2">War and Peace</Select.Item>
              <Select.Item value="book-3">The Idiot</Select.Item>
              <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
              <Select.Item value="book-5">1984</Select.Item>
              <Select.Item value="book-6">Pride and Prejudice</Select.Item>
            </Select.Items>
          </Select>
        )
      })}
    </div>
  )
}

export const FormFieldLabel: StoryFn = _args => {
  return (
    <div>
      <FormField name="book">
        <FormField.Label>Book</FormField.Label>
        <Select>
          <Select.Trigger>
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
            <Select.Item value="book-2">War and Peace</Select.Item>
            <Select.Item value="book-3">The Idiot</Select.Item>
            <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
            <Select.Item value="book-5">1984</Select.Item>
            <Select.Item value="book-6">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      </FormField>
    </div>
  )
}

export const FormFieldHiddenLabel: StoryFn = _args => {
  return (
    <div>
      <FormField name="book">
        <FormField.Label>
          <VisuallyHidden>Book</VisuallyHidden>
        </FormField.Label>
        <Select>
          <Select.Trigger>
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
            <Select.Item value="book-2">War and Peace</Select.Item>
            <Select.Item value="book-3">The Idiot</Select.Item>
            <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
            <Select.Item value="book-5">1984</Select.Item>
            <Select.Item value="book-6">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      </FormField>
    </div>
  )
}

export const FormFieldReadOnly: StoryFn = _args => {
  return (
    <div>
      <FormField name="book" readOnly>
        <FormField.Label>Book</FormField.Label>
        <Select>
          <Select.Trigger aria-label="Book">
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
            <Select.Item value="book-2">War and Peace</Select.Item>
            <Select.Item value="book-3">The Idiot</Select.Item>
            <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
            <Select.Item value="book-5">1984</Select.Item>
            <Select.Item value="book-6">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      </FormField>
    </div>
  )
}

export const FormFieldDisabled: StoryFn = _args => {
  return (
    <div>
      <FormField name="book" disabled>
        <FormField.Label>Book</FormField.Label>
        <Select>
          <Select.Trigger>
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
            <Select.Item value="book-2">War and Peace</Select.Item>
            <Select.Item value="book-3">The Idiot</Select.Item>
            <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
            <Select.Item value="book-5">1984</Select.Item>
            <Select.Item value="book-6">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      </FormField>
    </div>
  )
}

export const FormFieldRequired: StoryFn = _args => {
  return (
    <div>
      <FormField name="book" isRequired>
        <FormField.Label>Book</FormField.Label>
        <Select>
          <Select.Trigger>
            <Select.Value placeholder="Pick a book" />
          </Select.Trigger>

          <Select.Items>
            <Select.Item value="book-1">To Kill a Mockingbird</Select.Item>
            <Select.Item value="book-2">War and Peace</Select.Item>
            <Select.Item value="book-3">The Idiot</Select.Item>
            <Select.Item value="book-4">A Picture of Dorian Gray</Select.Item>
            <Select.Item value="book-5">1984</Select.Item>
            <Select.Item value="book-6">Pride and Prejudice</Select.Item>
          </Select.Items>
        </Select>
      </FormField>
    </div>
  )
}
export const FormFieldValidation: StoryFn = () => {
  const [state, setState] = useState<undefined | 'success' | 'alert' | 'error'>('error')

  return (
    <div>
      <FormField name="book" state={state}>
        <FormField.Label>Statuses</FormField.Label>
        <Select
          onValueChange={value => {
            setState(value === 'default' ? undefined : (value as 'success' | 'alert' | 'error'))
          }}
        >
          <Select.Trigger>
            <Select.Value placeholder="Pick an state" />
          </Select.Trigger>

          <Select.Items>
            <Select.Item value="default">default</Select.Item>
            <Select.Item value="success">success</Select.Item>
            <Select.Item value="alert">alert</Select.Item>
            <Select.Item value="error">error</Select.Item>
          </Select.Items>
        </Select>
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
