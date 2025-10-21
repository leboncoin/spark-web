import { CvOutline } from '@spark-ui/icons/CvOutline'
import { cx } from 'class-variance-authority'
import { ReactNode, Ref } from 'react'

import { Icon } from '../icon'
import { useFileUploadContext } from './FileUpload'
import { Item } from './FileUploadItem'
import { ItemDeleteTrigger } from './FileUploadItemDeleteTrigger'
import { ItemFileName } from './FileUploadItemFileName'
import { ItemSizeText } from './FileUploadItemSizeText'

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
  const { files = [] } = useFileUploadContext()

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
              <Icon size="md">
                <CvOutline />
              </Icon>

              <div className="min-w-0 flex-1">
                <ItemFileName>{file.name}</ItemFileName>
                <ItemSizeText>{`${(file.size / 1024).toFixed(1)} KB`}</ItemSizeText>
              </div>

              <ItemDeleteTrigger aria-label="Delete file" fileIndex={index} />
            </Item>
          )
        )}
    </ul>
  )
}

FilesPreview.displayName = 'FileUpload.FilesPreview'
