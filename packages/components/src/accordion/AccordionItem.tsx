import { Accordion as BaseAccordion } from '@base-ui-components/react/accordion'
import { cx } from 'class-variance-authority'
import { type ComponentProps, Ref } from 'react'

import { useAccordionContext } from './Accordion'
import { useRenderSlot } from './useRenderSlot'

type ExtentedZagInterface = Omit<ComponentProps<typeof BaseAccordion.Item>, 'render'>

export interface AccordionItemProps extends ExtentedZagInterface {
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

export const Item = ({
  asChild = false,
  className,
  children,
  ref,
  ...props
}: AccordionItemProps) => {
  const accordion = useAccordionContext()

  const renderSlot = useRenderSlot(asChild, 'div')

  return (
    <BaseAccordion.Item
      ref={ref}
      data-spark-component="accordion-item"
      render={renderSlot}
      className={cx(
        'relative first:rounded-t-lg last:rounded-b-lg',
        'not-last:border-b-0',
        { 'border-sm border-outline': accordion.design === 'outlined' },
        className
      )}
      {...props}
    >
      {children}
    </BaseAccordion.Item>
  )
}

Item.displayName = 'Accordion.Item'
