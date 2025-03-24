import { Dialog as RadixDialog } from 'radix-ui'
import { type ReactElement, useEffect, useRef } from 'react'

import { DialogProvider } from './DialogContext'

export interface DialogProps {
  /**
   * Children of the component.
   */
  children?: RadixDialog.DialogProps['children']
  /**
   * Specifies if the dialog is open or not.
   */
  open?: RadixDialog.DialogProps['open']
  /**
   * Default open state.
   */
  defaultOpen?: RadixDialog.DialogProps['defaultOpen']
  /**
   * Handler executen on every dialog open state change.
   */
  onOpenChange?: RadixDialog.DialogProps['onOpenChange']
  /**
   * Specifies if the dialog is a modal.
   */
  modal?: RadixDialog.DialogProps['modal']
}

export const Dialog = ({ children, ...rest }: DialogProps): ReactElement => {
  const open = rest.open
  const activeElementRef = useRef<Element>(null)

  /**
   * This function captures the active element when the Dialog is opened
   * and sets focus back to it when the Dialog is closed.
   */
  function handleActiveElementFocus() {
    if (open && document.activeElement) {
      activeElementRef.current = document.activeElement
    }

    if (!open) {
      setTimeout(() => {
        if (!(activeElementRef.current instanceof HTMLElement)) return
        activeElementRef.current.focus()
      }, 0)
    }
  }

  useEffect(handleActiveElementFocus, [open])

  return (
    <DialogProvider>
      <RadixDialog.Root {...rest}>{children}</RadixDialog.Root>
    </DialogProvider>
  )
}

Dialog.displayName = 'Dialog.Root'
