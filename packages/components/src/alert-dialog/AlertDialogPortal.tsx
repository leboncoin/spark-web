import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog'
import { ComponentProps } from 'react'

export type AlertDialogPortalProps = ComponentProps<typeof BaseAlertDialog.Portal>

export const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  return <BaseAlertDialog.Portal data-spark-component="alert-dialog-portal" {...props} />
}

AlertDialogPortal.displayName = 'AlertDialog.Portal'
