import { Ref } from 'react'

import { Dialog, DialogCloseProps } from '../dialog'

export type AlertDialogActionProps = DialogCloseProps & {
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogAction = (props: AlertDialogActionProps) => {
  return <Dialog.Close data-spark-component="alert-dialog-action" {...props} />
}

AlertDialogAction.displayName = 'AlertDialog.Action'
