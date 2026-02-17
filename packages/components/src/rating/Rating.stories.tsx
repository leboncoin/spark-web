import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { FormField } from '../form-field'
import { VisuallyHidden } from '../visually-hidden'
import { Rating, type RatingProps } from '.'

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=11013-788&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => <Rating aria-label="Rating control" defaultValue={3} />

export const Readonly: StoryFn = _args => (
  <Rating defaultValue={3} aria-label="Rating control with readOnly" readOnly />
)

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState<NonNullable<RatingProps['value']>>(3)

  return <Rating value={value} onValueChange={setValue} aria-label="Controlled rating" />
}

export const Disabled: StoryFn = _args => (
  <Rating defaultValue={3} aria-label="Rating control disabled" disabled />
)

export const WithFormField: StoryFn = _args => {
  const [value, setValue] = useState<NonNullable<RatingProps['value']>>()

  return (
    <FormField name="condition" state={!value ? 'error' : undefined} isRequired>
      <FormField.Label asChild>
        <p>Apparel condition</p>
      </FormField.Label>

      <Rating value={value} onValueChange={setValue} />

      <FormField.ErrorMessage>The condition is required</FormField.ErrorMessage>
    </FormField>
  )
}

export const FieldLabel: StoryFn = _args => (
  <FormField name="rating">
    <FormField.Label>Product rating</FormField.Label>

    <Rating defaultValue={4} />
  </FormField>
)

export const FieldHiddenLabel: StoryFn = _args => (
  <FormField name="rating">
    <VisuallyHidden>
      <FormField.Label>Product rating</FormField.Label>
    </VisuallyHidden>

    <Rating defaultValue={4} />
  </FormField>
)

export const FieldRequired: StoryFn = _args => (
  <FormField name="rating" isRequired>
    <FormField.Label>Product rating</FormField.Label>

    <Rating defaultValue={4} />
  </FormField>
)

export const FieldHelperMessage: StoryFn = _args => (
  <FormField name="rating">
    <FormField.Label>Product rating</FormField.Label>

    <Rating defaultValue={4} />

    <FormField.HelperMessage>Let others know your satisfaction level</FormField.HelperMessage>
  </FormField>
)

export const FieldInvalid: StoryFn = _args => (
  <FormField name="rating" state="error">
    <FormField.Label>Product rating</FormField.Label>

    <Rating defaultValue={undefined} />

    <FormField.ErrorMessage>A rating is required</FormField.ErrorMessage>
  </FormField>
)
