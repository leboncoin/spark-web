import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

export interface AlertDialogOverlayProps
  extends Omit<ComponentProps<typeof BaseAlertDialog.Backdrop>, 'render'> {
  ref?: Ref<HTMLDivElement>
}

export const AlertDialogOverlay = ({ className, ...props }: AlertDialogOverlayProps) => {
  return (
    <BaseAlertDialog.Backdrop
      data-spark-component="alert-dialog-overlay"
      className={state =>
        cx(
          'z-overlay fixed top-0 left-0 h-screen w-screen',
          'bg-overlay/dim-1',
          // Base UI automatically adds data-[starting-style] and data-[ending-style] attributes
          'data-[starting-style]:animate-fade-in',
          'data-[ending-style]:animate-fade-out',
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
}

AlertDialogOverlay.displayName = 'AlertDialog.Overlay'
