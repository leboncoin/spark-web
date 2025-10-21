import { createContext, ReactNode, Ref, useContext, useRef, useState } from 'react'

export interface FileUploadProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
  children: ReactNode
  className?: string
  /**
   * Callback when files are selected
   */
  onFilesChange?: (files: File[]) => void
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
} | null>(null)

export const FileUpload = ({
  asChild: _asChild = false,
  children,
  onFilesChange,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const dropzoneRef = useRef<HTMLElement>(null)
  const deleteButtonRefs = useRef<HTMLButtonElement[]>([])
  const [files, setFiles] = useState<File[]>([])

  const addFiles = (newFiles: File[]) => {
    setFiles(prev => {
      const updated = [...prev, ...newFiles]
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
          multiple
          name="image_uploads"
          // accept="image/png, image/jpeg"
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
