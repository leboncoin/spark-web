import { Ref } from 'react'

import { FormFieldStateMessage, FormFieldStateMessageProps } from './FormFieldStateMessage'

export type FormFieldErrorMessageProps = Omit<FormFieldStateMessageProps, 'state'> & {
  ref?: Ref<HTMLSpanElement>
}

/** An error message displayed when the form field is in an error state. Renders a <span> element. */
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
