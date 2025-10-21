import { Close } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'
import { useRef } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { useFileUploadContext } from './FileUpload'

export interface FileUploadItemDeleteTriggerProps extends React.ComponentProps<typeof IconButton> {
  /**
   * Index of the file to delete
   */
  fileIndex: number
}

export const ItemDeleteTrigger = ({
  className,
  fileIndex,
  onClick,
  ...props
}: FileUploadItemDeleteTriggerProps) => {
  const { removeFile, triggerRef, dropzoneRef, deleteButtonRefs } = useFileUploadContext()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Remove the file
    removeFile(fileIndex)

    // Handle focus after removal
    setTimeout(() => {
      // Get all remaining delete buttons from the refs array
      const remainingButtons = deleteButtonRefs.current.filter(Boolean)

      if (remainingButtons.length > 0) {
        // Find the button that should receive focus
        // We want to focus on the button that takes the same position as the removed one
        // If that position doesn't exist (we removed the last item), focus on the previous one
        const targetIndex = Math.min(fileIndex, remainingButtons.length - 1)
        const nextButton = remainingButtons[targetIndex]

        if (nextButton) {
          nextButton.focus()
        }
      } else {
        // No more files, focus on trigger or dropzone
        const focusTarget = triggerRef.current || dropzoneRef.current
        if (focusTarget) {
          focusTarget.focus()
        }
      }
    }, 0)

    onClick?.(e)
  }

  const setRef = (node: HTMLButtonElement | null) => {
    buttonRef.current = node
    if (node) {
      // Ensure the array is large enough
      while (deleteButtonRefs.current.length <= fileIndex) {
        deleteButtonRefs.current.push(null as any)
      }
      deleteButtonRefs.current[fileIndex] = node
    } else {
      // Remove the ref when component unmounts
      if (deleteButtonRefs.current[fileIndex]) {
        deleteButtonRefs.current[fileIndex] = null as any
      }
    }
  }

  return (
    <IconButton
      ref={setRef}
      data-spark-component="file-upload-item-delete-trigger"
      className={cx(className)}
      onClick={handleClick}
      size="sm"
      design="ghost"
      intent="surfaceInverse"
      {...props}
    >
      <Icon size="sm">
        <Close />
      </Icon>
    </IconButton>
  )
}

ItemDeleteTrigger.displayName = 'FileUpload.ItemDeleteTrigger'
