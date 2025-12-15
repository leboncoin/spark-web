import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { ComponentProps, Ref, useRef } from 'react'

import { AlertDialogProvider } from './AlertDialogContext'

export interface AlertDialogProps
  extends Omit<ComponentProps<typeof BaseAlertDialog.Root>, 'onOpenChange' | 'render'> {
  /**
   * Specifies if the dialog is open or not.
   */
  open?: boolean
  /**
   * Default open state.
   */
  defaultOpen?: boolean
  /**
   * Handler executed on every dialog open state change.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Specifies if the dialog should have a fade animation on its body (in case it is scrollable).
   */
  withFade?: boolean
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

export const AlertDialog = ({ onOpenChange, withFade = false, ...props }: AlertDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  const handleOpenChange = onOpenChange
    ? (open: boolean, _eventDetails: unknown) => {
        onOpenChange(open)
      }
    : undefined

  return (
    <AlertDialogProvider withFade={withFade} cancelRef={cancelRef}>
      <BaseAlertDialog.Root
        data-spark-component="alert-dialog"
        onOpenChange={handleOpenChange}
        {...props}
      />
    </AlertDialogProvider>
  )
}

AlertDialog.displayName = 'AlertDialog'
