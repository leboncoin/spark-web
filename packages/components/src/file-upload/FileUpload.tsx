/* eslint-disable max-lines-per-function */
import { createContext, ReactNode, Ref, useContext, useRef, useState } from 'react'

import { validateFileAccept, validateFileSize } from './utils'

export interface FileUploadProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
  children: ReactNode
  className?: string
  /**
   * Initial files to display when the component mounts
   */
  defaultValue?: File[]
  /**
   * Callback when files are selected
   */
  onFilesChange?: (files: File[]) => void
  /**
   * Whether multiple files can be selected
   * @default true
   */
  multiple?: boolean
  /**
   * Comma-separated list of accepted file types
   * Supports MIME types (e.g., "image/*", "image/png", "application/pdf")
   * and file extensions (e.g., ".pdf", ".doc", ".jpg")
   * @example "image/*"
   * @example ".pdf,.doc"
   * @example "image/png,image/jpeg,.pdf"
   */
  accept?: string
  /**
   * Maximum number of files that can be uploaded
   * Files beyond this limit will be rejected
   */
  maxFiles?: number
  /**
   * Callback when the maximum number of files is reached
   * @param maxFiles - The maximum number of files allowed
   * @param rejectedCount - The number of files that were rejected
   */
  onMaxFilesReached?: (maxFiles: number, rejectedCount: number) => void
  /**
   * Maximum file size in bytes
   * Files larger than this will be rejected
   */
  maxFileSize?: number
  /**
   * Minimum file size in bytes
   * Files smaller than this will be rejected
   */
  minFileSize?: number
  /**
   * Callback when a file size validation error occurs
   * @param file - The file that failed validation
   * @param error - The error message
   */
  onFileSizeError?: (file: File, error: string) => void
  /**
   * When `true`, prevents the user from interacting with the file upload
   */
  disabled?: boolean
  /**
   * When `true`, sets the file upload to read-only mode
   */
  readOnly?: boolean
  /**
   * The [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the locale.
   * Used for formatting file sizes and error messages.
   * @default Browser locale or 'en' if not available
   */
  locale?: string
}

export const FileUploadContext = createContext<{
  inputRef: React.RefObject<HTMLInputElement | null>
  files: File[]
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  clearFiles: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  dropzoneRef: React.RefObject<HTMLElement | null>
  deleteButtonRefs: React.MutableRefObject<HTMLButtonElement[]>
  multiple: boolean
  maxFiles?: number
  maxFilesReached: boolean
  disabled: boolean
  readOnly: boolean
  locale: string
} | null>(null)

export const FileUpload = ({
  asChild: _asChild = false,
  children,
  defaultValue = [],
  onFilesChange,
  multiple = true,
  accept,
  maxFiles,
  onMaxFilesReached,
  maxFileSize,
  minFileSize,
  onFileSizeError,
  disabled = false,
  readOnly = false,
  locale,
}: FileUploadProps) => {
  // Get default locale from browser or fallback to 'en'
  const defaultLocale =
    locale || (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en')

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const dropzoneRef = useRef<HTMLElement>(null)
  const deleteButtonRefs = useRef<HTMLButtonElement[]>([])
  const [files, setFiles] = useState<File[]>(defaultValue)

  const addFiles = (newFiles: File[]) => {
    // Don't allow adding files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    setFiles(prev => {
      // Filter files by accept pattern if provided
      let filteredFiles = newFiles
      if (accept) {
        filteredFiles = newFiles.filter(file => validateFileAccept(file, accept))
      }

      // Filter files by size if provided
      if (minFileSize !== undefined || maxFileSize !== undefined) {
        filteredFiles = filteredFiles.filter(file => {
          const validation = validateFileSize(file, minFileSize, maxFileSize, defaultLocale)
          if (!validation.valid && validation.error) {
            onFileSizeError?.(file, validation.error)
          }

          return validation.valid
        })
      }

      // If multiple is false, replace existing files with only the first new file
      let filesToAdd = multiple ? filteredFiles : filteredFiles.slice(0, 1)

      // Apply maxFiles limit if provided
      if (maxFiles !== undefined) {
        const currentCount = prev.length
        const remainingSlots = maxFiles - currentCount

        if (remainingSlots <= 0) {
          // Already at max, reject all new files
          onMaxFilesReached?.(maxFiles, filesToAdd.length)

          return prev
        }

        if (filesToAdd.length > remainingSlots) {
          // Too many files, only take what fits
          const rejectedCount = filesToAdd.length - remainingSlots
          onMaxFilesReached?.(maxFiles, rejectedCount)
          filesToAdd = filesToAdd.slice(0, remainingSlots)
        }
      }

      const updated = multiple ? [...prev, ...filesToAdd] : filesToAdd
      onFilesChange?.(updated)

      return updated
    })
  }

  const removeFile = (index: number) => {
    // Don't allow removing files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    setFiles(prev => {
      const updated = prev.filter((_, i) => i !== index)
      onFilesChange?.(updated)

      return updated
    })
  }

  const clearFiles = () => {
    // Don't allow clearing files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    setFiles([])
    onFilesChange?.([])
    deleteButtonRefs.current = []
  }

  const maxFilesReached = maxFiles !== undefined && files.length >= maxFiles

  return (
    <FileUploadContext.Provider
      value={{
        inputRef,
        files,
        addFiles,
        removeFile,
        clearFiles,
        triggerRef,
        dropzoneRef,
        deleteButtonRefs,
        multiple,
        maxFiles,
        maxFilesReached,
        disabled,
        readOnly,
        locale: defaultLocale,
      }}
    >
      {/* <Comp data-spark-component="file-upload" className={cx('relative', className)} {...props}> */}
      <div className="relative">
        {children}
        <input
          ref={inputRef}
          type="file"
          tabIndex={-1}
          id="image_uploads"
          multiple={multiple}
          name="image_uploads"
          accept={accept}
          disabled={disabled}
          readOnly={readOnly && !disabled}
          className="sr-only"
          onChange={e => {
            if (e.target.files && !disabled && !readOnly) {
              addFiles(Array.from(e.target.files))
            }
          }}
        />
      </div>
      {/* </Comp> */}
    </FileUploadContext.Provider>
  )
}

FileUpload.displayName = 'FileUpload'

export const useFileUploadContext = () => {
  const context = useContext(FileUploadContext)

  if (!context) {
    throw Error('useFileUploadContext must be used within a FileUpload provider')
  }

  return context
}
