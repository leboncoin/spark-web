import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { cx } from 'class-variance-authority'
import { type ComponentProps, Ref } from 'react'

type ExtendedBaseUiInterface = Omit<ComponentProps<typeof BaseAccordion.Panel>, 'render'>

export interface AccordionItemContentProps extends ExtendedBaseUiInterface {
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

export const ItemContent = ({
  asChild = false,
  className,
  children,
  ref,
  ...props
}: AccordionItemContentProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseAccordion.Panel
      ref={ref}
      data-spark-component="accordion-item-content"
      className={cx(
        '*:first:p-lg overflow-hidden',
        'h-(--accordion-panel-height) transition-all duration-200 data-ending-style:h-0 data-starting-style:h-0',
        'text-body-1 text-on-surface',
        className
      )}
      render={renderProp}
      {...props}
    >
      {innerChildren}
    </BaseAccordion.Panel>
  )
}

ItemContent.displayName = 'Accordion.ItemContent'
