import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'

export interface FileUploadItemProps extends ComponentPropsWithoutRef<'li'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLLIElement>
  children: ReactNode
  className?: string
}

export const Item = ({
  asChild: _asChild = false,
  className,
  children,
  ...props
}: FileUploadItemProps) => {
  return (
    <li
      data-spark-component="file-upload-item"
      className={cx(
        'relative',
        'default:bg-surface default:border-sm default:border-outline default:p-md default:rounded-md',
        'gap-md flex items-center justify-between default:w-full',
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

Item.displayName = 'FileUpload.Item'
