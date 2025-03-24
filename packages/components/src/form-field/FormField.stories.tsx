import { Meta, StoryFn } from '@storybook/react'
import { cx } from 'class-variance-authority'
import { ChangeEvent, useState } from 'react'

import { FormField } from '.'

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=44899-1285&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => (
  <FormField name="email">
    <FormField.Label>Email</FormField.Label>

    <FormField.Control>
      {({ id, name, description }) => (
        <input
          type="email"
          id={id}
          name={name}
          aria-describedby={description}
          className="border-md border-neutral p-md rounded-sm outline-hidden"
        />
      )}
    </FormField.Control>

    <FormField.HelperMessage>We will never share your email</FormField.HelperMessage>
  </FormField>
)

export const Required: StoryFn = () => (
  <FormField name="password" isRequired>
    <FormField.Label>Password</FormField.Label>

    <FormField.Control>
      {({ id, name, description, isRequired }) => (
        <input
          type="password"
          id={id}
          name={name}
          aria-describedby={description}
          aria-required={isRequired}
          required={isRequired}
          className="border-md border-neutral p-md rounded-sm outline-hidden"
        />
      )}
    </FormField.Control>

    <FormField.ErrorMessage>Password is required</FormField.ErrorMessage>
  </FormField>
)

export const CustomRequired: StoryFn = () => (
  <FormField name="password" isRequired>
    <FormField.Label
      requiredIndicator={
        <FormField.RequiredIndicator className="text-caption text-neutral">
          Required
        </FormField.RequiredIndicator>
      }
    >
      Password
    </FormField.Label>

    <FormField.Control>
      {({ id, name, description, isRequired }) => (
        <input
          type="password"
          id={id}
          name={name}
          aria-describedby={description}
          aria-required={isRequired}
          required={isRequired}
          className="border-md border-neutral p-md rounded-sm outline-hidden"
        />
      )}
    </FormField.Control>

    <FormField.ErrorMessage>Password is required</FormField.ErrorMessage>
  </FormField>
)

export const State: StoryFn = () => (
  <div className="gap-lg flex flex-col">
    <FormField name="email" state="error">
      <FormField.Label>Name</FormField.Label>

      <FormField.Control>
        {({ id, name, description, state }) => (
          <input
            type="text"
            id={id}
            name={name}
            aria-describedby={description}
            className={cx(
              'border-md p-md rounded-sm outline-hidden',
              state === 'error' ? 'border-error' : 'border-neutral'
            )}
          />
        )}
      </FormField.Control>

      <FormField.ErrorMessage>Name is invalid</FormField.ErrorMessage>
    </FormField>

    <FormField name="email" state="success">
      <FormField.Label>Email</FormField.Label>

      <FormField.Control>
        {({ id, name, description, state }) => (
          <input
            type="email"
            id={id}
            name={name}
            aria-describedby={description}
            className={cx(
              'border-md p-md rounded-sm outline-hidden',
              state === 'success' ? 'border-success' : 'border-neutral'
            )}
          />
        )}
      </FormField.Control>

      <FormField.SuccessMessage>Email is valid</FormField.SuccessMessage>
    </FormField>

    <FormField name="email" state="alert">
      <FormField.Label>Password</FormField.Label>

      <FormField.Control>
        {({ id, name, description, state }) => (
          <input
            type="password"
            id={id}
            name={name}
            aria-describedby={description}
            className={cx(
              'border-md p-md rounded-sm outline-hidden',
              state === 'alert' ? 'border-alert' : 'border-neutral'
            )}
          />
        )}
      </FormField.Control>

      <FormField.AlertMessage>There is an issue with your password</FormField.AlertMessage>
    </FormField>
  </div>
)

export const CharactersCount: StoryFn = _args => {
  const MAX_LENGTH = 90
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <FormField name="input-with-a-characters-count">
      <FormField.Label>Input with a characters count</FormField.Label>

      <FormField.Control>
        {({ id, name, description }) => (
          <input
            type="email"
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            maxLength={MAX_LENGTH}
            aria-describedby={description}
            className="border-md border-neutral p-md rounded-sm outline-hidden"
          />
        )}
      </FormField.Control>

      <div className="gap-md flex justify-between">
        <FormField.HelperMessage>
          Type the text but take into account the max length
        </FormField.HelperMessage>

        <FormField.CharactersCount value={value} maxLength={MAX_LENGTH} />
      </div>
    </FormField>
  )
}
