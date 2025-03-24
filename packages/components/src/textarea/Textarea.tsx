import { cx } from 'class-variance-authority'
import { ComponentPropsWithRef, PropsWithChildren } from 'react'

import { Input } from '../input'

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  /**
   * If `false`, the textarea won't be resizable.
   */
  isResizable?: boolean
}

const Root = ({
  className,
  disabled,
  rows = 1,
  isResizable = true,
  ref,
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
    >
      <textarea ref={ref} rows={rows} {...others} />
    </Input>
  )
}

export const Textarea = Object.assign(Root, {
  id: Input.id,
})

Root.displayName = 'Textarea'
