import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { ComponentProps, Ref } from 'react'

import { useAlertDialog } from './AlertDialogContext'

export interface AlertDialogCancelProps extends Omit<
  ComponentProps<typeof BaseAlertDialog.Close>,
  'render'
> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * A button that closes the dialog without confirming the action. Renders a <button> element.
 */
export const AlertDialogCancel = ({
  asChild = false,
  ref: forwardedRef,
  children,
  ...props
}: AlertDialogCancelProps) => {
  const { cancelRef } = useAlertDialog()
  const ref = useMergeRefs(forwardedRef, cancelRef)
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseAlertDialog.Close
      ref={ref}
      data-spark-component="alert-dialog-cancel"
      render={renderProp}
      {...props}
    >
      {innerChildren}
    </BaseAlertDialog.Close>
  )
}

AlertDialogCancel.displayName = 'AlertDialog.Cancel'
