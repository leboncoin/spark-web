import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

import { drawerContentStyles, type DrawerContentStylesProps } from './DrawerContent.styles'

export interface DrawerContentProps
  extends Omit<ComponentProps<typeof BaseDialog.Popup>, 'render'>,
    DrawerContentStylesProps {
  ref?: Ref<HTMLDivElement>
}

export const DrawerContent = ({
  className,
  size = 'md',
  side = 'right',
  ref,
  ...rest
}: DrawerContentProps) => {
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
      {...rest}
    />
  )
}

DrawerContent.displayName = 'Drawer.Content'
