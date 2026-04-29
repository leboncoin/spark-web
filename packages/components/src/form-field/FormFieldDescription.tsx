import { cx } from 'class-variance-authority'
import { Ref } from 'react'

import { FormFieldMessage, FormFieldMessageProps } from './FormFieldMessage'

export type FormFieldDescriptionProps = FormFieldMessageProps & {
  ref?: Ref<HTMLSpanElement>
}

export const FormFieldDescription = ({ className, ref, ...others }: FormFieldDescriptionProps) => {
  return (
    <FormFieldMessage
      ref={ref}
      data-spark-component="form-field-description"
      className={cx('text-on-surface/dim-1 text-body-2', className)}
      {...others}
    />
  )
}

FormFieldDescription.displayName = 'FormField.Description'
