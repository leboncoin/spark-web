import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

export interface AlertDialogTitleProps
  extends Omit<ComponentProps<typeof BaseAlertDialog.Title>, 'render'> {
  ref?: Ref<HTMLHeadingElement>
}

export const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => {
  return (
    <BaseAlertDialog.Title
      data-spark-component="alert-dialog-title"
      className={cx('text-headline-1 text-on-surface', className)}
      {...props}
    />
  )
}

AlertDialogTitle.displayName = 'AlertDialog.Title'
