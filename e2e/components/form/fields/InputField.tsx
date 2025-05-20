import { FormField, FormFieldProps } from '@spark-ui/components/form-field'
import { Input } from '@spark-ui/components/input'
import React from 'react'

interface InputFieldProps extends FormFieldProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export const InputField = ({
  name = 'name',
  defaultValue,
  value,
  onValueChange,
  ...fieldProps
}: InputFieldProps) => {
  return (
    <FormField name={name} {...fieldProps}>
      <FormField.Label>Name</FormField.Label>

      <Input defaultValue={defaultValue} value={value} onValueChange={onValueChange} />

      <FormField.ErrorMessage>This field is invalid</FormField.ErrorMessage>
    </FormField>
  )
}
