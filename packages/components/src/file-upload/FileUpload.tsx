/* eslint-disable max-lines-per-function */
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { createContext, ReactNode, Ref, useContext, useId, useRef } from 'react'

import {
  type FileAcceptDetails,
  type FileChangeDetails,
  type FileRejectDetails,
  type FileUploadFileError,
  type RejectedFile,
  useFileUploadState,
} from './useFileUploadState'

// Re-export types for backward compatibility
export type {
  FileAcceptDetails,
  FileChangeDetails,
  FileRejectDetails,
  FileUploadFileError,
  RejectedFile,
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
   * @param details - Details about the accepted files
   */
  onFileAccept?: (details: FileAcceptDetails) => void
  /**
   * Callback when files are rejected
   * @param details - Details about the rejected files and their errors
   */
  onFileReject?: (details: FileRejectDetails) => void
  /**
   * Callback when files change (both accepted and rejected)
   * For controlled mode, use this to update the value prop by extracting details.acceptedFiles
   * @param details - Details about both accepted and rejected files
   */
  onFileChange?: (details: FileChangeDetails) => void
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
  rejectedFiles: RejectedFile[]
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  removeRejectedFile: (index: number) => void
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
  description?: string
  isInvalid?: boolean
  isRequired?: boolean
} | null>(null)

const ID_PREFIX = ':file-upload'

export const FileUpload = ({
  asChild: _asChild = false,
  children,
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
  disabled: disabledProp = false,
  readOnly: readOnlyProp = false,
  locale,
}: FileUploadProps) => {
  const field = useFormFieldControl()

  // Generate unique ID if none provided by FormField
  const internalId = useId()
  const inputId = field.id || `${ID_PREFIX}-${internalId}`

  // Use FormField name or undefined (no hardcoded fallback)
  const inputName = field.name

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const dropzoneRef = useRef<HTMLElement>(null)
  const deleteButtonRefs = useRef<HTMLButtonElement[]>([])

  // Merge FormField props with component props (FormField takes precedence)
  const disabled = field.disabled ?? disabledProp
  const readOnly = field.readOnly ?? readOnlyProp

  // Use the file upload state hook to manage all file operations
  const {
    files,
    rejectedFiles,
    addFiles,
    removeFile,
    removeRejectedFile,
    clearFiles: clearFilesFromHook,
    clearRejectedFiles,
    maxFilesReached,
  } = useFileUploadState({
    defaultValue,
    value: controlledValue,
    onFileAccept,
    onFileReject,
    onFileChange,
    multiple,
    accept,
    maxFiles,
    maxFileSize,
    minFileSize,
    disabled,
    readOnly,
    locale,
  })

  // Override clearFiles to also clear deleteButtonRefs
  const clearFiles = () => {
    clearFilesFromHook()
    deleteButtonRefs.current = []
  }

  return (
    <FileUploadContext.Provider
      value={{
        inputRef,
        files,
        rejectedFiles,
        addFiles,
        removeFile,
        removeRejectedFile,
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
        locale:
          locale ||
          (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en'),
        description: field.description,
        isInvalid: field.isInvalid,
        isRequired: field.isRequired,
      }}
    >
      {/* <Comp data-spark-component="file-upload" className={cx('relative', className)} {...props}> */}
      <div className="relative">
        {children}
        <input
          ref={inputRef}
          type="file"
          tabIndex={-1}
          id={inputId}
          multiple={multiple}
          name={inputName}
          accept={accept}
          disabled={disabled}
          readOnly={readOnly && !disabled}
          required={field.isRequired}
          aria-invalid={field.isInvalid}
          aria-describedby={field.description}
          // Hardcoded aria-label is acceptable here because:
          // 1. The input is visually hidden (sr-only) and not keyboard accessible (tabIndex={-1})
          // 2. Users never interact directly with this input - they interact via Trigger/Dropzone
          // 3. Screen readers will announce the Trigger/Dropzone content (which can be translated) instead
          // 4. This is only used as a fallback when no FormField.Label is present
          aria-label={!field.labelId ? 'Upload files' : undefined}
          className="sr-only"
          onChange={e => {
            if (e.target.files && !disabled && !readOnly) {
              addFiles(Array.from(e.target.files))
              // Reset input value to allow selecting the same file again
              try {
                e.target.value = ''
              } catch {
                // Ignore error if value is read-only (e.g., in tests)
              }
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
