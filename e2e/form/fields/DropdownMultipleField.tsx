import { Dropdown } from '@spark-ui/components/dropdown'
import { FormField, FormFieldProps } from '@spark-ui/components/form-field'
import React from 'react'

interface DropdownMultipleFieldProps extends FormFieldProps {
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
}

export const DropdownMultipleField = ({
  name = 'hobbies',
  defaultValue,
  value,
  onValueChange,
  ...fieldProps
}: DropdownMultipleFieldProps) => {
  return (
    <FormField name={name} {...fieldProps}>
      <FormField.Label>Hobbies</FormField.Label>

      <Dropdown multiple value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
        <Dropdown.Trigger>
          <Dropdown.Value placeholder="What are your hobbies?" />
        </Dropdown.Trigger>

        <Dropdown.Popover>
          <Dropdown.Items>
            <Dropdown.Item value="cooking" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>Cooking</Dropdown.ItemText>
            </Dropdown.Item>
            <Dropdown.Item value="gaming" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>Gaming</Dropdown.ItemText>
            </Dropdown.Item>
            <Dropdown.Item value="reading" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>Reading</Dropdown.ItemText>
            </Dropdown.Item>
            <Dropdown.Item value="sport" className="gap-md flex items-center">
              <Dropdown.ItemIndicator />
              <Dropdown.ItemText>Sport</Dropdown.ItemText>
            </Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Popover>
      </Dropdown>

      <FormField.ErrorMessage>This field is invalid</FormField.ErrorMessage>
    </FormField>
  )
}
