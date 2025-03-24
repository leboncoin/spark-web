import { Ref } from 'react'

import { Dialog, DialogFooterProps } from '../dialog'

export type AlertDialogFooterProps = DialogFooterProps & {
  ref?: Ref<HTMLDivElement>
}

export const AlertDialogFooter = (props: AlertDialogFooterProps) => {
  return <Dialog.Footer data-spark-component="alert-dialog-footer" {...props} />
}

AlertDialogFooter.displayName = 'AlertDialog.Footer'
