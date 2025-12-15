import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { ComponentProps, Ref } from 'react'

import { useAlertDialog } from './AlertDialogContext'
import { useRenderSlot } from './useRenderSlot'

export interface AlertDialogCancelProps
  extends Omit<ComponentProps<typeof BaseAlertDialog.Close>, 'render'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogCancel = ({
  asChild = false,
  ref: forwardedRef,
  ...props
}: AlertDialogCancelProps) => {
  const { cancelRef } = useAlertDialog()
  const ref = useMergeRefs(forwardedRef, cancelRef)
  const renderSlot = useRenderSlot(asChild, 'button')

  return (
    <BaseAlertDialog.Close
      ref={ref}
      data-spark-component="alert-dialog-cancel"
      render={renderSlot}
      {...props}
    />
  )
}

AlertDialogCancel.displayName = 'AlertDialog.Cancel'
