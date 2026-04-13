import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps } from 'react'

export type AlertDialogPortalProps = ComponentProps<typeof BaseAlertDialog.Portal>

/**
 * A portal that renders the dialog in a different part of the DOM. Renders a <div> element.
 */
export const AlertDialogPortal = ({ className, ...props }: AlertDialogPortalProps) => {
  return (
    <BaseAlertDialog.Portal
      data-spark-component="alert-dialog-portal"
      className={cx(className, 'z-modal absolute')}
      {...props}
    />
  )
}

AlertDialogPortal.displayName = 'AlertDialog.Portal'
