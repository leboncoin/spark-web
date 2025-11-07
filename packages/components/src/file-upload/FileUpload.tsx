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

export type FileUploadFileError =
  | 'TOO_MANY_FILES'
  | 'FILE_INVALID_TYPE'
  | 'FILE_TOO_LARGE'
  | 'FILE_TOO_SMALL'
  | 'FILE_INVALID'
  | 'FILE_EXISTS'

export interface RejectedFile {
  file: File
  errors: FileUploadFileError[]
}

export const FileUploadContext = createContext<{
  inputRef: React.RefObject<HTMLInputElement | null>
  files: File[]
  rejectedFiles: RejectedFile[]
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  clearFiles: () => void
  clearRejectedFiles: () => void
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
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFile[]>([])

  const addFiles = (newFiles: File[]) => {
    // Don't allow adding files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    const newRejectedFiles: RejectedFile[] = []

    // Helper function to check if a file already exists
    // Compares by name and size to detect duplicates (lastModified can differ when re-selecting the same file)
    const fileExists = (file: File, existingFiles: File[]): boolean => {
      return existingFiles.some(
        existingFile => existingFile.name === file.name && existingFile.size === file.size
      )
    }

    // Helper function to add or update rejected file
    const addRejectedFile = (file: File, error: FileUploadFileError) => {
      const existingRejection = newRejectedFiles.find(
        rejected => rejected.file.name === file.name && rejected.file.size === file.size
      )

      if (existingRejection) {
        // Add error to existing rejection if not already present
        if (!existingRejection.errors.includes(error)) {
          existingRejection.errors.push(error)
        }
      } else {
        // Create new rejection
        newRejectedFiles.push({
          file,
          errors: [error],
        })
      }

      // Call onFileSizeError callback if provided
      if (onFileSizeError) {
        onFileSizeError(file, error)
      }
    }

    setFiles(prev => {
      // Check maxFiles limit FIRST for all files (even if they will be rejected by other validations)
      // This allows a file to have multiple error codes (e.g., FILE_INVALID_TYPE + TOO_MANY_FILES)
      if (maxFiles !== undefined) {
        const currentCount = prev.length
        const remainingSlots = maxFiles - currentCount

        if (remainingSlots <= 0) {
          // Already at max, mark all new files with TOO_MANY_FILES error
          newFiles.forEach(file => {
            addRejectedFile(file, 'TOO_MANY_FILES')
          })
        }
      }

      // Track files rejected by accept pattern
      let filteredFiles = newFiles
      if (accept) {
        const rejectedByAccept = newFiles.filter(file => !validateFileAccept(file, accept))
        rejectedByAccept.forEach(file => {
          addRejectedFile(file, 'FILE_INVALID_TYPE')
        })
        filteredFiles = newFiles.filter(file => validateFileAccept(file, accept))
      }

      // Track files rejected by size
      let validSizeFiles = filteredFiles
      if (minFileSize !== undefined || maxFileSize !== undefined) {
        validSizeFiles = filteredFiles.filter(file => {
          const validation = validateFileSize(file, minFileSize, maxFileSize, defaultLocale)
          if (!validation.valid) {
            if (maxFileSize !== undefined && file.size > maxFileSize) {
              addRejectedFile(file, 'FILE_TOO_LARGE')
            } else if (minFileSize !== undefined && file.size < minFileSize) {
              addRejectedFile(file, 'FILE_TOO_SMALL')
            } else {
              addRejectedFile(file, 'FILE_INVALID')
            }

            return false
          }

          return true
        })
      }

      // Check for duplicate files (both against existing files and within the current batch)
      // This must be done AFTER size validation but BEFORE maxFiles check
      const seenFiles = new Map<string, File>()
      const duplicateFiles: File[] = []
      const uniqueFiles = validSizeFiles.filter(file => {
        // Create a unique key for the file (name + size)
        // Using name and size only, as lastModified can differ when re-selecting the same file
        const fileKey = `${file.name}-${file.size}`

        // Check if file already exists in previously accepted files
        const existsInPrev = fileExists(file, prev)
        if (existsInPrev) {
          duplicateFiles.push(file)
          addRejectedFile(file, 'FILE_EXISTS')

          return false
        }

        // Check if file already exists in the current batch
        if (seenFiles.has(fileKey)) {
          duplicateFiles.push(file)
          addRejectedFile(file, 'FILE_EXISTS')

          return false
        }

        // Mark this file as seen
        seenFiles.set(fileKey, file)

        return true
      })

      // If multiple is false, replace existing files with only the first new file
      let filesToAdd = multiple ? uniqueFiles : uniqueFiles.slice(0, 1)

      // Track files rejected by maxFiles limit (only for files that passed other validations)
      // Note: We already checked maxFiles at the beginning for ALL files to allow multiple error codes
      // This second check is to prevent adding files when we're at the limit
      if (maxFiles !== undefined) {
        const currentCount = prev.length
        const remainingSlots = maxFiles - currentCount

        if (remainingSlots <= 0) {
          // Already at max, reject all new files (they should already have TOO_MANY_FILES error from the first check)
          filesToAdd.forEach(file => {
            addRejectedFile(file, 'TOO_MANY_FILES')
          })
          onMaxFilesReached?.(maxFiles, filesToAdd.length)
          filesToAdd = []
        } else if (filesToAdd.length > remainingSlots) {
          // Too many files, only take what fits
          const rejectedByMax = filesToAdd.slice(remainingSlots)
          rejectedByMax.forEach(file => {
            addRejectedFile(file, 'TOO_MANY_FILES')
          })
          onMaxFilesReached?.(maxFiles, rejectedByMax.length)
          filesToAdd = filesToAdd.slice(0, remainingSlots)
        }
      }

      const updated = multiple ? [...prev, ...filesToAdd] : filesToAdd
      onFilesChange?.(updated)

      // Add rejected files to state after updating accepted files
      // Note: newRejectedFiles is mutated inside this setFiles callback, so it should be populated by now
      // Copy the array to avoid closure issues with setTimeout
      const rejectedFilesToAdd = [...newRejectedFiles]
      if (rejectedFilesToAdd.length > 0) {
        // Use setTimeout to ensure this runs after the state update
        setTimeout(() => {
          setRejectedFiles(prevRejected => {
            // Filter out any duplicates that might already exist
            const existingKeys = new Set(prevRejected.map(r => `${r.file.name}-${r.file.size}`))
            const newUniqueRejected = rejectedFilesToAdd.filter(
              r => !existingKeys.has(`${r.file.name}-${r.file.size}`)
            )

            return [...prevRejected, ...newUniqueRejected]
          })
        }, 0)
      }

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

  const clearRejectedFiles = () => {
    setRejectedFiles([])
  }

  const maxFilesReached = maxFiles !== undefined && files.length >= maxFiles

  return (
    <FileUploadContext.Provider
      value={{
        inputRef,
        files,
        rejectedFiles,
        addFiles,
        removeFile,
        clearFiles,
        clearRejectedFiles,
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
              // Reset input value to allow selecting the same file again
              e.target.value = ''
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
