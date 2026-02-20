import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { Tabs as RadixTabs } from 'radix-ui'
import { type PropsWithChildren, Ref } from 'react'

import { contentStyles } from './TabsContent.styles'
import { useTabsContext } from './TabsContext'

export interface TabsContentProps
  extends PropsWithChildren<
      Omit<RadixTabs.TabsContentProps, 'forceMount' | 'asChild' | 'children'>
    >,
    useRender.ComponentProps<'div'> {
  /**
   * A unique value that associates the content with a trigger.
   */
  value: string
  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.
   */
  forceMount?: true
  ref?: Ref<HTMLDivElement>
}

export const TabsContent = ({
  children,
  render,
  value,
  className,
  ref,
  ...rest
}: TabsContentProps) => {
  const { forceMount } = useTabsContext()
  const forceMountProp = forceMount || rest.forceMount

  const defaultProps = {
    'data-spark-component': 'tabs-content',
    className: contentStyles({ className, forceMount: forceMountProp }),
    forceMount: forceMountProp,
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
      <RadixTabs.Content asChild value={value} forceMount={forceMountProp}>
        {element}
      </RadixTabs.Content>
    )
  }

  return (
    <RadixTabs.Content
      data-spark-component="tabs-content"
      ref={ref}
      forceMount={forceMountProp}
      className={contentStyles({ className, forceMount: forceMountProp })}
      asChild={false}
      value={value}
      {...rest}
    >
      {children}
    </RadixTabs.Content>
  )
}

TabsContent.displayName = 'Tabs.Content'
