import { useMergeRefs } from '@spark-ui/use-merge-refs'
import { Ref } from 'react'

import { Dialog, DialogCloseProps } from '../dialog'
import { useAlertDialog } from './AlertDialogContext'

export type AlertDialogCancelProps = DialogCloseProps & {
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogCancel = ({ ref: forwardedRef, ...props }: AlertDialogCancelProps) => {
  const { cancelRef } = useAlertDialog()
  const ref = useMergeRefs(forwardedRef, cancelRef)

  return <Dialog.Close ref={ref} data-spark-component="alert-dialog-cancel" {...props} />
}

AlertDialogCancel.displayName = 'AlertDialog.Cancel'
