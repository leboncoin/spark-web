import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { cx } from 'class-variance-authority'
import { ComponentProps, createContext, Ref, useContext } from 'react'

import { useRenderSlot } from './useRenderSlot'

type BaseAccordionRootProps = ComponentProps<typeof BaseAccordion.Root<string | string[]>>

type ExtentedBaseUIInterface = Omit<
  BaseAccordionRootProps,
  'multiple' | 'render' | 'value' | 'defaultValue' | 'onValueChange'
>

export interface AccordionProps extends ExtentedBaseUIInterface {
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
  /**
   * The controlled value (always an array of strings)
   */
  value?: string[]
  /**
   * The default value (always an array of strings)
   */
  defaultValue?: string[]
  /**
   * Callback when the value changes (always receives an array of strings)
   */
  onValueChange?: (value: string[]) => void
}

const AccordionContext = createContext<{
  design: 'filled' | 'outlined'
} | null>(null)

export function Accordion({
  asChild = false,
  children,
  design = 'outlined',
  hiddenUntilFound = true,
  multiple = false,
  className,
  ref,
  value,
  defaultValue,
  onValueChange,
  ...props
}: AccordionProps) {
  const renderSlot = useRenderSlot(asChild, 'div')

  // Wrap the onValueChange to always provide string[]
  const handleValueChange = onValueChange
    ? (newValue: string | string[]) => {
        // Base UI returns string when multiple=false, string[] when multiple=true
        // We normalize to always return string[]
        const normalizedValue = Array.isArray(newValue) ? newValue : [newValue]
        onValueChange(normalizedValue)
      }
    : undefined

  return (
    <AccordionContext value={{ design }}>
      <BaseAccordion.Root
        data-spark-component="accordion"
        ref={ref}
        multiple={multiple}
        hiddenUntilFound={hiddenUntilFound}
        className={cx('bg-surface h-fit rounded-lg', className)}
        render={renderSlot}
        value={value as any}
        defaultValue={defaultValue as any}
        onValueChange={handleValueChange as any}
        {...props}
      >
        {children}
      </BaseAccordion.Root>
    </AccordionContext>
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
