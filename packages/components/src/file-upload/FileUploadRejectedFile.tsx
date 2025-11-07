import { WarningOutline } from '@spark-ui/icons/WarningOutline'
import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref } from 'react'

import { Icon } from '../icon'
import {
  type FileUploadFileError,
  type RejectedFile as RejectedFileType,
  useFileUploadContext,
} from './FileUpload'
import { Item } from './FileUploadItem'
import { ItemFileName } from './FileUploadItemFileName'
import { ItemSizeText } from './FileUploadItemSizeText'
import { formatFileSize } from './utils'

export interface FileUploadRejectedFileProps extends ComponentPropsWithoutRef<'li'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLLIElement>
  /**
   * The rejected file to display
   */
  rejectedFile: RejectedFileType
  /**
   * Function to render the error message for each error code
   * @param error - The error code
   * @returns The error message to display
   */
  renderError: (error: FileUploadFileError) => string
  className?: string
}

export const RejectedFile = ({
  asChild: _asChild = false,
  className,
  rejectedFile,
  renderError,
  ...props
}: FileUploadRejectedFileProps) => {
  const { locale } = useFileUploadContext()

  return (
    <Item className={cx('border-error border-md', className)} {...props}>
      <div className="size-sz-40 bg-error-container flex items-center justify-center rounded-md">
        <Icon size="md" className="text-error">
          <WarningOutline />
        </Icon>
      </div>

      <div className="min-w-0 flex-1">
        <div className="gap-md flex flex-col">
          <div className="gap-md flex flex-row items-center justify-between">
            <ItemFileName>{rejectedFile.file.name}</ItemFileName>
            <ItemSizeText className="opacity-dim-1">
              {formatFileSize(rejectedFile.file.size, locale)}
            </ItemSizeText>
          </div>
          <div className="gap-xs flex flex-col">
            {rejectedFile.errors.map((error, errorIndex) => (
              <div key={errorIndex} className="text-caption text-error" data-error-code={error}>
                {renderError(error)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Item>
  )
}

RejectedFile.displayName = 'FileUpload.RejectedFile'
