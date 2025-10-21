import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref, useEffect, useState } from 'react'

export interface FileUploadPreviewImageProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
  className?: string
  /**
   * The file to preview
   */
  file: File
  /**
   * Fallback content when file is not an image or preview fails
   */
  fallback?: React.ReactNode
}

export const PreviewImage = ({
  asChild: _asChild = false,
  className,
  file,
  fallback = '📄',
  ...props
}: FileUploadPreviewImageProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const isImage = file.type.startsWith('image/')
  const imageUrl = isImage ? URL.createObjectURL(file) : null

  // Clean up the object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  if (!isImage || imageError) {
    return (
      <div
        data-spark-component="file-upload-preview-image"
        className={cx(
          'bg-neutral-container flex items-center justify-center rounded-md',
          className
        )}
        {...props}
      >
        {fallback}
      </div>
    )
  }

  return (
    <div
      data-spark-component="file-upload-preview-image"
      className={cx('bg-neutral-container overflow-hidden', className)}
      {...props}
    >
      <img
        src={imageUrl!}
        alt={file.name}
        className={cx('size-full object-cover', !imageLoaded && 'opacity-0')}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">{fallback}</div>
      )}
    </div>
  )
}

PreviewImage.displayName = 'FileUpload.PreviewImage'
