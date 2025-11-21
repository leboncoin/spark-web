/* eslint-disable max-lines-per-function */
import { useCombinedState } from '@spark-ui/hooks/use-combined-state'
import { useState } from 'react'

import { FILE_UPLOAD_ERRORS } from './constants'
import { validateFileAccept, validateFileSize } from './utils'

export type FileUploadFileError =
  | typeof FILE_UPLOAD_ERRORS.TOO_MANY_FILES
  | typeof FILE_UPLOAD_ERRORS.FILE_INVALID_TYPE
  | typeof FILE_UPLOAD_ERRORS.FILE_TOO_LARGE
  | typeof FILE_UPLOAD_ERRORS.FILE_TOO_SMALL
  | typeof FILE_UPLOAD_ERRORS.FILE_INVALID
  | typeof FILE_UPLOAD_ERRORS.FILE_EXISTS

export interface RejectedFile {
  file: File
  errors: FileUploadFileError[]
}

export interface FileAcceptDetails {
  files: File[]
}

export interface FileRejectDetails {
  files: RejectedFile[]
}

export interface FileChangeDetails {
  acceptedFiles: File[]
  rejectedFiles: RejectedFile[]
}

export interface UseFileUploadStateProps {
  /**
   * Initial files to display when the component mounts (uncontrolled mode)
   */
  defaultValue?: File[]
  /**
   * Controlled files value (controlled mode)
   * When provided, the component becomes controlled
   */
  value?: File[]
  /**
   * Callback when files are accepted
   */
  onFileAccept?: (details: FileAcceptDetails) => void
  /**
   * Callback when files are rejected
   */
  onFileReject?: (details: FileRejectDetails) => void
  /**
   * Callback when files change (both accepted and rejected)
   * For controlled mode, use this to update the value prop by extracting details.acceptedFiles
   */
  onFileChange?: (details: FileChangeDetails) => void
  /**
   * Whether multiple files can be selected
   * @default true
   */
  multiple?: boolean
  /**
   * Comma-separated list of accepted file types
   */
  accept?: string
  /**
   * Maximum number of files that can be uploaded
   */
  maxFiles?: number
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number
  /**
   * Minimum file size in bytes
   */
  minFileSize?: number
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
   */
  locale?: string
}

export interface UseFileUploadStateReturn {
  files: File[]
  rejectedFiles: RejectedFile[]
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  removeRejectedFile: (index: number) => void
  clearFiles: () => void
  clearRejectedFiles: () => void
  maxFilesReached: boolean
}

/**
 * Hook that manages file upload state, validation, and file operations
 */
