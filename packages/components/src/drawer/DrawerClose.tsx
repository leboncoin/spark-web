import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface DrawerCloseProps extends Omit<ComponentProps<typeof BaseDialog.Close>, 'render'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const DrawerClose = ({ asChild = false, ...props }: DrawerCloseProps) => {
  const renderSlot = useRenderSlot(asChild, 'button')

  return <BaseDialog.Close data-spark-component="drawer-close" render={renderSlot} {...props} />
}

DrawerClose.displayName = 'Drawer.Close'
