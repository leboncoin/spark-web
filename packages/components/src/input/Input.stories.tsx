import { Tag } from '@spark-ui/components/tag'
import { Meta, StoryFn } from '@storybook/react-vite'
import { ChangeEvent, useState } from 'react'

import { Input } from '.'
import { Checkbox } from '../checkbox'
import { FormField } from '../form-field'
import { VisuallyHidden } from '../visually-hidden'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=54840-133360&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <Input placeholder="Type here..." aria-label="Phone type" />
)

export const Uncontrolled: StoryFn = _args => (
  <Input defaultValue="iPhone 12" aria-label="Phone type" />
)

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState('iPhone 13')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return <Input value={value} onChange={handleChange} aria-label="Phone type" />
}

export const Disabled: StoryFn = _args => {
  const [isDisabled, setIsDisabled] = useState(true)

  return (
    <div className="gap-xl flex flex-col">
      <Checkbox checked={isDisabled} onClick={() => setIsDisabled(isDisabled => !isDisabled)}>
        Disabled
      </Checkbox>

      <div>
        <Tag className="mb-md flex">Standalone input</Tag>
        <Input
          className="max-w-sz-320"
          aria-label="Website"
          disabled={isDisabled}
          defaultValue="Hello world"
        />
      </div>

      <div>
        <Tag className="mb-md flex">With FormField label</Tag>
        <FormField disabled={isDisabled}>
          <FormField.Label>My label</FormField.Label>
          <Input
            className="max-w-sz-320"
            aria-label="Website"
            disabled={isDisabled}
            defaultValue="Hello world"
          />
        </FormField>
      </div>
    </div>
  )
}

export const ReadOnly: StoryFn = _args => {
  const [isReadOnly, setIsReadOnly] = useState(true)

  return (
    <div className="gap-xl flex flex-col">
      <Checkbox checked={isReadOnly} onClick={() => setIsReadOnly(isReadOnly => !isReadOnly)}>
        Read Only
      </Checkbox>

      <div>
        <Tag className="mb-md flex">Standalone input</Tag>

        <Input
          className="max-w-sz-320"
          aria-label="Website"
          readOnly={isReadOnly}
          defaultValue="Hello world"
        />
      </div>

      <div>
        <Tag className="mb-md flex">With FormField label</Tag>

        <FormField readOnly={isReadOnly}>
          <FormField.Label>My label</FormField.Label>

          <Input
            className="max-w-sz-320"
            aria-label="Website"
            readOnly={isReadOnly}
            defaultValue="Hello world"
          />
        </FormField>
      </div>
    </div>
  )
}

export const FieldLabel: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>Title</FormField.Label>

      <Input />
    </FormField>
  )
}

export const FieldHiddenLabel: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>
        <VisuallyHidden>Title</VisuallyHidden>
      </FormField.Label>

      <Input />
    </FormField>
  )
}

export const FieldRequired: StoryFn = _args => {
  return (
    <div>
      <p className="mb-xl">* Required fields</p>
      <FormField name="title" isRequired>
        <FormField.Label>Title</FormField.Label>

        <Input />
      </FormField>
    </div>
  )
}

export const FieldHelperMessage: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>Title</FormField.Label>

      <Input />

      <FormField.HelperMessage>
        An effective title significantly increases your chances of making a sale
      </FormField.HelperMessage>
    </FormField>
  )
}

export const FieldCharactersCount: StoryFn = _args => {
  const MAX_LENGTH = 90
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <FormField name="input-with-a-characters-count">
      <FormField.Label>Input with a characters count</FormField.Label>

      <Input value={value} onChange={handleChange} maxLength={MAX_LENGTH} />

      <div className="gap-md flex justify-between">
        <FormField.CharactersCount
          value={value}
          maxLength={MAX_LENGTH}
          description={`You can enter up to ${MAX_LENGTH} characters`}
          liveAnnouncement={({ remainingChars }) =>
            `You have ${remainingChars} characters remaining`
          }
        />
      </div>
    </FormField>
  )
}

export const FieldInvalid: StoryFn = _args => {
  return (
    <FormField name="title" state="error">
      <FormField.Label>Title</FormField.Label>

      <Input defaultValue="leboncoin.fr" />

      <FormField.ErrorMessage>The URL is invalid</FormField.ErrorMessage>
    </FormField>
  )
}
