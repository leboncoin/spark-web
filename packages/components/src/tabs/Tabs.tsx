import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { type ComponentProps, type PropsWithChildren, Ref } from 'react'

import { TabsContext } from './TabsContext'
import { rootStyles } from './TabsRoot.styles'
import type { TabsTriggerVariantsProps } from './TabsTrigger.styles'
import { useRenderSlot } from './useRenderSlot'

export interface TabsProps
  extends
    Omit<ComponentProps<typeof BaseTabs.Root>, 'render'>,
    PropsWithChildren<Omit<TabsTriggerVariantsProps, 'orientation'>> {
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
  intent = 'support',
  size = 'md',
  /**
   * Default Base UI Primitive values
   * see https://base-ui.com/react/components/tabs
   */
  asChild = false,
  forceMount = false,
  orientation = 'horizontal',
  children,
  className,
  ref,
  ...rest
}: TabsProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <TabsContext.Provider
      value={{
        intent,
        size,
        orientation,
        forceMount,
      }}
    >
      <BaseTabs.Root
        ref={ref}
        orientation={orientation}
        className={rootStyles({ className })}
        data-spark-component="tabs"
        render={renderSlot}
        {...rest}
      >
        {children}
      </BaseTabs.Root>
    </TabsContext.Provider>
  )
}

Tabs.displayName = 'Tabs'
