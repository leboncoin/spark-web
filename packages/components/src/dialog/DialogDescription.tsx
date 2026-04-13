import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

export type DescriptionProps = ComponentProps<typeof BaseDialog.Description> & {
  ref?: Ref<HTMLParagraphElement>
}

/**
 * A paragraph with additional information about the dialog. Renders a <p> element.
 */
export const Description = (props: DescriptionProps) => (
  <BaseDialog.Description data-spark-component="dialog-description" {...props} />
)

Description.displayName = 'Dialog.Description'
