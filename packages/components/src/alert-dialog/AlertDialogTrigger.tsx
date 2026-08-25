import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { ComponentProps, Ref } from 'react'

export interface AlertDialogTriggerProps extends Omit<
  ComponentProps<typeof BaseAlertDialog.Trigger>,
  'render'
> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * A button that opens the alert dialog. Renders a <button> element.
 */
export const AlertDialogTrigger = ({
  asChild = false,
  children,
  ...props
}: AlertDialogTriggerProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseAlertDialog.Trigger
      data-spark-component="alert-dialog-trigger"
      render={renderProp}
      {...props}
    >
      {innerChildren}
    </BaseAlertDialog.Trigger>
  )
}

AlertDialogTrigger.displayName = 'AlertDialog.Trigger'
