import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog'
import { ComponentProps, Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface AlertDialogActionProps
  extends Omit<ComponentProps<typeof BaseAlertDialog.Close>, 'render'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogAction = ({ asChild = false, ...props }: AlertDialogActionProps) => {
  const renderSlot = useRenderSlot(asChild, 'button')

  return (
    <BaseAlertDialog.Close
      data-spark-component="alert-dialog-action"
      render={renderSlot}
      {...props}
    />
  )
}

AlertDialogAction.displayName = 'AlertDialog.Action'
