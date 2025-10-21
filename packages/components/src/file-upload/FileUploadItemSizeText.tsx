import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'

export interface FileUploadItemSizeTextProps extends ComponentPropsWithoutRef<'p'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLParagraphElement>
  className?: string
  children?: ReactNode
}

export const ItemSizeText = ({
  asChild: _asChild = false,
  className,
  children,
  ...props
}: FileUploadItemSizeTextProps) => {
  return (
    <p
      data-spark-component="file-upload-item-size-text"
      className={cx('text-caption text-on-surface/dim-2', className)}
      {...props}
    >
      {children}
    </p>
  )
}

ItemSizeText.displayName = 'FileUpload.ItemSizeText'
