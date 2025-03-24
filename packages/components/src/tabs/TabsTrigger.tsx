import { Tabs as RadixTabs } from 'radix-ui'
import { type FocusEvent, Ref } from 'react'

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
  ...rest
}: TabsTriggerProps) => {
  const { intent, size } = useTabsContext()

  const scrollToFocusedElement = ({ target }: FocusEvent<HTMLButtonElement>) =>
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })

  return (
    <RadixTabs.Trigger
      ref={ref}
      className={triggerVariants({ intent, size, className })}
      asChild={asChild}
      disabled={disabled}
      value={value}
      onFocus={scrollToFocusedElement}
      {...rest}
    >
      {children}
    </RadixTabs.Trigger>
  )
}

TabsTrigger.displayName = 'Tabs.Trigger'
