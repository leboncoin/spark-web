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
} | null>(null)

export const FileUpload = ({
  asChild: _asChild = false,
  children,
  defaultValue = [],
  onFilesChange,
  multiple = true,
  accept,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const dropzoneRef = useRef<HTMLElement>(null)
  const deleteButtonRefs = useRef<HTMLButtonElement[]>([])
  const [files, setFiles] = useState<File[]>(defaultValue)

  const addFiles = (newFiles: File[]) => {
    setFiles(prev => {
      // Filter files by accept pattern if provided
      let filteredFiles = newFiles
      if (accept) {
        filteredFiles = newFiles.filter(file => validateFileAccept(file, accept))
      }

      // If multiple is false, replace existing files with only the first new file
      const filesToAdd = multiple ? filteredFiles : filteredFiles.slice(0, 1)
      const updated = multiple ? [...prev, ...filesToAdd] : filesToAdd
      onFilesChange?.(updated)

      return updated
    })
  }

  const removeFile = (index: number) => {
    setFiles(prev => {
      const updated = prev.filter((_, i) => i !== index)
      onFilesChange?.(updated)

      return updated
    })
  }

  const clearFiles = () => {
    setFiles([])
    onFilesChange?.([])
    deleteButtonRefs.current = []
  }

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
          className="sr-only"
          onChange={e => {
            if (e.target.files) {
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
