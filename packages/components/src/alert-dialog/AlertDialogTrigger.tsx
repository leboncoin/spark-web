import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { ComponentProps, Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface AlertDialogTriggerProps
  extends Omit<ComponentProps<typeof BaseAlertDialog.Trigger>, 'render'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogTrigger = ({ asChild = false, ...props }: AlertDialogTriggerProps) => {
  const renderSlot = useRenderSlot(asChild, 'button')

  return (
    <BaseAlertDialog.Trigger
      data-spark-component="alert-dialog-trigger"
      render={renderSlot}
      {...props}
    />
  )
}

AlertDialogTrigger.displayName = 'AlertDialog.Trigger'