export function useFileUploadState({
  defaultValue = [],
  value: controlledValue,
  onFileAccept,
  onFileReject,
  onFileChange,
  multiple = true,
  accept,
  maxFiles,
  maxFileSize,
  minFileSize,
  disabled = false,
  readOnly = false,
  locale,
}: UseFileUploadStateProps): UseFileUploadStateReturn {
  // Get default locale from browser or fallback to 'en'
  const defaultLocale =
    locale || (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en')

  // For controlled mode, use onFileChange to update value prop
  // useCombinedState doesn't need a callback - we'll call onFileChange manually in addFiles/removeFile
  const [filesState, setFilesState] = useCombinedState<File[]>(controlledValue, defaultValue)
  const files = filesState ?? []
  const setFiles = setFilesState as (value: File[] | ((prev: File[]) => File[])) => void
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFile[]>([])

  const addFiles = (newFiles: File[]) => {
    // Don't allow adding files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    // Reset rejectedFiles at the start of each new file addition attempt
    setRejectedFiles([])

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
    }

    setFiles((prev: File[]) => {
      const currentFiles = prev ?? []

      // Calculate remaining slots once at the beginning
      const remainingSlots = maxFiles !== undefined ? maxFiles - currentFiles.length : undefined

      // Mark all files with TOO_MANY_FILES if already at max (before other validations)
      // This allows a file to have multiple error codes (e.g., FILE_INVALID_TYPE + TOO_MANY_FILES)
      if (remainingSlots !== undefined && remainingSlots <= 0) {
        newFiles.forEach(file => {
          addRejectedFile(file, FILE_UPLOAD_ERRORS.TOO_MANY_FILES)
        })
      }

      // Track files rejected by accept pattern
      let filteredFiles = newFiles
      if (accept) {
        const rejectedByAccept = newFiles.filter(file => !validateFileAccept(file, accept))
        rejectedByAccept.forEach(file => {
          addRejectedFile(file, FILE_UPLOAD_ERRORS.FILE_INVALID_TYPE)
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
              addRejectedFile(file, FILE_UPLOAD_ERRORS.FILE_TOO_LARGE)
            } else if (minFileSize !== undefined && file.size < minFileSize) {
              addRejectedFile(file, FILE_UPLOAD_ERRORS.FILE_TOO_SMALL)
            } else {
              addRejectedFile(file, FILE_UPLOAD_ERRORS.FILE_INVALID)
            }

            return false
          }

          return true
        })
      }

      // Check for duplicate files (both against existing files and within the current batch)
      const seenFiles = new Map<string, File>()
      const uniqueFiles = validSizeFiles.filter(file => {
        // Create a unique key for the file (name + size)
        // Using name and size only, as lastModified can differ when re-selecting the same file
        const fileKey = `${file.name}-${file.size}`

        // Check if file already exists in previously accepted files
        const existsInPrev = fileExists(file, currentFiles)
        if (existsInPrev) {
          addRejectedFile(file, FILE_UPLOAD_ERRORS.FILE_EXISTS)

          return false
        }

        // Check if file already exists in the current batch
        if (seenFiles.has(fileKey)) {
          addRejectedFile(file, FILE_UPLOAD_ERRORS.FILE_EXISTS)

          return false
        }

        // Mark this file as seen
        seenFiles.set(fileKey, file)

        return true
      })

      // If multiple is false, replace existing files with only the first new file
      let filesToAdd = multiple ? uniqueFiles : uniqueFiles.slice(0, 1)

      // Apply maxFiles limit to files that passed all other validations
      if (remainingSlots !== undefined) {
        if (remainingSlots <= 0) {
          // Already at max, reject all valid files (they should already have TOO_MANY_FILES error from the first check)
          filesToAdd = []
        } else if (filesToAdd.length > remainingSlots) {
          // Reject all files if batch exceeds limit ("all or nothing" approach)
          filesToAdd.forEach(file => {
            addRejectedFile(file, FILE_UPLOAD_ERRORS.TOO_MANY_FILES)
          })
          filesToAdd = []
        }
      }

      const updated = multiple ? [...currentFiles, ...filesToAdd] : filesToAdd

      // Add rejected files to state synchronously
      // Note: newRejectedFiles is mutated inside this setFiles callback, so it should be populated by now
      // Copy the array to avoid closure issues
      const rejectedFilesToAdd = [...newRejectedFiles]
      // Replace rejectedFiles completely (not accumulate)
      setRejectedFiles(rejectedFilesToAdd)

      // Call callbacks with the calculated values
      // Note: These callbacks are called synchronously with the new values
      // React will update the state asynchronously, but the callbacks receive the correct new values
      if (filesToAdd.length > 0 && onFileAccept) {
        onFileAccept({ files: filesToAdd })
      }

      if (rejectedFilesToAdd.length > 0 && onFileReject) {
        onFileReject({ files: rejectedFilesToAdd })
      }

      if (onFileChange) {
        onFileChange({
          acceptedFiles: updated,
          rejectedFiles: rejectedFilesToAdd,
        })
      }

      return updated
    })
  }

  const removeFile = (index: number) => {
    // Don't allow removing files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    setFiles((prev: File[]) => {
      const currentFiles = prev ?? []
      const updated = currentFiles.filter((_: File, i: number) => i !== index)

      // Clean up TOO_MANY_FILES errors if we're now below the maxFiles limit
      let updatedRejectedFiles = rejectedFiles
      if (maxFiles !== undefined && updated.length < maxFiles) {
        updatedRejectedFiles = rejectedFiles.filter(
          rejected => !rejected.errors.includes(FILE_UPLOAD_ERRORS.TOO_MANY_FILES)
        )
        setRejectedFiles(updatedRejectedFiles)
      }

      // Call onFileChange for controlled mode
      if (onFileChange) {
        onFileChange({
          acceptedFiles: updated,
          rejectedFiles: updatedRejectedFiles,
        })
      }

      return updated
    })
  }

  const clearFiles = () => {
    // Don't allow clearing files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    setFiles([])
    setRejectedFiles([])

    // Call onFileChange for controlled mode
    if (onFileChange) {
      onFileChange({
        acceptedFiles: [],
        rejectedFiles: [],
      })
    }
  }

  const removeRejectedFile = (index: number) => {
    // Don't allow removing rejected files when disabled or readOnly
    if (disabled || readOnly) {
      return
    }

    setRejectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const clearRejectedFiles = () => {
    setRejectedFiles([])
  }

  const maxFilesReached = maxFiles !== undefined && files.length >= maxFiles

  return {
    files,
    rejectedFiles,
    addFiles,
    removeFile,
    removeRejectedFile,
    clearFiles,
    clearRejectedFiles,
    maxFilesReached,
  }
}
