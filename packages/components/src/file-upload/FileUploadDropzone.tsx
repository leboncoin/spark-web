import { cx } from 'class-variance-authority'
import { useRef } from 'react'

import { useFileUploadContext } from './FileUpload'

export function Dropzone({
  children,
  onFiles,
  className,
  unstyled = false,
}: {
  children?: React.ReactNode
  onFiles?: (files: FileList) => void
  className?: string
  unstyled?: boolean
}) {
  const ctx = useFileUploadContext()
  const dropzoneRef = useRef<HTMLDivElement>(null)

  if (!ctx) throw new Error('FileUploadDropzone must be used inside <FileUpload>')

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.setAttribute('data-drag-over', 'false')

    // Don't allow dropping files when disabled or readOnly
    if (ctx.disabled || ctx.readOnly) {
      return
    }

    const files = e.dataTransfer.files
    onFiles?.(files)

    // Add files to the context
    // Convert to array - handle both FileList and array (for tests)
    let filesArray: File[] = []
    if (files) {
      filesArray = Array.isArray(files) ? [...files] : Array.from(files)
    }

    if (filesArray.length > 0) {
      ctx.addFiles(filesArray)
    }
  }

  const handleClick = () => {
    if (!ctx.disabled && !ctx.readOnly) {
      ctx.inputRef.current?.click()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!ctx.disabled && !ctx.readOnly) {
        ctx.inputRef.current?.click()
      }
    }
  }

  const isDisabled = ctx.disabled || ctx.readOnly

  return (
    <div
      ref={node => {
        dropzoneRef.current = node
        if (ctx.dropzoneRef) {
          ctx.dropzoneRef.current = node
        }
      }}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={ctx.disabled ? true : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDrop={handleDrop}
      onDragOver={e => {
        e.preventDefault()
      }}
      className={
        unstyled
          ? className
          : cx(
              'default:bg-surface default:border-sm default:border-outline default:rounded-lg default:border-dashed',
              'gap-lg flex flex-col items-center justify-center text-center',
              'default:p-xl',
              'transition-colors duration-200',
              !isDisabled && 'hover:bg-surface-hovered',
              'data-[drag-over=true]:border-outline-high data-[drag-over=true]:bg-surface-hovered data-[drag-over=true]:border-solid',
              // Disabled: more visually disabled (opacity + cursor)
              ctx.disabled && 'cursor-not-allowed opacity-50',
              // ReadOnly: less visually disabled (just cursor, no opacity)
              ctx.readOnly && !ctx.disabled && 'cursor-default',
              className
            )
      }
      onDragEnter={e => {
        if (!isDisabled) {
          e.currentTarget.setAttribute('data-drag-over', 'true')
        }
      }}
      onDragLeave={e => {
        e.currentTarget.setAttribute('data-drag-over', 'false')
      }}
    >
      {children}
    </div>
  )
}

Dropzone.displayName = 'FileUploadDropzone'
