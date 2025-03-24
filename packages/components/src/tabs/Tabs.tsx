import { Tabs as RadixTabs } from 'radix-ui'
import { type PropsWithChildren, Ref } from 'react'

import { TabsContext } from './TabsContext'
import { rootStyles } from './TabsRoot.styles'
import type { TabsTriggerVariantsProps } from './TabsTrigger.styles'

export interface TabsProps
  extends Omit<RadixTabs.TabsProps, 'activationMode'>,
    PropsWithChildren<TabsTriggerVariantsProps> {
  /**
   * Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  /**
   * Whether to keep inactive tabs content in the DOM.
   * @default false
   */
  forceMount?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * @deprecated
 */
export type TabsRootProps = TabsProps

export const Tabs = ({
  intent = 'basic',
  size = 'md',
  /**
   * Default Radix Primitive values
   * see https://www.radix-ui.com/docs/primitives/components/tabs#root
   */
  asChild = false,
  forceMount = false,
  orientation = 'horizontal',
  children,
  className,
  ref,
  ...rest
}: TabsProps) => {
  return (
    <TabsContext.Provider
      value={{
        intent,
        size,
        orientation,
        forceMount,
      }}
    >
      <RadixTabs.Root
        ref={ref}
        asChild={asChild}
        orientation={orientation}
        className={rootStyles({ className })}
        data-spark-component="tabs"
        activationMode="automatic"
        {...rest}
      >
        {children}
      </RadixTabs.Root>
    </TabsContext.Provider>
  )
}

Tabs.displayName = 'Tabs'
