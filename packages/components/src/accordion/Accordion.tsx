import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { cx } from 'class-variance-authority'
import { ComponentProps, createContext, Ref, useContext } from 'react'

type ExtentedZagInterface = Omit<ComponentProps<typeof BaseAccordion.Root>, 'multiple'>

export interface AccordionProps extends ExtentedZagInterface {
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
  children,
  design = 'outlined',
  hiddenUntilFound = true,
  multiple = false,
  className,
  ref,
  ...props
}: AccordionProps) => {
  return (
    <AccordionContext.Provider value={{ design }}>
      <BaseAccordion.Root
        data-spark-component="accordion"
        ref={ref}
        multiple={multiple}
        hiddenUntilFound={hiddenUntilFound}
        className={cx('bg-surface h-fit rounded-lg', className)}
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
