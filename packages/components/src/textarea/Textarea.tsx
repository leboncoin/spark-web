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
      render={<textarea />}
      ref={ref as Ref<HTMLInputElement>}
      rows={rows}
      onValueChange={onValueChange}
      {...(others as InputProps)}
    />
  )
}

export const Textarea = Object.assign(Root, {
  id: Input.id,
})

Root.displayName = 'Textarea'
