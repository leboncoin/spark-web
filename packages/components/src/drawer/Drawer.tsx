import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, type ReactElement } from 'react'

import { DrawerProvider } from './DrawerContext'

export interface DrawerProps extends Omit<ComponentProps<typeof BaseDialog.Root>, 'onOpenChange'> {
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
   * Specifies if the dialog is a modal.
   */
  modal?: boolean
  /**
   * Specifies if the drawer should have a fade animation on its body (in case it is scrollable).
   */
  withFade?: boolean
}

export const Drawer = ({ onOpenChange, withFade = false, ...props }: DrawerProps): ReactElement => {
  const handleOpenChange = onOpenChange
    ? (open: boolean, _eventDetails: unknown) => {
        onOpenChange(open)
      }
    : undefined

  return (
    <DrawerProvider withFade={withFade}>
      <BaseDialog.Root data-spark-component="drawer" onOpenChange={handleOpenChange} {...props} />
    </DrawerProvider>
  )
}

Drawer.displayName = 'Drawer.Root'
