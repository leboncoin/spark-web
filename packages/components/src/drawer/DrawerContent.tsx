import { Dialog as RadixDrawer } from 'radix-ui'
import { Ref } from 'react'

import { drawerContentStyles, type DrawerContentStylesProps } from './DrawerContent.styles'

export type DrawerContentProps = RadixDrawer.DialogContentProps &
  DrawerContentStylesProps & {
    ref?: Ref<HTMLDivElement>
  }

export const DrawerContent = ({
  className,
  size = 'md',
  side = 'right',
  onInteractOutside,
  ref,
  ...rest
}: DrawerContentProps) => (
  <RadixDrawer.Content
    data-spark-component="drawer-content"
    ref={ref}
    className={drawerContentStyles({
      size,
      side,
      className,
    })}
    onInteractOutside={e => {
      const isForegroundElement = (e.target as HTMLElement).closest('.z-toast, .z-popover')

      /**
       * The focus trap of the drawer applies `pointer-events-none` on the body of the page in the background, but
       * some components with an higher z-index have `pointer-events-auto` applied on them to remain interactive and ignore the focust trap (ex: a Snackbar with actions).
       *
       * Clicking on the snackbar will be considered as an "outside click" and close the drawer. We want to prevent this.
       */
      if (isForegroundElement) {
        e.preventDefault()
      }

      onInteractOutside?.(e)
    }}
    {...rest}
  />
)

DrawerContent.displayName = 'Drawer.Content'
