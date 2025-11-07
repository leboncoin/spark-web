import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'

export interface FileUploadItemFileNameProps extends ComponentPropsWithoutRef<'p'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLParagraphElement>
  className?: string
  children?: ReactNode
}

export const ItemFileName = ({
  asChild: _asChild = false,
  className,
  children,
  ...props
}: FileUploadItemFileNameProps) => {
  return (
    <p
      data-spark-component="file-upload-item-file-name"
      className={cx('text-body-2 truncate font-medium', className)}
      {...props}
    >
      {children}
    </p>
  )
}

ItemFileName.displayName = 'FileUpload.ItemFileName'
