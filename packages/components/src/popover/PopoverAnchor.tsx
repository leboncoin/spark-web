import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

export type AnchorProps = Omit<RadixPopover.PopoverAnchorProps, 'asChild' | 'children'> &
  useRender.ComponentProps<'div'> & {
    ref?: Ref<HTMLDivElement>
  }

export const Anchor = ({ render, children, ref, ...rest }: AnchorProps) => {
  const defaultProps = {
    'data-spark-component': 'popover-anchor',
    ...rest,
    children,
  }

  const element = useRender({
    defaultTagName: 'div',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'div'>(defaultProps, {}),
  })

  if (render) {
    return (
      <RadixPopover.Anchor asChild ref={ref}>
        {element}
      </RadixPopover.Anchor>
    )
  }

  return (
    <RadixPopover.Anchor data-spark-component="popover-anchor" ref={ref} asChild={false} {...rest}>
      {children}
    </RadixPopover.Anchor>
  )
}

Anchor.displayName = 'Popover.Anchor'
