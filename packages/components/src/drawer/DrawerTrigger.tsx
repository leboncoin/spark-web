import { Dialog as BaseDialog } from '@base-ui-components/react/dialog'
import { ComponentProps, Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface DrawerTriggerProps
  extends Omit<ComponentProps<typeof BaseDialog.Trigger>, 'render'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const DrawerTrigger = ({ asChild = false, ...props }: DrawerTriggerProps) => {
  const renderSlot = useRenderSlot(asChild, 'button')

  return <BaseDialog.Trigger data-spark-component="drawer-trigger" render={renderSlot} {...props} />
}

DrawerTrigger.displayName = 'Drawer.Trigger'
