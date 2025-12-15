import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { cx } from 'class-variance-authority'
import { type ComponentProps, Ref } from 'react'

import { Icon } from '../icon'
import { useRenderSlot } from './useRenderSlot'

type ExtentedZagInterface = Omit<ComponentProps<typeof BaseAccordion.Trigger>, 'render'>

export interface AccordionItemTriggerProps extends ExtentedZagInterface {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const ItemTrigger = ({
  asChild = false,
  children,
  className,
  ref,
  ...props
}: AccordionItemTriggerProps) => {
  const renderSlot = useRenderSlot(asChild, 'button')

  return (
    <BaseAccordion.Trigger
      ref={ref}
      data-spark-component="accordion-item-trigger"
      render={renderSlot}
      className={cx(
        'group',
        'gap-lg min-h-sz-48 relative flex items-center justify-between',
        'px-lg py-md text-headline-2 text-on-surface data-[panel-open]:rounded-b-0 w-full rounded-[inherit] text-left',
        'hover:enabled:bg-surface-hovered focus:bg-surface-hovered',
        'focus-visible:u-outline focus-visible:z-raised focus-visible:outline-hidden',
        'disabled:opacity-dim-3 cursor-pointer disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      <div className="gap-lg flex grow items-center">{children}</div>
      <Icon
        intent="neutral"
        className={cx(
          'shrink-0 rotate-0 duration-100 ease-in motion-reduce:transition-none',
          'group-data-[panel-open]:rotate-180'
        )}
        size="sm"
      >
        <ArrowHorizontalDown />
      </Icon>
    </BaseAccordion.Trigger>
  )
}

ItemTrigger.displayName = 'Accordion.ItemTrigger'
