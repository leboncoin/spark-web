import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

import { dialogContentStyles } from '../dialog/DialogContent.styles'
import { useAlertDialog } from './AlertDialogContext'

export interface AlertDialogContentProps
  extends Omit<ComponentProps<typeof BaseAlertDialog.Popup>, 'render'> {
  ref?: Ref<HTMLDivElement>
}

export const AlertDialogContent = ({
  className,
  ref,
  initialFocus,
  ...others
}: AlertDialogContentProps) => {
  const { cancelRef } = useAlertDialog()

  // Default: focus the cancel button when dialog opens
  // Users can override by passing their own initialFocus prop (RefObject, false, true, or function)
  const handleInitialFocus = initialFocus !== undefined ? initialFocus : () => cancelRef.current

  return (
    <BaseAlertDialog.Popup
      ref={ref}
      data-spark-component="alert-dialog-content"
      role="alertdialog"
      className={state =>
        cx(
          dialogContentStyles({ size: 'md', isNarrow: true }),
          'min-w-sz-288',
          // Base UI automatically adds data-[starting-style] and data-[ending-style] attributes
          // Transition with opacity and scale for smooth open/close animations
          'transition-all duration-150',
          'data-starting-style:scale-90 data-starting-style:opacity-0',
          'data-ending-style:scale-90 data-ending-style:opacity-0',
          typeof className === 'function' ? className(state) : className
        )
      }
      initialFocus={handleInitialFocus}
      {...others}
    />
  )
}

AlertDialogContent.displayName = 'AlertDialog.Content'
