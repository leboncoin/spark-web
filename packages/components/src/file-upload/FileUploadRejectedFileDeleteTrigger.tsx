import { Close } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'
import { useRef } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { type RejectedFile as RejectedFileType, useFileUploadContext } from './FileUpload'
import { findFocusableElement } from './utils'

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
  const {
    removeRejectedFile,
    triggerRef,
    dropzoneRef,
    rejectedFileDeleteButtonRefs,
    inputRef,
    disabled,
    readOnly,
    rejectedFiles,
  } = useFileUploadContext()
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
    requestAnimationFrame(() => {
      // Get all remaining rejected file delete buttons from the refs array
      const remainingButtons = rejectedFileDeleteButtonRefs.current.filter(Boolean)

      if (remainingButtons.length > 0) {
        // Find the button that should receive focus
        // We want to focus on the button that takes the same position as the removed one
        // If that position doesn't exist (we removed the last item), focus on the previous one
        const targetIndex = Math.min(rejectedFileIndex, remainingButtons.length - 1)
        const nextButton = remainingButtons[targetIndex]

        if (nextButton) {
          nextButton.focus()
        }
      } else {
        // No more rejected files, find a focusable element (trigger, dropzone, or input as last resort)
        const focusTarget = findFocusableElement(
          [triggerRef.current, dropzoneRef.current],
          inputRef
        )
        if (focusTarget) {
          focusTarget.focus()
        }
      }
    })

    onClick?.(e)
  }

  const setRef = (node: HTMLButtonElement | null) => {
    buttonRef.current = node
    if (node) {
      // Ensure the array is large enough
      while (rejectedFileDeleteButtonRefs.current.length <= rejectedFileIndex) {
        rejectedFileDeleteButtonRefs.current.push(null as any)
      }
      rejectedFileDeleteButtonRefs.current[rejectedFileIndex] = node
    } else {
      // Remove the ref when component unmounts
      if (rejectedFileDeleteButtonRefs.current[rejectedFileIndex]) {
        rejectedFileDeleteButtonRefs.current[rejectedFileIndex] = null as any
      }
    }
  }

  return (
    <IconButton
      ref={setRef}
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
