import { cx } from 'class-variance-authority'
import { Ref } from 'react'

import { Label, LabelRequiredIndicatorProps } from '../label'

export type FormFieldRequiredIndicatorProps = LabelRequiredIndicatorProps & {
  ref?: Ref<HTMLSpanElement>
}

/** An indicator shown when the form field is required. Renders a <span> element. */
export const FormFieldRequiredIndicator = ({
  className,
  ref,
  ...props
}: FormFieldRequiredIndicatorProps) => {
  return <Label.RequiredIndicator ref={ref} className={cx('ml-sm', className)} {...props} />
}

FormFieldRequiredIndicator.displayName = 'FormField.RequiredIndicator'
