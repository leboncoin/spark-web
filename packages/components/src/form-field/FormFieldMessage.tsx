import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref, useEffect, useId } from 'react'

import { ID_PREFIX, useFormField } from './FormFieldContext'

export type FormFieldMessageProps = ComponentPropsWithoutRef<'span'> & {
  ref?: Ref<HTMLSpanElement>
}

export const FormFieldMessage = ({
  id: idProp,
  className,
  ref,
  ...others
}: FormFieldMessageProps) => {
  const { onMessageIdAdd, onMessageIdRemove } = useFormField()
  const currentId = `${ID_PREFIX}-message-${useId()}`
  const id = idProp || currentId

  useEffect(() => {
    onMessageIdAdd(id)

    return () => {
      onMessageIdRemove(id)
    }
  }, [id, onMessageIdAdd, onMessageIdRemove])

  return (
    <span
      ref={ref}
      id={id}
      data-spark-component="form-field-message"
      className={cx(className, 'text-caption')}
      {...others}
    />
  )
}

FormFieldMessage.displayName = 'FormField.Message'
