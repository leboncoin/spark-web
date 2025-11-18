import { Close } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'
import { useRef } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { type RejectedFile as RejectedFileType, useFileUploadContext } from './FileUpload'

export interface FileUploadRejectedFileDeleteTriggerProps
  extends React.ComponentProps<typeof IconButton> {
  /**
   * The rejected file to remove
   */
  rejectedFile: RejectedFileType
}

export const RejectedFileDeleteTrigger = ({
  className,
  rejectedFile,
  onClick,
  ...props
}: FileUploadRejectedFileDeleteTriggerProps) => {
  const { removeRejectedFile, triggerRef, dropzoneRef, disabled, readOnly, rejectedFiles } =
    useFileUploadContext()
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Find the index of the rejected file using name + size (consistent with duplicate detection logic)
  const rejectedFileIndex = rejectedFiles.findIndex(
    rf => rf.file.name === rejectedFile.file.name && rf.file.size === rejectedFile.file.size
  )

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
