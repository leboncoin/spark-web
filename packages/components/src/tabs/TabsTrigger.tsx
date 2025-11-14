import { Tabs as RadixTabs } from 'radix-ui'
import { type FocusEvent, type KeyboardEvent, Ref } from 'react'

import { useTabsContext } from './TabsContext'
import { triggerVariants } from './TabsTrigger.styles'

export interface TabsTriggerProps extends RadixTabs.TabsTriggerProps {
  /**
   * A unique value that associates the trigger with a content.
   */
  value: string
  /**
   * Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  /**
   * When true, prevents the user from interacting with the tab.
   * @default false
   */
  disabled?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const TabsTrigger = ({
  /**
   * Default Radix Primitive values
   * see https://www.radix-ui.com/docs/primitives/components/tabs#trigger
   */
  asChild = false,
  value,
  disabled = false,
  children,
  className,
  ref,
  onKeyDown,
  ...rest
}: TabsTriggerProps) => {
  const { intent, size, onPopupKeyDown } = useTabsContext()

  const scrollToFocusedElement = ({ target }: FocusEvent<HTMLButtonElement>) =>
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    // Handle Shift+F10 for popup
    if (e.key === 'F10' && e.shiftKey && onPopupKeyDown) {
      e.preventDefault()
      onPopupKeyDown(value)
    }

    // Call original onKeyDown if provided
    onKeyDown?.(e)
  }

  return (
    <RadixTabs.Trigger
      data-spark-component="tabs-trigger"
      ref={ref}
      className={triggerVariants({ intent, size, className })}
      asChild={asChild}
      disabled={disabled}
      value={value}
      onFocus={scrollToFocusedElement}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </RadixTabs.Trigger>
  )
}

TabsTrigger.displayName = 'Tabs.Trigger'
