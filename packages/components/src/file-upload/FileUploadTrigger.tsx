import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import React, { ReactNode, Ref } from 'react'

import { Button, type ButtonProps } from '../button'
import { buttonStyles } from '../button/Button.styles'
import { useFileUploadContext } from './FileUpload'
import { useDropzoneContext } from './FileUploadDropzone'

export interface FileUploadTriggerProps extends Omit<ButtonProps, 'children' | 'disabled'> {
  ref?: Ref<HTMLButtonElement>
  className?: string
  children?: ReactNode
  unstyled?: boolean
}

export const Trigger = ({
  className,
  children,
  render,
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

  const defaultProps: Record<string, unknown> = isInsideDropzone
    ? {}
    : {
        ref: handleRef,
        type: 'button',
        'data-spark-component': 'file-upload-trigger',
        className: cx(className),
        disabled: disabled || readOnly,
        onClick: handleClick,
        'aria-describedby': description,
        'aria-invalid': isInvalid,
        'aria-required': isRequired,
        children,
        ...props,
      }

  const renderElement = useRender({
    defaultTagName: 'button',
    render: isInsideDropzone ? undefined : render,
    ref: handleRef,
    props: isInsideDropzone ? {} : mergeProps<'button'>(defaultProps, {}),
  })

  if (isInsideDropzone) {
    // Don't use render when inside Dropzone - we always want a span
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

    return (
      <span ref={handleRef} data-spark-component="file-upload-trigger" className={spanStyles}>
        {children}
      </span>
    )
  }

  if (!unstyled && !render) {
    return (
      <Button
        ref={handleRef}
        type="button"
        data-spark-component="file-upload-trigger"
        className={cx(className)}
        disabled={disabled || readOnly}
        onClick={handleClick}
        aria-describedby={description}
        aria-invalid={isInvalid}
        aria-required={isRequired}
        design={design}
        intent={intent}
        size={size}
        shape={shape}
        {...props}
      >
        {children}
      </Button>
    )
  }

  return renderElement
}

Trigger.displayName = 'FileUpload.Trigger'
