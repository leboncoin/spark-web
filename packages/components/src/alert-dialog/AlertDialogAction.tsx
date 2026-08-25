import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { ComponentProps, Ref } from 'react'

export interface AlertDialogActionProps extends Omit<
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
 * A button that closes the dialog and confirms the action. Renders a <button> element.
 */
export const AlertDialogAction = ({
  asChild = false,
  children,
  ...props
}: AlertDialogActionProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseAlertDialog.Close
      data-spark-component="alert-dialog-action"
      render={renderProp}
      {...props}
    >
      {innerChildren}
    </BaseAlertDialog.Close>
  )
}

AlertDialogAction.displayName = 'AlertDialog.Action'
