import { FormField } from '@spark-ui/components/form-field'
import { VisuallyHidden } from '@spark-ui/components/visually-hidden'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { InputOTP } from '.'

const meta: Meta<typeof InputOTP> = {
  title: 'Experimental/InputOTP',
  component: InputOTP,
  tags: ['data-entry'],
}

export default meta

export const Default: StoryFn = _args => (
  <InputOTP name="verification-code" aria-label="Verification code">
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
  </InputOTP>
)

export const Uncontrolled: StoryFn = _args => (
  <InputOTP defaultValue="1234" aria-label="Verification code">
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
  </InputOTP>
)

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState('')

  return (
    <div className="gap-md flex flex-col">
      <InputOTP value={value} onValueChange={setValue} aria-label="Verification code">
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
      <p className="text-body-2 text-on-surface">Value: {value || '(empty)'}</p>
    </div>
  )
}

export const NumberType: StoryFn = _args => (
  <InputOTP type="number" aria-label="PIN code">
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
  </InputOTP>
)

export const PasswordType: StoryFn = _args => (
  <InputOTP type="password" aria-label="Password code">
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
  </InputOTP>
)

export const ForceUppercase: StoryFn = _args => (
  <InputOTP forceUppercase aria-label="Uppercase code">
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
  </InputOTP>
)

export const InvalidState: StoryFn = _args => (
  <InputOTP isValid={false} aria-label="Invalid code">
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
  </InputOTP>
)

export const Disabled: StoryFn = _args => (
  <InputOTP disabled defaultValue="1234" aria-label="Disabled code">
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
  </InputOTP>
)

export const WithPlaceholder: StoryFn = _args => (
  <InputOTP placeholder="0" aria-label="Code with placeholder">
    <InputOTP.Group>
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
      <InputOTP.Slot />
    </InputOTP.Group>
  </InputOTP>
)

export const FilterCharacters: StoryFn = _args => (
  <div className="gap-lg flex flex-col">
    <div>
      <p className="mb-md text-body-2 text-on-surface">
        Pattern: filtering out "-" and "." using pattern [^-.]
      </p>
      <InputOTP pattern="[^-.]" aria-label="Filtered code">
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </div>
    <div>
      <p className="mb-md text-body-2 text-on-surface">
        Pattern: only allowing "a", "b", "c" using pattern [a-c]
      </p>
      <InputOTP pattern="[a-c]" aria-label="Whitelist code">
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </div>
  </div>
)

export const FieldLabel: StoryFn = _args => {
  return (
    <FormField name="verification-code">
      <FormField.Label>Verification code</FormField.Label>

      <InputOTP>
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </FormField>
  )
}

export const FieldHiddenLabel: StoryFn = _args => {
  return (
    <FormField name="verification-code">
      <FormField.Label>
        <VisuallyHidden>Verification code</VisuallyHidden>
      </FormField.Label>

      <InputOTP>
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </FormField>
  )
}

export const FieldRequired: StoryFn = _args => {
  return (
    <div>
      <p className="mb-xl">* Required fields</p>
      <FormField name="verification-code" isRequired>
        <FormField.Label>Verification code</FormField.Label>

        <InputOTP>
          <InputOTP.Group>
            <InputOTP.Slot />
            <InputOTP.Slot />
            <InputOTP.Slot />
            <InputOTP.Slot />
          </InputOTP.Group>
        </InputOTP>
      </FormField>
    </div>
  )
}

export const FieldHelperMessage: StoryFn = _args => {
  return (
    <FormField name="verification-code">
      <FormField.Label>Verification code</FormField.Label>

      <InputOTP>
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>

      <FormField.HelperMessage>Enter the 4-digit code sent to your email</FormField.HelperMessage>
    </FormField>
  )
}

export const FieldInvalid: StoryFn = _args => {
  const [value, setValue] = useState('')
  const [state, setState] = useState<undefined | 'error' | 'success'>(undefined)

  const handleChange = (newValue: string) => {
    setValue(newValue)

    if (newValue.length === 4) {
      if (newValue === '1234') {
        setState('success')
      } else {
        setState('error')
      }
    } else {
      setState(undefined)
    }
  }

  return (
    <FormField name="verification-code" state={state}>
      <FormField.Label>Verification code</FormField.Label>

      <InputOTP value={value} onValueChange={handleChange}>
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>

      <FormField.HelperMessage>Enter the 4-digit code sent to your email</FormField.HelperMessage>
      <FormField.SuccessMessage>The code is valid</FormField.SuccessMessage>
      <FormField.ErrorMessage>The code is invalid</FormField.ErrorMessage>
    </FormField>
  )
}
