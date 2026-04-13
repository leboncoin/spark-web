import { ReactNode } from 'react'

import { type RejectedFile, useFileUploadContext } from './FileUpload'
import { formatFileSize } from './utils'

export interface FileUploadContextProps {
  /**
   * Render prop that receives acceptedFiles, rejectedFiles, formatFileSize, and locale
   */
  children: (props: {
    acceptedFiles: File[]
    rejectedFiles: RejectedFile[]
    formatFileSize: (bytes: number, locale?: string) => string
    locale?: string
  }) => ReactNode
}

/** A render prop component providing access to file upload state and utilities. Renders its children. */
export const Context = ({ children }: FileUploadContextProps) => {
  const { files = [], rejectedFiles = [], locale } = useFileUploadContext()

  return (
    <>
      {children({
        acceptedFiles: files,
        rejectedFiles,
        formatFileSize,
        locale,
      })}
    </>
  )
}

Context.displayName = 'FileUpload.Context'
