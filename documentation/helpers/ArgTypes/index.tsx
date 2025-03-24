import { Button } from '@spark-ui/components/button'
import { Drawer } from '@spark-ui/components/drawer'
import { Tabs, type TabsProps } from '@spark-ui/components/tabs'
import { ArgTypes as StorybookArgTypes } from '@storybook/blocks'
import { type FC, type ReactNode, useEffect, useState } from 'react'

interface Props<T> {
  of: T
  description?: string
  subcomponents?: Record<string, any> | null
}

const ComponentDescription = ({ name, children }: { name: string; children: ReactNode }) => {
  const displayName = name.charAt(0) === name.charAt(0).toUpperCase() ? `<${name} />` : `${name}()`

  return (
    <div className="text-on-surface rounded-t-lg pb-0">
      <p className="mb-md text-body-1 font-bold">{displayName}</p>
      <p className="text-body-2 italic">{children}</p>
    </div>
  )
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

const ArgTypesDialog = ({
  componentName,
  description,
  children,
}: {
  componentName: string
  description?: string
  children: ReactNode
}) => {
  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button className="top-md right-md z-raised" design="filled" intent="support">
          {componentName} API
        </Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay />

        <Drawer.Content size="lg" className="z-popover!">
          <Drawer.Header>
            <Drawer.Title>{componentName} props</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            {description && <Drawer.Description>{description}</Drawer.Description>}

            {children}
          </Drawer.Body>

          <Drawer.CloseButton aria-label="Close" />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  )
}

export const ArgTypes = <T extends FC>({
  of,
  description,
  subcomponents = null,
  ...rest
}: Props<T>) => {
  const tabsOrientation = useTabsOrientation()

  const { displayName: name = 'Root' } = of // "Root" in case the root component is missing a displayName

  if (!subcomponents) {
    return (
      <ArgTypesDialog componentName={name} description={description}>
        <StorybookArgTypes of={of} />
      </ArgTypesDialog>
    )
  }

  const subComponentsList = Object.entries(subcomponents)

  return (
    <ArgTypesDialog componentName={name} description={description}>
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
          {description && <ComponentDescription name={name}>{description}</ComponentDescription>}
          <StorybookArgTypes of={of} {...rest} />
        </Tabs.Content>

        {subComponentsList.map(([name, { of, description }]) => {
          return (
            <Tabs.Content key={name} value={name} className="py-lg">
              {description && (
                <ComponentDescription name={name}>{description}</ComponentDescription>
              )}
              <StorybookArgTypes of={of} {...rest} />
            </Tabs.Content>
          )
        })}
      </Tabs>
    </ArgTypesDialog>
  )
}
