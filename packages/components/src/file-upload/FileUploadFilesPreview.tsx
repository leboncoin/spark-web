import { CvOutline } from '@spark-ui/icons/CvOutline'
import { cx } from 'class-variance-authority'
import { ReactNode, Ref } from 'react'

import { Icon } from '../icon'
import { useFileUploadContext } from './FileUpload'
import { Item } from './FileUploadItem'
import { ItemDeleteTrigger } from './FileUploadItemDeleteTrigger'
import { ItemFileName } from './FileUploadItemFileName'
import { ItemSizeText } from './FileUploadItemSizeText'
import { formatFileSize } from './utils'

export interface FileUploadFilesPreviewProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLUListElement>
  className?: string
  children?: ReactNode
  /**
   * Function to render each file preview
   */
  renderFile?: (file: File, index: number) => ReactNode
  /**
   * Function to render when no files are present
   */
  renderEmpty?: () => ReactNode
}

export const FilesPreview = ({
  asChild: _asChild = false,
  className,
  children,
  renderFile,
  renderEmpty,
  ...props
}: FileUploadFilesPreviewProps) => {
  const { files = [], locale } = useFileUploadContext()

  if (files.length === 0) {
    return renderEmpty ? (
      <ul className={cx('text-caption text-on-surface/dim-2 text-center', className)} {...props}>
        {renderEmpty()}
      </ul>
    ) : null
  }

  return (
    <ul
      data-spark-component="file-upload-files-preview"
      className={cx('gap-md my-md flex default:flex-col', className)}
      {...props}
    >
      {children ||
        files.map((file, index) =>
          renderFile ? (
            renderFile(file, index)
          ) : (
            <Item key={`${file.name}-${file.size}-${index}`}>
              <div className="size-sz-40 bg-support-container flex items-center justify-center rounded-md">
                <Icon size="md">
                  <CvOutline />
                </Icon>
              </div>

              <div className="min-w-0 flex-1">
                <div className="gap-md flex flex-row items-center justify-between">
                  <ItemFileName>{file.name}</ItemFileName>
                  <ItemSizeText className="opacity-dim-1">
                    {formatFileSize(file.size, locale)}
                  </ItemSizeText>
                </div>
              </div>

              <ItemDeleteTrigger aria-label="Delete file" fileIndex={index} />
            </Item>
          )
        )}
    </ul>
  )
}

FilesPreview.displayName = 'FileUpload.FilesPreview'
