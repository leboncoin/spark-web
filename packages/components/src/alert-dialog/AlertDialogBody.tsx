import { Ref } from 'react'

import { Dialog, DialogBodyProps } from '../dialog'

export type AlertDialogBodyProps = DialogBodyProps & {
  ref?: Ref<HTMLDivElement>
}

export const AlertDialogBody = (props: AlertDialogBodyProps) => {
  return <Dialog.Body data-spark-component="alert-dialog-body" {...props} />
}

AlertDialogBody.displayName = 'AlertDialog.Body'
