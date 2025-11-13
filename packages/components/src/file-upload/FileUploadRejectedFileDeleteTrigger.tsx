import { Close } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'
import { useRef } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { useFileUploadContext } from './FileUpload'

export interface FileUploadRejectedFileDeleteTriggerProps
  extends React.ComponentProps<typeof IconButton> {
  /**
   * Index of the rejected file to remove
   */
  rejectedFileIndex: number
}

export const RejectedFileDeleteTrigger = ({
  className,
  rejectedFileIndex,
  onClick,
  ...props
}: FileUploadRejectedFileDeleteTriggerProps) => {
  const { removeRejectedFile, triggerRef, dropzoneRef, disabled, readOnly } = useFileUploadContext()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Don't allow removing rejected files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    // Remove the rejected file
    removeRejectedFile(rejectedFileIndex)

    // Handle focus after removal
    setTimeout(() => {
      // Try to focus on trigger or dropzone if available
      const focusTarget = triggerRef.current || dropzoneRef.current
      if (focusTarget) {
        focusTarget.focus()
      }
    }, 0)

    onClick?.(e)
  }

  return (
    <IconButton
      ref={buttonRef}
      data-spark-component="file-upload-rejected-file-delete-trigger"
      className={cx(className)}
      onClick={handleClick}
      disabled={disabled || readOnly}
      size="sm"
      design="contrast"
      intent="surface"
      {...props}
    >
      <Icon size="sm">
        <Close />
      </Icon>
    </IconButton>
  )
}

RejectedFileDeleteTrigger.displayName = 'FileUpload.RejectedFileDeleteTrigger'
