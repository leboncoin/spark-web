import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { ComponentProps, Ref } from 'react'

export interface AlertDialogTriggerProps extends ComponentProps<typeof BaseAlertDialog.Trigger> {
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogTrigger = (props: AlertDialogTriggerProps) => {
  return <BaseAlertDialog.Trigger data-spark-component="alert-dialog-trigger" {...props} />
}

AlertDialogTrigger.displayName = 'AlertDialog.Trigger'
