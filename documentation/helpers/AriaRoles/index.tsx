import { Tabs, type TabsProps } from '@spark-ui/components/tabs'
import { ARIARoleDefinitionKey } from 'aria-query'
import { type FC, useEffect, useState } from 'react'

import { AriaRole } from '../AriaRole'

interface Props<T> {
  of: T
  role: ARIARoleDefinitionKey
  subcomponents?: Record<string, any> | null
}

function useTabsOrientation() {
  const [tabsOrientation, setTabsOrientation] = useState<TabsProps['orientation']>(
    window.innerWidth < 640 ? 'horizontal' : 'vertical'
  )

  useEffect(() => {
    const handleResize = () => {
      setTabsOrientation(window.innerWidth < 640 ? 'horizontal' : 'vertical')
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return tabsOrientation
}

export const AriaRoles = <T extends FC>({ of, role, subcomponents = null }: Props<T>) => {
  const tabsOrientation = useTabsOrientation()

  const { displayName: name = 'Root' } = of // "Root" in case the root component is missing a displayName

  if (!subcomponents) {
    return <AriaRole role={role} />
  }

  const subComponentsList = Object.entries(subcomponents)

  return (
    <div>
      <Tabs
        defaultValue={name}
        orientation={tabsOrientation}
        className="sb-unstyled mt-xl overflow-hidden rounded-md"
      >
        <Tabs.List className={tabsOrientation === 'horizontal' ? 'mb-md' : ''}>
          <Tabs.Trigger key={name} value={name} className="text-support bg-transparent">
            {name}
          </Tabs.Trigger>
          <>
            {subComponentsList.map(([name]) => (
              <Tabs.Trigger key={name} value={name} className="text-on-surface bg-transparent">
                {name}
              </Tabs.Trigger>
            ))}
          </>
        </Tabs.List>

        <Tabs.Content key={name} value={name} className="py-lg">
          <AriaRole role={role} />
        </Tabs.Content>

        {subComponentsList.map(([name, { role }]) => {
          return (
            <Tabs.Content key={name} value={name} className="py-lg">
              <AriaRole role={role} />
            </Tabs.Content>
          )
        })}
      </Tabs>
    </div>
  )
}
