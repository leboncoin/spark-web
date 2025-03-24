import { Dropdown } from '@spark-ui/components/dropdown'
import { FormField, FormFieldProps } from '@spark-ui/components/form-field'
import React from 'react'

interface DropdownFieldProps extends FormFieldProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export const DropdownField = ({
  name = 'position',
  defaultValue,
  value,
  onValueChange,
  ...fieldProps
}: DropdownFieldProps) => {
  return (
    <FormField name={name} {...fieldProps}>
      <FormField.Label>Position</FormField.Label>

      <Dropdown defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
        <Dropdown.Trigger>
          <Dropdown.Value placeholder="What is your current position?" />
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="developper">Developper</Dropdown.Item>
            <Dropdown.Item value="designer">UX/UI Designer</Dropdown.Item>
            <Dropdown.Item value="engineering-manager">Engineering Manager</Dropdown.Item>
            <Dropdown.Item value="product-manager">Product Manager</Dropdown.Item>
            <Dropdown.Item value="quality-analyst">Quality Analyst</Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>

      <FormField.ErrorMessage>This field is invalid</FormField.ErrorMessage>
    </FormField>
  )
}
