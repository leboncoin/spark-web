import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { type ComponentProps, type FocusEvent, type ReactNode, Ref, useRef } from 'react'

type TabKeyDownEvent = Parameters<NonNullable<ComponentProps<typeof BaseTabs.Tab>['onKeyDown']>>[0]

import { useTabsContext } from './TabsContext'
import { type ConfiguredPopoverComponent, Popover } from './TabsPopoverAbstraction'
import { triggerVariants } from './TabsTrigger.styles'
import { useRenderSlot } from './useRenderSlot'

export interface TabsTriggerProps extends Omit<ComponentProps<typeof BaseTabs.Tab>, 'render'> {
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
  /**
   * Function that receives a pre-configured Popover component and returns the popover structure.
   * @example
   * renderMenu={({ Popover }) => (
   *   <Popover>
   *     <Popover.Trigger aria-label="Options">
   *       <CustomIcon />
   *     </Popover.Trigger>
   *     <Popover.Content>
   *       <Button>Action</Button>
   *     </Popover.Content>
   *   </Popover>
   * )}
   */
  renderMenu?: (props: { Popover: ConfiguredPopoverComponent }) => ReactNode
  ref?: Ref<HTMLButtonElement>
}

/** A button that activates a tab panel. Renders a <button> element. */
export const TabsTrigger = ({
  /**
   * Default Base UI Primitive values
   * see https://base-ui.com/react/components/tabs
   */
  asChild = false,
  value,
  disabled = false,
  children,
  className,
  ref,
  onKeyDown,
  renderMenu,
  ...rest
}: TabsTriggerProps) => {
  const { intent, size, orientation } = useTabsContext()
  const popoverTriggerRef = useRef<HTMLButtonElement>(null)
  const tabsTriggerRef = useRef<HTMLButtonElement>(null)
  const renderSlot = useRenderSlot(asChild)

  // Combine internal ref with forwarded ref
  const mergedRef = useMergeRefs(ref, tabsTriggerRef)

  const handleKeyDown = (e: TabKeyDownEvent) => {
    // Handle Shift+F10 for popover
    if (e.key === 'F10' && e.shiftKey && renderMenu && popoverTriggerRef.current) {
      e.preventDefault()
      popoverTriggerRef.current.click()
    }

    // Call original onKeyDown if provided
    onKeyDown?.(e)
  }

  const hasMenu = !!renderMenu
  const popoverSide = orientation === 'vertical' ? 'right' : 'bottom'

  const trigger = (
    <BaseTabs.Tab
      data-spark-component="tabs-trigger"
      ref={mergedRef}
      className={triggerVariants({
        intent,
        size,
        hasMenu,
        orientation: orientation ?? 'horizontal',
        className,
      })}
      render={renderSlot}
      disabled={disabled}
      value={value}
      onFocus={({ target }: FocusEvent<HTMLButtonElement>) =>
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        })
      }
      onKeyDown={handleKeyDown}
      aria-haspopup={hasMenu ? 'true' : undefined}
      {...rest}
    >
      {children}
    </BaseTabs.Tab>
  )

  if (!hasMenu) {
    return trigger
  }

  return (
    <div className={orientation === 'vertical' ? 'relative w-full' : 'relative'}>
      {trigger}
      <div className="right-md mr-md pointer-events-auto absolute top-1/2 -translate-y-1/2">
        <Popover popoverSide={popoverSide} popoverTriggerRef={popoverTriggerRef}>
          {PopoverAbstraction => renderMenu?.({ Popover: PopoverAbstraction })}
        </Popover>
      </div>
    </div>
  )
}

TabsTrigger.displayName = 'Tabs.Trigger'
