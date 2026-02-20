import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

export type TriggerProps = Omit<RadixPopover.PopoverTriggerProps, 'asChild' | 'children'> &
  useRender.ComponentProps<'button'> & {
    ref?: Ref<HTMLButtonElement>
  }

export const Trigger = ({ render, children, ref, ...rest }: TriggerProps) => {
  const defaultProps = {
    'data-spark-component': 'popover-trigger',
    ...rest,
    children,
  }

  const element = useRender({
    defaultTagName: 'button',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'button'>(defaultProps, {}),
  })

  if (render) {
    return <RadixPopover.Trigger asChild>{element}</RadixPopover.Trigger>
  }

  return (
    <RadixPopover.Trigger
      data-spark-component="popover-trigger"
      ref={ref}
      asChild={false}
      {...rest}
    >
      {children}
    </RadixPopover.Trigger>
  )
}

Trigger.displayName = 'Popover.Trigger'
