import { ComponentPropsWithoutRef, Ref } from 'react'

import { Icon } from '../icon'
import { Progress } from '../progress'
import { useFileUploadContext } from './FileUpload'
import { Item } from './FileUploadItem'
import { ItemDeleteTrigger } from './FileUploadItemDeleteTrigger'
import { ItemFileName } from './FileUploadItemFileName'
import { ItemSizeText } from './FileUploadItemSizeText'
import { formatFileSize, getFileIcon } from './utils'

export interface FileUploadAcceptedFileProps extends ComponentPropsWithoutRef<'li'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLLIElement>
  /**
   * The file to display
   */
  file: File
  /**
   * The index of the file in the accepted files array
   */
  fileIndex: number
  /**
   * Upload progress value (0-100). When provided, displays a progress bar at the bottom of the file item.
   */
  uploadProgress?: number
  /**
   * Accessible label for the delete button
   */
  deleteButtonAriaLabel: string
  /**
   * Accessible label for the progress bar. Required when uploadProgress is provided.
   */
  progressAriaLabel?: string
  className?: string
}

export const AcceptedFile = ({
  asChild: _asChild = false,
  className,
  file,
  fileIndex,
  uploadProgress,
  deleteButtonAriaLabel,
  progressAriaLabel,
  ...props
}: FileUploadAcceptedFileProps) => {
  const { locale } = useFileUploadContext()

  return (
    <Item className={className} {...props}>
      <div className="size-sz-40 bg-support-container flex items-center justify-center rounded-md">
        <Icon size="md">{getFileIcon(file)}</Icon>
      </div>

      <div className="min-w-0 flex-1">
        <div className="gap-md flex flex-row items-center justify-between">
          <ItemFileName>{file.name}</ItemFileName>
          <ItemSizeText className="opacity-dim-1">{formatFileSize(file.size, locale)}</ItemSizeText>
        </div>
        {uploadProgress !== undefined && (
          <div className="mt-md">
            <Progress value={uploadProgress} max={100} aria-label={progressAriaLabel} />
          </div>
        )}
      </div>

      <ItemDeleteTrigger aria-label={deleteButtonAriaLabel} fileIndex={fileIndex} />
    </Item>
  )
}

AcceptedFile.displayName = 'FileUpload.AcceptedFile'
