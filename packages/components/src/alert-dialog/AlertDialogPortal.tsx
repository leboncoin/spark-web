import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps } from 'react'

export type AlertDialogPortalProps = ComponentProps<typeof BaseAlertDialog.Portal>

export const AlertDialogPortal = ({ className, ...props }: AlertDialogPortalProps) => {
  return (
    <BaseAlertDialog.Portal
      data-spark-component="alert-dialog-portal"
      className={cx(className, 'z-modal absolute')}
      {...props}
    />
  )
}

AlertDialogPortal.displayName = 'AlertDialog.Portal'
