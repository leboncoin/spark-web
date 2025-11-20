import { cx } from 'class-variance-authority'
import React, { ReactNode, Ref } from 'react'

import { Button, type ButtonProps } from '../button'
import { buttonStyles } from '../button/Button.styles'
import { Slot } from '../slot'
import { useFileUploadContext } from './FileUpload'
import { useDropzoneContext } from './FileUploadDropzone'

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
  size = 'md',
  shape = 'rounded',
  ref,
  ...props
}: FileUploadTriggerProps) => {
  const { inputRef, triggerRef, disabled, readOnly, description, isInvalid, isRequired } =
    useFileUploadContext()
  const isInsideDropzone = useDropzoneContext()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!disabled && !readOnly) {
      inputRef.current?.click()
    }
  }

  // Shared ref forwarding logic
  const handleRef = (node: HTMLElement | null) => {
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
  }

  // Determine component and props based on context
  // If inside a Dropzone, render as a non-interactive span
  // The Dropzone handles all interactions
  let Component: React.ElementType
  let componentProps: Record<string, unknown>

  if (isInsideDropzone) {
    // Don't use asChild when inside Dropzone - we always want a span
    Component = 'span'
    const spanStyles = unstyled
      ? className
      : buttonStyles({
          design,
          intent,
          size,
          shape,
          disabled: disabled || readOnly,
          className,
        })

    componentProps = {
      ref: handleRef,
      'data-spark-component': 'file-upload-trigger',
      className: spanStyles,
      // No onClick, no role, no tabIndex - Dropzone handles interaction
      // No aria attributes here - they're on the Dropzone
    }
  } else {
    // Normal behavior when not inside Dropzone
    const buttonComponent = unstyled ? 'button' : Button
    Component = asChild ? Slot : buttonComponent

    componentProps = {
      ref: handleRef,
      type: 'button',
      design,
      intent,
      size,
      shape,
      'data-spark-component': 'file-upload-trigger',
      className: cx(className),
      disabled: disabled || readOnly,
      onClick: handleClick,
      'aria-describedby': description,
      'aria-invalid': isInvalid,
      'aria-required': isRequired,
      ...props,
    }
  }

  return <Component {...componentProps}>{children}</Component>
}

Trigger.displayName = 'FileUpload.Trigger'
