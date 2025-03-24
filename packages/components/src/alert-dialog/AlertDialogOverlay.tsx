import { Ref } from 'react'

import { Dialog, DialogOverlayProps } from '../dialog'

export type AlertDialogOverlayProps = DialogOverlayProps & {
  ref?: Ref<HTMLDivElement>
}

export const AlertDialogOverlay = (props: AlertDialogOverlayProps) => {
  return <Dialog.Overlay data-spark-component="alert-dialog-overlay" {...props} />
}

AlertDialogOverlay.displayName = 'AlertDialog.Overlay'
