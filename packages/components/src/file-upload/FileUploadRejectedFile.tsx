import { WarningOutline } from '@spark-ui/icons/WarningOutline'
import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref } from 'react'

import { Icon } from '../icon'
import {
  type FileUploadFileError,
  type RejectedFile as RejectedFileType,
  useFileUploadContext,
} from './FileUpload'
import { RejectedFileDeleteTrigger } from './FileUploadRejectedFileDeleteTrigger'
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
  /**
   * Accessible label for the delete button
   */
  deleteButtonAriaLabel: string
  className?: string
}

export const RejectedFile = ({
  asChild: _asChild = false,
  className,
  rejectedFile,
  renderError,
  deleteButtonAriaLabel,
  ...props
}: FileUploadRejectedFileProps) => {
  const { locale } = useFileUploadContext()

  return (
    <li
      data-spark-component="file-upload-rejected-file"
      className={cx(
        'relative',
        'default:bg-surface default:border-sm default:border-outline default:p-md default:rounded-md',
        'gap-md flex items-center justify-between default:w-full',
        'border-error border-md',
        className
      )}
      {...props}
    >
      <div className="size-sz-40 bg-error-container flex items-center justify-center rounded-md">
        <Icon size="md" className="text-error">
          <WarningOutline />
        </Icon>
      </div>

      <div className="min-w-0 flex-1">
        <div className="gap-md flex flex-col">
          <div className="gap-md flex flex-row items-center justify-between">
            <p className="text-body-2 truncate font-medium">{rejectedFile.file.name}</p>
            <p className="text-caption opacity-dim-1">
              {formatFileSize(rejectedFile.file.size, locale)}
            </p>
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

      <RejectedFileDeleteTrigger aria-label={deleteButtonAriaLabel} rejectedFile={rejectedFile} />
    </li>
  )
}

RejectedFile.displayName = 'FileUpload.RejectedFile'
