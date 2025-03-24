import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { mergeProps } from '@zag-js/react'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, Ref } from 'react'

import { Icon } from '../icon'
import { Slot } from '../slot'
import { useAccordionContext } from './Accordion'
import { useAccordionItemContext } from './AccordionItemContext'

export interface AccordionItemTriggerProps extends ComponentPropsWithoutRef<'button'> {
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
  const { getItemTriggerProps } = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()

  const Component = asChild ? Slot : 'button'

  const localProps = {
    ...props,
    className: cx(
      'relative flex gap-lg justify-between items-center min-h-sz-48',
      'w-full px-lg py-md text-left text-headline-2 text-on-surface rounded-[inherit] data-[state=open]:rounded-b-0',
      'hover:enabled:bg-surface-hovered focus:bg-surface-hovered',
      'focus-visible:u-outline focus-visible:outline-hidden focus-visible:z-raised',
      'disabled:opacity-dim-3 cursor-pointer disabled:cursor-not-allowed',
      className
    ),
  }

  const mergedProps = mergeProps(
    getItemTriggerProps({ value, ...(disabled && { disabled }) }),
    localProps
  )

  const isOpen = !!mergedProps['aria-expanded']

  return (
    <Component ref={ref} data-spark-component="accordion-item-trigger" {...mergedProps}>
      <div className="gap-lg flex grow items-center">{children}</div>
      <Icon
        intent="neutral"
        className={cx('shrink-0 rotate-0 duration-100 ease-in motion-reduce:transition-none', {
          'rotate-180': isOpen,
        })}
        size="sm"
      >
        <ArrowHorizontalDown />
      </Icon>
    </Component>
  )
}

ItemTrigger.displayName = 'Accordion.ItemTrigger'
