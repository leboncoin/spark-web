import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'

interface ScrollingListControls extends ComponentPropsWithoutRef<'div'> {
  /**
   * Visibility behavior of the control buttons:
   * - `always`: buttons are always visible.
   * - `hover`: buttons only appear on hover.
   *
   * a11y: `hover` is dangerous for accessibility as it disabled controls for touch screen users.
   * When using it, you must provide an alternative control outside of the list to replace them.
   */
  visibility?: 'hover' | 'always'
  children: ReactNode
}

export const ScrollingListControls = ({
  children,
  visibility = 'always',
  className,
  ...rest
}: ScrollingListControls) => {
  return (
    <div
      className={cx(
        'default:px-md pointer-events-none absolute inset-0 flex flex-row items-center justify-between overflow-hidden',
        className
      )}
      style={
        {
          '--scrolling-list-controls-opacity': visibility === 'hover' ? '0' : '1',
        } as CSSProperties
      }
      data-orientation="horizontal"
      {...rest}
    >
      {children}
    </div>
  )
}

ScrollingListControls.displayName = 'ScrollingList.Controls'
