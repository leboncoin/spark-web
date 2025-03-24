import { mergeProps } from '@zag-js/react'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, Ref } from 'react'

import { Slot } from '../slot'
import { useCollapsibleContext } from './Collapsible'

export interface CollapsibleContentProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

export const Content = ({
  asChild = false,
  className,
  children,
  ref,
  ...props
}: CollapsibleContentProps) => {
  const { getContentProps } = useCollapsibleContext()

  const Component = asChild ? Slot : 'div'
  const contentProps = getContentProps()
  const mergedProps = mergeProps(contentProps, {
    className: cx(
      'overflow-hidden',
      'motion-reduce:animate-none!',
      '[&[hidden]]:hidden',
      'data-[state=open]:animate-standalone-collapse-in data-[state=closed]:animate-standalone-collapse-out',
      className
    ),
    ...props,
  })

  return (
    <Component ref={ref} data-spark-component="collapsible-content" {...mergedProps}>
      {children}
    </Component>
  )
}

Content.displayName = 'Collapsible.Content'
