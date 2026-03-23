import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { type ComponentProps, type PropsWithChildren, Ref } from 'react'

import { contentStyles } from './TabsContent.styles'
import { useTabsContext } from './TabsContext'
import { useRenderSlot } from './useRenderSlot'

export interface TabsContentProps
  extends PropsWithChildren<Omit<ComponentProps<typeof BaseTabs.Panel>, 'keepMounted' | 'render'>> {
  /**
   * A unique value that associates the content with a trigger.
   */
  value: string
  /**
   * Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.
   */
  forceMount?: true
  ref?: Ref<HTMLDivElement>
}

export const TabsContent = ({
  /**
   * Default Base UI Primitive values
   * see https://base-ui.com/react/components/tabs
   */
  children,
  asChild = false,
  className,
  ref,
  forceMount,
  ...rest
}: TabsContentProps) => {
  const { forceMount: contextForceMount } = useTabsContext()
  const renderSlot = useRenderSlot(asChild)
  const keepMounted = contextForceMount || forceMount

  return (
    <BaseTabs.Panel
      data-spark-component="tabs-content"
      ref={ref}
      keepMounted={keepMounted}
      className={contentStyles({ className, forceMount: keepMounted })}
      render={renderSlot}
      {...rest}
    >
      {children}
    </BaseTabs.Panel>
  )
}

TabsContent.displayName = 'Tabs.Content'
