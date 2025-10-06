import { cx } from 'class-variance-authority'
import { createContext, ReactNode, Ref, useContext } from 'react'

import { Slot } from '../slot'

export interface FileUploadProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
  children: ReactNode
  className?: string
}

const FileUploadContext = createContext<{} | null>(null)

export const FileUpload = ({
  asChild = false,
  children,
  className,
  ref,
  ...props
}: FileUploadProps) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <FileUploadContext.Provider value={{}}>
      <Comp
        data-spark-component="file-upload"
        ref={ref}
        className={cx('relative', className)}
        {...props}
      >
        {children}
      </Comp>
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
