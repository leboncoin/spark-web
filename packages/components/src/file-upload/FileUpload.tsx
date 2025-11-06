/* eslint-disable max-lines-per-function */
import { createContext, ReactNode, Ref, useContext, useRef, useState } from 'react'

/**
 * Validates if a file matches the accept patterns
 * Supports MIME types (e.g., "image/*", "image/png", "application/pdf")
 * and file extensions (e.g., ".pdf", ".doc", ".jpg")
 */
function validateFileAccept(file: File, accept: string): boolean {
  if (!accept) {
    return true
  }

  const patterns = accept.split(',').map(pattern => pattern.trim())

  return patterns.some(pattern => {
    // Handle MIME type patterns (e.g., "image/*", "image/png")
    if (pattern.includes('/')) {
      if (pattern.endsWith('/*')) {
        // Wildcard MIME type (e.g., "image/*")
        const baseType = pattern.slice(0, -2)

        return file.type.startsWith(baseType + '/')
      }
      // Exact MIME type (e.g., "image/png")

      return file.type === pattern
    }

    // Handle file extension patterns (e.g., ".pdf", ".doc")
    if (pattern.startsWith('.')) {
      const extension = pattern.toLowerCase()
      const fileName = file.name.toLowerCase()

      return fileName.endsWith(extension)
    }

    // Handle extension without dot (e.g., "pdf", "doc")
    const extension = '.' + pattern.toLowerCase()
    const fileName = file.name.toLowerCase()

    return fileName.endsWith(extension)
  })
}

/**
 * Validates if a file size is within the allowed range
 * @param file - The file to validate
 * @param minFileSize - Minimum file size in bytes
 * @param maxFileSize - Maximum file size in bytes
 * @returns Object with validation result and error message if invalid
 */
function validateFileSize(
  file: File,
  minFileSize?: number,
  maxFileSize?: number
): { valid: boolean; error?: string } {
  if (minFileSize !== undefined && file.size < minFileSize) {
    return {
      valid: false,
      error: `File "${file.name}" is too small. Minimum size is ${formatFileSize(minFileSize)}.`,
    }
  }

  if (maxFileSize !== undefined && file.size > maxFileSize) {
    return {
      valid: false,
      error: `File "${file.name}" is too large. Maximum size is ${formatFileSize(maxFileSize)}.`,
    }
  }

  return { valid: true }
}

/**
 * Formats file size in bytes to human-readable format
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
}

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
}: FileUploadProps) => {
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
          const validation = validateFileSize(file, minFileSize, maxFileSize)
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
