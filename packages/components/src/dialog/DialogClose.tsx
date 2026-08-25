import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { ComponentProps, Ref } from 'react'

export interface CloseProps extends Omit<ComponentProps<typeof BaseDialog.Close>, 'render'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * A button that closes the dialog. Renders a <button> element.
 */
export const Close = ({ asChild = false, children, ...props }: CloseProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseDialog.Close data-spark-component="dialog-close" render={renderProp} {...props}>
      {innerChildren}
    </BaseDialog.Close>
  )
}
