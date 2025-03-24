import { cx } from 'class-variance-authority'
import { Dialog as RadixDrawer } from 'radix-ui'
import { type ReactElement, Ref } from 'react'

export type DrawerOverlayProps = RadixDrawer.DialogOverlayProps & {
  ref?: Ref<HTMLDivElement>
}

export const DrawerOverlay = ({ className, ref, ...rest }: DrawerOverlayProps): ReactElement => (
  <RadixDrawer.Overlay
    ref={ref}
    className={cx(
      ['fixed', 'top-0', 'left-0', 'w-screen', 'h-screen', 'z-overlay'],
      ['bg-overlay/dim-3'],
      ['data-[state=open]:animate-fade-in'],
      ['data-[state=closed]:animate-fade-out'],
      className
    )}
    {...rest}
  />
)

DrawerOverlay.displayName = 'Drawer.Overlay'
