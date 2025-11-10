import { cx } from 'class-variance-authority'
import { forwardRef, type ReactNode, type Ref } from 'react'

export interface TabsPopupWrapperProps {
  /**
   * The tab value this popup is associated with
   */
  tabValue: string
  /**
   * Whether this tab is currently active
   */
  isTabActive: boolean
  /**
   * Whether the popup is open
   */
  open?: boolean
  /**
   * Callback when popup open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * The popup content - typically a Popover or other overlay component
   */
  children: ReactNode
  /**
   * Additional className for positioning
   */
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const TabsPopupWrapper = forwardRef<HTMLDivElement, TabsPopupWrapperProps>(
  ({ tabValue, isTabActive, children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        key={`popup-${tabValue}`}
        className={cx('pr-lg pointer-events-auto relative flex flex-1 justify-end', className)}
        data-spark-component="tabs-popup"
        data-tab-value={tabValue}
        data-tab-active={isTabActive}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

TabsPopupWrapper.displayName = 'Tabs.Popup'
