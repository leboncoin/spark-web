import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { ComponentProps, Ref } from 'react'

export interface DrawerCloseProps extends Omit<ComponentProps<typeof BaseDialog.Close>, 'render'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * A button that closes the drawer. Renders a <button> element.
 */
export const DrawerClose = ({ asChild = false, children, ...props }: DrawerCloseProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseDialog.Close data-spark-component="drawer-close" render={renderProp} {...props}>
      {innerChildren}
    </BaseDialog.Close>
  )
}

DrawerClose.displayName = 'Drawer.Close'
