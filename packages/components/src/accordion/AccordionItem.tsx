import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { cx } from 'class-variance-authority'
import { type ComponentProps, Ref } from 'react'

import { useAccordionContext } from './Accordion'

export interface AccordionItemProps extends ComponentProps<typeof BaseAccordion.Item> {
  ref?: Ref<HTMLDivElement>
}

export const Item = ({ className, children, ref, ...props }: AccordionItemProps) => {
  const accordion = useAccordionContext()

  return (
    <BaseAccordion.Item
      ref={ref}
      data-spark-component="accordion-item"
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
