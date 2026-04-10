import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, PropsWithChildren, Ref } from 'react'

import { Input, InputProps } from '../input'

type TextareaPrimitiveProps = ComponentPropsWithoutRef<'textarea'>

export interface TextareaProps extends TextareaPrimitiveProps, Pick<InputProps, 'onValueChange'> {
  isResizable?: boolean
  ref?: Ref<HTMLTextAreaElement>
}

const Root = ({
  className,
  disabled,
  rows = 1,
  isResizable = true,
  ref,
  onValueChange,
  ...others
}: PropsWithChildren<TextareaProps>) => {
  return (
    <Input
      className={cx(
        className,
        'py-[var(--spacing-sz-10)]',
        isResizable ? 'resize-y' : 'resize-none'
      )}
      data-spark-component="textarea"
      disabled={disabled}
      asChild
      onValueChange={onValueChange}
    >
      <textarea ref={ref} rows={rows} {...others} />
    </Input>
  )
}

/**
 * A multi-line text input field that allows users to enter longer text content.
 */
export const Textarea = Object.assign(Root, {
  id: Input.id,
})

Root.displayName = 'Textarea'
