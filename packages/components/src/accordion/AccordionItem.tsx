import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { cx } from 'class-variance-authority'
import { type ComponentProps, Ref } from 'react'

import { useAccordionContext } from './Accordion'

type ExtendedBaseUiInterface = Omit<ComponentProps<typeof BaseAccordion.Item>, 'render'>

export interface AccordionItemProps extends ExtendedBaseUiInterface {
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * Groups an accordion header with the corresponding panel. Renders a <div> element.
 */
export const Item = ({
  asChild = false,
  className,
  children,
  ref,
  ...props
}: AccordionItemProps) => {
  const accordion = useAccordionContext()

  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseAccordion.Item
      ref={ref}
      data-spark-component="accordion-item"
      render={renderProp}
      className={cx(
        'relative first:rounded-t-lg last:rounded-b-lg',
        'not-last:border-b-0',
        { 'border-sm border-outline': accordion.design === 'outlined' },
        className
      )}
      {...props}
    >
      {innerChildren}
    </BaseAccordion.Item>
  )
}

Item.displayName = 'Accordion.Item'
