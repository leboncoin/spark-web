import { Check } from '@spark-ui/icons/Check'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { Meta, StoryFn } from '@storybook/react'
import { ChangeEvent, useState } from 'react'

import { FormField } from '../form-field'
import { VisuallyHidden } from '../visually-hidden'
import { Textarea, TextareaGroup } from '.'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=55066-31324&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <Textarea rows={2} placeholder="Describe what you want to sell" aria-label="Description" />
)

export const Uncontrolled: StoryFn = _args => (
  <Textarea rows={2} defaultValue="IPhone 12 in good condition" aria-label="Description" />
)

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState('IPhone 12 in good condition')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  return <Textarea rows={2} value={value} onChange={handleChange} aria-label="Description" />
}

export const Resizable: StoryFn = () => (
  <Textarea
    rows={2}
    aria-label="Description"
    placeholder="Describe what you want to sell"
    isResizable={false}
  />
)

export const CustomizedScrollbar: StoryFn = () => (
  <Textarea
    className="[scrollbar-color:blue_transparent]"
    rows={2}
    aria-label="Description"
    defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  />
)

export const Disabled: StoryFn = _args => (
  <div className="gap-md flex flex-col">
    <Textarea
      rows={2}
      defaultValue="IPhone 12 in good condition"
      aria-label="Description"
      disabled
    />

    <TextareaGroup disabled>
      <TextareaGroup.LeadingIcon>
        <PenOutline />
      </TextareaGroup.LeadingIcon>

      <Textarea rows={2} defaultValue="IPhone 12 in good condition" aria-label="Message" />

      <TextareaGroup.TrailingIcon>
        <Check />
      </TextareaGroup.TrailingIcon>
    </TextareaGroup>
  </div>
)

export const Icon: StoryFn = _args => (
  <TextareaGroup>
    <TextareaGroup.LeadingIcon>
      <PenOutline />
    </TextareaGroup.LeadingIcon>

    <Textarea rows={2} aria-label="Message" />

    <TextareaGroup.TrailingIcon>
      <Check />
    </TextareaGroup.TrailingIcon>
  </TextareaGroup>
)

export const State: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      <TextareaGroup state="error">
        <Textarea rows={2} aria-label="Description" />
      </TextareaGroup>

      <TextareaGroup state="alert">
        <TextareaGroup.LeadingIcon>
          <PenOutline />
        </TextareaGroup.LeadingIcon>

        <Textarea rows={2} aria-label="Description" />
      </TextareaGroup>

      <TextareaGroup state="success">
        <TextareaGroup.LeadingIcon>
          <PenOutline />
        </TextareaGroup.LeadingIcon>

        <Textarea rows={2} aria-label="Description" />

        <TextareaGroup.TrailingIcon>
          <Check />
        </TextareaGroup.TrailingIcon>
      </TextareaGroup>
    </div>
  )
}

export const FieldLabel: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>Title</FormField.Label>

      <Textarea rows={2} />
    </FormField>
  )
}

export const FieldHiddenLabel: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>
        <VisuallyHidden>Title</VisuallyHidden>
      </FormField.Label>

      <Textarea rows={2} />
    </FormField>
  )
}

export const FieldRequired: StoryFn = _args => {
  return (
    <FormField name="title" isRequired>
      <FormField.Label>Title</FormField.Label>

      <Textarea rows={2} />
    </FormField>
  )
}

export const FieldHelperMessage: StoryFn = _args => {
  return (
    <FormField name="description">
      <FormField.Label>Description</FormField.Label>

      <Textarea rows={2} />

      <FormField.HelperMessage>
        An effective description significantly increases your chances of making a sale
      </FormField.HelperMessage>
    </FormField>
  )
}

export const FieldCharactersCount: StoryFn = () => {
  const maxLength = 90
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  return (
    <FormField name="description">
      <FormField.Label>Description</FormField.Label>

      <Textarea rows={2} value={value} onChange={handleChange} maxLength={maxLength} />

      <div className="gap-md flex justify-between">
        <div className="grow">
          <FormField.HelperMessage>
            An effective description significantly increases your chances of making a sale
          </FormField.HelperMessage>

          <FormField.ErrorMessage>The description is invalid</FormField.ErrorMessage>
        </div>

        <FormField.CharactersCount value={value} maxLength={maxLength} />
      </div>
    </FormField>
  )
}

export const FieldInvalid: StoryFn = _args => {
  return (
    <FormField name="description" state="error">
      <FormField.Label>Description</FormField.Label>

      <Textarea rows={2} />

      <FormField.ErrorMessage>The description is invalid</FormField.ErrorMessage>
    </FormField>
  )
}
