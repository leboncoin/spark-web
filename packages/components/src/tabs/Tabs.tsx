import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { Tabs as RadixTabs } from 'radix-ui'
import { type PropsWithChildren, Ref } from 'react'

import { TabsContext } from './TabsContext'
import { rootStyles } from './TabsRoot.styles'
import type { TabsTriggerVariantsProps } from './TabsTrigger.styles'

export interface TabsProps
  extends Omit<RadixTabs.TabsProps, 'activationMode' | 'asChild' | 'children'>,
    PropsWithChildren<Omit<TabsTriggerVariantsProps, 'orientation'>>,
    Omit<useRender.ComponentProps<'div'>, 'defaultValue' | 'value' | 'dir'> {
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
  render,
  forceMount = false,
  orientation = 'horizontal',
  children,
  className,
  ref,
  ...rest
}: TabsProps) => {
  const defaultProps = {
    'data-spark-component': 'tabs',
    className: rootStyles({ className }),
    orientation,
    ...rest,
    children,
  }

  const element = useRender({
    defaultTagName: 'div',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'div'>(defaultProps, {}),
  })

  if (render) {
    return (
      <TabsContext.Provider value={{ intent, size, orientation, forceMount }}>
        <RadixTabs.Root asChild orientation={orientation} activationMode="automatic">
          {element}
        </RadixTabs.Root>
      </TabsContext.Provider>
    )
  }

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
        asChild={false}
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
