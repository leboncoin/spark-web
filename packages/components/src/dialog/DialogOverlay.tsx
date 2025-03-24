import { cx } from 'class-variance-authority'
import { Dialog as RadixDialog } from 'radix-ui'
import { type ReactElement, Ref } from 'react'

import { useDialog } from './DialogContext'

export type OverlayProps = RadixDialog.DialogOverlayProps & {
  ref?: Ref<HTMLDivElement>
}

export const Overlay = ({ className, ref, ...rest }: OverlayProps): ReactElement | null => {
  const { isFullScreen } = useDialog()

  return (
    <RadixDialog.Overlay
      ref={ref}
      className={cx(
        isFullScreen ? 'hidden' : 'fixed',
        ['top-0', 'left-0', 'w-screen', 'h-screen', 'z-overlay'],
        ['bg-overlay/dim-3'],
        ['data-[state=open]:animate-fade-in'],
        ['data-[state=closed]:animate-fade-out'],
        className
      )}
      {...rest}
    />
  )
}

Overlay.displayName = 'Dialog.Overlay'
