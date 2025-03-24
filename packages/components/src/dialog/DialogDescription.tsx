import { Dialog as RadixDialog } from 'radix-ui'
import { Ref } from 'react'

export type DescriptionProps = RadixDialog.DialogDescriptionProps & {
  ref?: Ref<HTMLParagraphElement>
}

export const Description = (props: DescriptionProps) => <RadixDialog.Description {...props} />

Description.displayName = 'Dialog.Description'
