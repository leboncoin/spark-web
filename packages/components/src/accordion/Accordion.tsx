import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { cx } from 'class-variance-authority'
import { ComponentProps, createContext, Ref, useContext } from 'react'

import { useRenderSlot } from './useRenderSlot'

type ExtentedZagInterface = Omit<ComponentProps<typeof BaseAccordion.Root>, 'multiple' | 'render'>

export interface AccordionProps extends ExtentedZagInterface {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  /**
   * Whether the accordion items are disabled
   */
  disabled?: boolean
  /**
   * Whether multiple items can be open at the same time.
   */
  multiple?: boolean
  design?: 'filled' | 'outlined'
  ref?: Ref<HTMLDivElement>
}

const AccordionContext = createContext<{
  design: 'filled' | 'outlined'
} | null>(null)

export const Accordion = ({
  asChild = false,
  children,
  design = 'outlined',
  hiddenUntilFound = true,
  multiple = false,
  className,
  ref,
  ...props
}: AccordionProps) => {
  const renderSlot = useRenderSlot(asChild, 'div')

  return (
    <AccordionContext.Provider value={{ design }}>
      <BaseAccordion.Root
        data-spark-component="accordion"
        ref={ref}
        multiple={multiple}
        hiddenUntilFound={hiddenUntilFound}
        className={cx('bg-surface h-fit rounded-lg', className)}
        render={renderSlot}
        {...props}
      >
        {children}
      </BaseAccordion.Root>
    </AccordionContext.Provider>
  )
}

Accordion.displayName = 'Accordion'

export const useAccordionContext = () => {
  const context = useContext(AccordionContext)

  if (!context) {
    throw Error('useAccordionContext must be used within a Accordion provider')
  }

  return context
}
