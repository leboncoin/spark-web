import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { ComponentProps, Ref } from 'react'

export interface AlertDialogActionProps extends ComponentProps<typeof BaseAlertDialog.Close> {
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogAction = (props: AlertDialogActionProps) => {
  return <BaseAlertDialog.Close data-spark-component="alert-dialog-action" {...props} />
}

AlertDialogAction.displayName = 'AlertDialog.Action'
