import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { MoreMenuHorizontal } from '@spark-ui/icons/MoreMenuHorizontal'
import { cx } from 'class-variance-authority'
import {
  type ComponentType,
  createContext,
  forwardRef,
  type ReactNode,
  type RefObject,
  useContext,
  useMemo,
} from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { Popover as SparkPopover } from '../popover'
import type { PopoverProps } from '../popover/Popover'
import type { ContentProps as PopoverContentProps } from '../popover/PopoverContent'
import type { TriggerProps as PopoverTriggerProps } from '../popover/PopoverTrigger'

interface TabsPopoverContextValue {
  popoverSide: 'right' | 'bottom'
  popoverTriggerRef: RefObject<HTMLButtonElement | null>
}

const TabsPopoverContext = createContext<TabsPopoverContextValue | undefined>(undefined)

const useTabsPopoverContext = () => {
  const context = useContext(TabsPopoverContext)
  if (!context) {
    throw new Error('TabsPopover components must be used within TabsPopover')
  }

  return context
}

// Trigger component that uses context
interface TabsPopoverTriggerProps extends Omit<PopoverTriggerProps, 'asChild' | 'children'> {
  'aria-label': string
  children?: ReactNode
}

const TabsPopoverTrigger = forwardRef<HTMLButtonElement, TabsPopoverTriggerProps>(
  ({ 'aria-label': ariaLabel, children: iconChildren, ...triggerProps }, forwardedRef) => {
    const { popoverTriggerRef } = useTabsPopoverContext()
    const mergedRef = useMergeRefs(forwardedRef, popoverTriggerRef)

    return (
      <SparkPopover.Trigger asChild {...triggerProps}>
        <IconButton
          ref={mergedRef}
          size="sm"
          intent="surfaceInverse"
          design="ghost"
          aria-label={ariaLabel}
          tabIndex={-1}
        >
          <Icon>{iconChildren || <MoreMenuHorizontal />}</Icon>
        </IconButton>
      </SparkPopover.Trigger>
    )
  }
)

TabsPopoverTrigger.displayName = 'Popover.Trigger'

// Content component that uses context
const TabsPopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ side, align = 'start', className, ...contentProps }, ref) => {
    const { popoverSide } = useTabsPopoverContext()
    const mergedClassName = cx('gap-sm flex flex-col', className)

    return (
      <SparkPopover.Content
        ref={ref}
        {...contentProps}
        side={side ?? popoverSide}
        align={align}
        className={mergedClassName}
      />
    )
  }
)

TabsPopoverContent.displayName = 'Popover.Content'

// Export types
export type TabsPopoverTriggerComponent = typeof TabsPopoverTrigger
export type TabsPopoverContentComponent = typeof TabsPopoverContent

// Create a type that extends SparkPopover but overrides Content and Trigger
// Use ComponentType for JSX compatibility and Omit to exclude only Content and Trigger,
// then add them back with the overridden types
export type ConfiguredPopoverComponent = ComponentType<PopoverProps> &
  Omit<typeof SparkPopover, 'Content' | 'Trigger'> & {
    Content: TabsPopoverContentComponent
    Trigger: TabsPopoverTriggerComponent
  }

interface PopoverAbstractionProps {
  popoverSide: 'right' | 'bottom'
  popoverTriggerRef: RefObject<HTMLButtonElement | null>
  children: (Popover: ConfiguredPopoverComponent) => ReactNode
}

export const Popover = ({ popoverSide, popoverTriggerRef, children }: PopoverAbstractionProps) => {
  const contextValue = useMemo(
    () => ({ popoverSide, popoverTriggerRef }),
    [popoverSide, popoverTriggerRef]
  )

  const PopoverWrapper: typeof SparkPopover = ((props: PopoverProps) => (
    <TabsPopoverContext.Provider value={contextValue}>
      <SparkPopover {...props}>{props.children}</SparkPopover>
    </TabsPopoverContext.Provider>
  )) as typeof SparkPopover

  const PopoverComponent = Object.assign(PopoverWrapper, SparkPopover, {
    Content: TabsPopoverContent,
    Trigger: TabsPopoverTrigger,
  }) as ConfiguredPopoverComponent

  return (
    <TabsPopoverContext.Provider value={contextValue}>
      {children(PopoverComponent)}
    </TabsPopoverContext.Provider>
  )
}

Popover.displayName = 'Popover'
