import { Ref } from 'react'

import { Dialog, DialogHeaderProps } from '../dialog'

export type AlertDialogHeaderProps = DialogHeaderProps & {
  ref?: Ref<HTMLDivElement>
}

export const AlertDialogHeader = (props: AlertDialogHeaderProps) => {
  return <Dialog.Header data-spark-component="alert-dialog-header" {...props} />
}

AlertDialogHeader.displayName = 'AlertDialog.Header'
