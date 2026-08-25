import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { ComponentProps, Ref } from 'react'

export interface DrawerTriggerProps extends Omit<
  ComponentProps<typeof BaseDialog.Trigger>,
  'render'
> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * A button that opens the drawer. Renders a <button> element.
 */
export const DrawerTrigger = ({ asChild = false, children, ...props }: DrawerTriggerProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseDialog.Trigger data-spark-component="drawer-trigger" render={renderProp} {...props}>
      {innerChildren}
    </BaseDialog.Trigger>
  )
}

DrawerTrigger.displayName = 'Drawer.Trigger'
