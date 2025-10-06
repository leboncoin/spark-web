import { cx } from 'class-variance-authority'
import { ReactNode, Ref } from 'react'

import { Slot } from '../slot'

// import { useFileUploadContext } from './FileUpload'

export interface FileUploadTriggerProps {
  asChild?: boolean
  ref?: Ref<HTMLLabelElement>
  className?: string
  children: ReactNode
}

export const Trigger = ({
  asChild = false,
  className,
  children,
  ref,
  ...props
}: FileUploadTriggerProps) => {
  // const ctx = useFileUploadContext()

  const Comp = asChild ? Slot : 'label'

  return (
    <Comp
      htmlFor="image_uploads"
      ref={ref}
      data-spark-component="file-upload-trigger"
      className={cx('group group-focus:bg-accent relative', className)}
      {...props}
    >
      <input
        id="image_uploads"
        type="file"
        name="image_uploads"
        accept="image/png, image/jpeg"
        className="bg-accent absolute inset-0 opacity-0"
      />
      {children}
    </Comp>
  )
}

Trigger.displayName = 'FileUpload.Trigger'
