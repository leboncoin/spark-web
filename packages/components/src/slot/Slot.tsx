import { Slot as RadixSlot } from 'radix-ui'
import {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  Ref,
} from 'react'

export const Slottable = RadixSlot.Slottable

export type SlotProps = PropsWithChildren<HTMLAttributes<HTMLElement>> & {
  ref?: Ref<HTMLElement>
}

export const Slot = ({ ref, ...props }: SlotProps) => {
  return <RadixSlot.Root ref={ref} {...props} />
}

/**
 * When using Radix `Slot` component, it will consider its first child to merge its props with.
 * In some cases, you might need to wrap the top child with additional markup without breaking this behaviour.
 */
export const wrapPolymorphicSlot = (
  asChild: boolean | undefined,
  children: ReactNode,
  callback: (children: ReactNode) => ReactNode
) => {
  if (!asChild) return callback(children) // If polymorphic behaviour is not used, we keep the original children

  return isValidElement(children)
    ? cloneElement(
        children,
        undefined,
        callback((children.props as { children: ReactNode }).children)
      )
    : null
}
