import { Ref } from 'react'

import { FormFieldStateMessage, FormFieldStateMessageProps } from './FormFieldStateMessage'

export type FormFieldErrorMessageProps = Omit<FormFieldStateMessageProps, 'state'> & {
  ref?: Ref<HTMLSpanElement>
}

export const FormFieldErrorMessage = ({ ref, ...props }: FormFieldErrorMessageProps) => {
  return (
    <FormFieldStateMessage
      ref={ref}
      data-spark-component="form-field-error-message"
      state="error"
      {...props}
    />
  )
}

FormFieldErrorMessage.displayName = 'FormField.ErrorMessage'
