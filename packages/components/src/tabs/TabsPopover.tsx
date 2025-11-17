import { cx } from 'class-variance-authority'
import { forwardRef, type ReactNode, type Ref } from 'react'

export interface TabsPopoverProps {
  /**
   * The tab value this popover is associated with (automatically set by Tabs.Trigger)
   */
  tabValue?: string
  /**
   * Whether this tab is currently active (automatically set by Tabs.Trigger)
   */
  isTabActive?: boolean
  /**
   * Whether the popover is open
   */
  open?: boolean
  /**
   * Callback when popover open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * The popover content - typically a Popover or other overlay component
   */
  children: ReactNode
  /**
   * Additional className for positioning
   */
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const TabsPopover = forwardRef<HTMLDivElement, TabsPopoverProps>(
  ({ tabValue, isTabActive, children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          'right-md mr-md pointer-events-auto absolute top-1/2 -translate-y-1/2',
          className
        )}
        data-spark-component="tabs-popover"
        data-tab-value={tabValue}
        data-tab-active={isTabActive}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

TabsPopover.displayName = 'Tabs.Popover'
