import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { cx } from 'class-variance-authority'
import { type ComponentProps, Ref } from 'react'

export interface AccordionItemContentProps extends ComponentProps<typeof BaseAccordion.Panel> {
  ref?: Ref<HTMLDivElement>
}

export const ItemContent = ({ className, children, ref, ...props }: AccordionItemContentProps) => {
  return (
    <BaseAccordion.Panel
      ref={ref}
      data-spark-component="accordion-item-content"
      className={cx(
        '[&>:first-child]:p-lg overflow-hidden',
        'h-[var(--accordion-panel-height)] transition-all duration-200 data-[ending-style]:h-0 data-[starting-style]:h-0',
        'text-body-1 text-on-surface',
        className
      )}
      {...props}
    >
      {children}
    </BaseAccordion.Panel>
  )
}

ItemContent.displayName = 'Accordion.ItemContent'
