import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { ComponentProps, Ref } from 'react'

export interface TriggerProps extends Omit<ComponentProps<typeof BaseDialog.Trigger>, 'render'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * A button that opens the dialog. Renders a <button> element.
 */
export const Trigger = ({ asChild = false, children, ...props }: TriggerProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseDialog.Trigger data-spark-component="dialog-trigger" render={renderProp} {...props}>
      {innerChildren}
    </BaseDialog.Trigger>
  )
}

Trigger.displayName = 'Dialog.Trigger'
