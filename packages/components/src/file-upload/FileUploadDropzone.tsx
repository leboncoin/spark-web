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
    const files = e.dataTransfer.files
    onFiles?.(files)

    // Add files to the context
    ctx.addFiles(Array.from(files))
    if (ctx.inputRef.current) {
      // Optionnel : pour déclencher l'événement "change"
      const dataTransfer = new DataTransfer()
      Array.from(files).forEach(f => dataTransfer.items.add(f))
      ctx.inputRef.current.files = dataTransfer.files
      ctx.inputRef.current.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }

  const handleClick = () => {
    ctx.inputRef.current?.click()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      ctx.inputRef.current?.click()
    }
  }

  return (
    <div
      ref={node => {
        dropzoneRef.current = node
        if (ctx.dropzoneRef) {
          ctx.dropzoneRef.current = node
        }
      }}
      role="button"
      tabIndex={0}
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
              'hover:bg-surface-hovered',
              'data-[drag-over=true]:border-outline-high data-[drag-over=true]:bg-surface-hovered data-[drag-over=true]:border-solid',
              className
            )
      }
      onDragEnter={e => {
        e.currentTarget.setAttribute('data-drag-over', 'true')
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
