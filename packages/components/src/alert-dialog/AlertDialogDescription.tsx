import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog'
import { ComponentProps, Ref } from 'react'

export interface AlertDialogDescriptionProps
  extends Omit<ComponentProps<typeof BaseAlertDialog.Description>, 'render'> {
  ref?: Ref<HTMLParagraphElement>
}

export const AlertDialogDescription = (props: AlertDialogDescriptionProps) => {
  return <BaseAlertDialog.Description data-spark-component="alert-dialog-description" {...props} />
}

AlertDialogDescription.displayName = 'AlertDialog.Description'
