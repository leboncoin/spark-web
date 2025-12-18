import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

import { useRenderSlot } from '../drawer/useRenderSlot'

export interface TriggerProps extends Omit<ComponentProps<typeof BaseDialog.Trigger>, 'render'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const Trigger = ({ asChild = false, ...props }: TriggerProps) => {
  const renderSlot = useRenderSlot(asChild, 'button')

  return <BaseDialog.Trigger data-spark-component="dialog-trigger" render={renderSlot} {...props} />
}

Trigger.displayName = 'Dialog.Trigger'
