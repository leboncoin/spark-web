import { Dialog, DialogProps } from '../dialog'

export type AlertDialogProps = Omit<DialogProps, 'modal'>

export const AlertDialog = (props: AlertDialogProps) => {
  return <Dialog data-spark-component="alert-dialog" {...props} modal={true} />
}

AlertDialog.displayName = 'AlertDialog'
