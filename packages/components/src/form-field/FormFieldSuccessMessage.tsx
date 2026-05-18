import { Ref } from 'react'

import { FormFieldStateMessage, FormFieldStateMessageProps } from './FormFieldStateMessage'

export type FormFieldSuccessMessageProps = Omit<FormFieldStateMessageProps, 'state'> & {
  ref?: Ref<HTMLSpanElement>
}

/** A success message displayed when the form field is in a success state. Renders a <span> element. */
export const FormFieldSuccessMessage = ({ ref, ...props }: FormFieldSuccessMessageProps) => {
  return (
    <FormFieldStateMessage
      ref={ref}
      data-spark-component="form-field-success-message"
      state="success"
      {...props}
    />
  )
}

FormFieldSuccessMessage.displayName = 'FormField.SuccessMessage'
