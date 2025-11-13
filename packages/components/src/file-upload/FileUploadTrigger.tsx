import { cx } from 'class-variance-authority'
import React, { ReactNode, Ref } from 'react'

import { Button, type ButtonProps } from '../button'
import { Slot } from '../slot'
import { useFileUploadContext } from './FileUpload'

export interface FileUploadTriggerProps extends Omit<ButtonProps, 'children' | 'disabled'> {
  ref?: Ref<HTMLButtonElement>
  className?: string
  children: ReactNode
  unstyled?: boolean
}

export const Trigger = ({
  className,
  children,
  asChild = false,
  unstyled = false,
  design = 'filled',
  intent = 'basic',
  ref,
  ...props
}: FileUploadTriggerProps) => {
  const { inputRef, triggerRef, disabled, readOnly } = useFileUploadContext()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!disabled && !readOnly) {
      inputRef.current?.click()
    }
  }

  const buttonComponent = unstyled ? 'button' : Button
  const Comp = asChild ? Slot : buttonComponent

  return (
    <Comp
      // htmlFor="image_uploads"
      type="button"
      ref={(node: HTMLElement | null) => {
        // Forward ref to both the context ref and the user ref
        if (triggerRef) {
          triggerRef.current = node
        }
        if (ref) {
          if (typeof ref === 'function') {
            ref(node as HTMLButtonElement)
          } else {
            ref.current = node as HTMLButtonElement
          }
        }
      }}
      design={design}
      intent={intent}
      data-spark-component="file-upload-trigger"
      className={cx(className)}
      disabled={disabled || readOnly}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Comp>
  )
}

Trigger.displayName = 'FileUpload.Trigger'
