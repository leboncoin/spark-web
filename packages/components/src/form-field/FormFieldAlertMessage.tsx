import { Ref } from 'react'

import { FormFieldStateMessage, FormFieldStateMessageProps } from './FormFieldStateMessage'

export type FormFieldAlertMessageProps = Omit<FormFieldStateMessageProps, 'state'> & {
  ref?: Ref<HTMLSpanElement>
}

/** An alert message displayed when the form field is in an alert state. Renders a <span> element. */
export const FormFieldAlertMessage = ({ ref, ...props }: FormFieldAlertMessageProps) => {
  return (
    <FormFieldStateMessage
      ref={ref}
      data-spark-component="form-field-alert-message"
      state="alert"
      {...props}
    />
  )
}

FormFieldAlertMessage.displayName = 'FormField.AlertMessage'
