import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

export interface TriggerProps extends ComponentProps<typeof BaseDialog.Trigger> {
  ref?: Ref<HTMLButtonElement>
}

export const Trigger = (props: TriggerProps) => {
  return <BaseDialog.Trigger data-spark-component="dialog-trigger" {...props} />
}

Trigger.displayName = 'Dialog.Trigger'
