import { Dialog as BaseDialog } from '@base-ui-components/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

import { drawerContentStyles, type DrawerContentStylesProps } from './DrawerContent.styles'

export interface DrawerContentProps
  extends Omit<ComponentProps<typeof BaseDialog.Popup>, 'render' | 'onInteractOutside'>,
    DrawerContentStylesProps {
  ref?: Ref<HTMLDivElement>
  /**
   * Handler called when the user clicks outside the drawer.
   */
  onInteractOutside?: (event: PointerEvent) => void
}

export const DrawerContent = ({
  className,
  size = 'md',
  side = 'right',
  onInteractOutside,
  ref,
  ...rest
}: DrawerContentProps) => {
  // Base UI Dialog doesn't support onInteractOutside directly
  // We'll handle it via a custom approach if needed
  // For now, we'll pass it through in case Base UI adds support
  const handleInteractOutside = onInteractOutside
    ? (event: Event) => {
        const e = event as PointerEvent
        const isForegroundElement = (e.target as HTMLElement)?.closest('.z-toast, .z-popover')

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
      }
    : undefined

  return (
    <BaseDialog.Popup
      ref={ref}
      data-spark-component="drawer-content"
      role="dialog"
      className={state =>
        cx(
          drawerContentStyles({
            size,
            side,
            className: typeof className === 'function' ? className(state) : className,
          })
        )
      }
      {...(handleInteractOutside && { onInteractOutside: handleInteractOutside })}
      {...rest}
    />
  )
}

DrawerContent.displayName = 'Drawer.Content'
