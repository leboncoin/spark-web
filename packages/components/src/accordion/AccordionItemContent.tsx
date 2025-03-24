import { createSplitProps } from '@spark-ui/internal-utils'
import { mergeProps } from '@zag-js/react'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, Ref } from 'react'

import { Collapsible } from '../collapsible'
import { useAccordionContext } from './Accordion'
import { useAccordionItemContext } from './AccordionItemContext'

export interface AccordionItemContentProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

const splitVisibilityProps = createSplitProps<{
  hidden?: boolean
  'data-state'?: string
}>()

export const ItemContent = ({
  asChild = false,
  className,
  children,
  ref,
  ...props
}: AccordionItemContentProps) => {
  const accordion = useAccordionContext()
  const accordionItem = useAccordionItemContext()

  const localProps = {
    className: cx('[&>:first-child]:p-lg', 'text-body-1 text-on-surface', className),
    asChild,
    ...props,
  }
  const contentProps = accordion.getItemContentProps({
    value: accordionItem.value,
    ...(accordionItem.disabled && { disabled: accordionItem.disabled }),
  })

  const [, itemContentProps] = splitVisibilityProps(contentProps, ['hidden', 'data-state'])

  const mergedProps = mergeProps(itemContentProps, localProps)

  return (
    <Collapsible.Content ref={ref} data-spark-component="accordion-item-content" {...mergedProps}>
      {children}
    </Collapsible.Content>
  )
}

ItemContent.displayName = 'Accordion.ItemContent'
