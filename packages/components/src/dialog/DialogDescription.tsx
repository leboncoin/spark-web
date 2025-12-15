import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

export type DescriptionProps = ComponentProps<typeof BaseDialog.Description> & {
  ref?: Ref<HTMLParagraphElement>
}

export const Description = (props: DescriptionProps) => (
  <BaseDialog.Description data-spark-component="dialog-description" {...props} />
)

Description.displayName = 'Dialog.Description'
