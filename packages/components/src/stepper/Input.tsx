import { NumberField } from '@base-ui-components/react/number-field'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { cx } from 'class-variance-authority'
import { ComponentProps, ReactNode } from 'react'

interface Props extends Omit<ComponentProps<typeof NumberField.Input>, 'render'> {
  children?: ReactNode
}

export const Input = ({ className, ...props }: Props) => {
  const field = useFormFieldControl()

  return (
    <NumberField.Input
      data-spark-component="stepper-input"
      className={cx(
        // Base styles
        'bg-surface text-on-surface px-lg h-sz-44 border-y-sm border-outline relative inline-flex w-full text-center',
        'first:border-l-sm first:rounded-l-lg',
        'last:border-r-sm last:rounded-r-lg',
        // State styles
        'group-data-[field-state=error]:border-error',
        'group-data-[field-state=alert]:border-alert',
        'group-data-[field-state=success]:border-success',
        '',
        // Disabled and ReadOnly styles
        'data-[disabled]:bg-on-surface/dim-5 data-[disabled]:text-on-surface/dim-3 data-[disabled]:cursor-not-allowed',
        'data-[readonly]:bg-on-surface/dim-5',
        // Focus styles
        'focus:outline-outline-high focus:z-raised focus:outline-2 focus:-outline-offset-1',
        className
      )}
      {...(field.description && { 'aria-describedby': field.description })}
      {...(field.isRequired && { required: true })}
      {...(field.state === 'error' && { 'aria-invalid': true })}
      {...props}
    />
  )
}

Input.displayName = 'Stepper.InputButton'
