import { AlertOutline } from '@spark-ui/icons/AlertOutline'
import { Check } from '@spark-ui/icons/Check'
import { WarningOutline } from '@spark-ui/icons/WarningOutline'
import { cx } from 'class-variance-authority'
import { Ref } from 'react'

import { Icon } from '../icon'
import { useFormField } from './FormFieldContext'
import { FormFieldMessage, FormFieldMessageProps } from './FormFieldMessage'

export interface FormFieldStateMessageProps extends FormFieldMessageProps {
  state: 'error' | 'alert' | 'success'
  ref?: Ref<HTMLSpanElement>
}

export const FormFieldStateMessage = ({
  className,
  state,
  children,
  ref,
  ...others
}: FormFieldStateMessageProps) => {
  const field = useFormField()

  if (field.state !== state) {
    return null
  }

  return (
    <FormFieldMessage
      ref={ref}
      data-spark-component="form-field-state-message"
      aria-live="polite"
      className={cx(
        'gap-sm flex items-center',
        state === 'error' ? 'text-error' : 'text-on-surface/dim-1',
        className
      )}
      {...others}
    >
      {state === 'alert' && (
        <Icon size="sm">
          <WarningOutline />
        </Icon>
      )}
      {state === 'error' && (
        <Icon size="sm" intent="error">
          <AlertOutline />
        </Icon>
      )}
      {state === 'success' && (
        <Icon size="sm">
          <Check />
        </Icon>
      )}

      {children}
    </FormFieldMessage>
  )
}

FormFieldStateMessage.displayName = 'FormField.StateMessage'
