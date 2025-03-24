import { cx } from 'class-variance-authority'
import { type ComponentProps, Ref } from 'react'

import { Slot } from '../slot'

export interface AccordionItemHeaderProps extends ComponentProps<'h3'> {
  asChild?: boolean
  ref?: Ref<HTMLHeadingElement>
}

export const ItemHeader = ({
  asChild = false,
  children,
  className,
  ref,
}: AccordionItemHeaderProps) => {
  const Component = asChild ? Slot : 'h3'

  return (
    <Component
      ref={ref}
      data-spark-component="accordion-item-header"
      className={cx('rounded-[inherit]', className)}
    >
      {children}
    </Component>
  )
}

ItemHeader.displayName = 'Accordion.ItemHeader'
