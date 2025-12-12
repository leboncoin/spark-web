import { Dialog as BaseDialog } from '@base-ui-components/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

export interface DrawerOverlayProps
  extends Omit<ComponentProps<typeof BaseDialog.Backdrop>, 'render'> {
  ref?: Ref<HTMLDivElement>
}

export const DrawerOverlay = ({ className, ...props }: DrawerOverlayProps) => {
  return (
    <BaseDialog.Backdrop
      data-spark-component="drawer-overlay"
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

DrawerOverlay.displayName = 'Drawer.Overlay'
