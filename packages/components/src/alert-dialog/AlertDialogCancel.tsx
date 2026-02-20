import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { ComponentProps, Ref } from 'react'

import { useAlertDialog } from './AlertDialogContext'

export interface AlertDialogCancelProps extends ComponentProps<typeof BaseAlertDialog.Close> {
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogCancel = ({ ref: forwardedRef, ...props }: AlertDialogCancelProps) => {
  const { cancelRef } = useAlertDialog()
  const ref = useMergeRefs(forwardedRef, cancelRef)

  return <BaseAlertDialog.Close ref={ref} data-spark-component="alert-dialog-cancel" {...props} />
}

AlertDialogCancel.displayName = 'AlertDialog.Cancel'
