import { cx } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { ResizableTableContainer as AriaResizableTableContainer } from 'react-aria-components'

import { isColumnResizerElement, isInteractiveElement } from './table-utils'
import { TableResizableContext } from './TableContext'

export interface ResizableTableContainerProps
  extends Omit<ComponentProps<typeof AriaResizableTableContainer>, 'className'> {
  className?: string
}

export function ResizableTableContainer({
  className,
  children,
  ...props
}: ResizableTableContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      if (!isInteractiveElement(e.target)) return
      if (!el.contains(e.target as Node)) return
      // Column resizer uses Enter to toggle keyboard resize mode (ArrowLeft/Right to resize). Do not convert to click.
      if (isColumnResizerElement(e.target)) return

      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      // Dispatch a click so the control (Switch, button, etc.) toggles/activates
      // as it would when Space/Enter is pressed natively (browser triggers click)
      const target = e.target as HTMLElement
      target.click()
    }

    el.addEventListener('keydown', handleKeyDown, true)

    return () => el.removeEventListener('keydown', handleKeyDown, true)
  }, [])

  return (
    <TableResizableContext.Provider value={{ isResizable: true }}>
      <div ref={containerRef}>
        <AriaResizableTableContainer
          data-spark-component="resizable-table-container"
          className={cx('relative w-full overflow-auto', className)}
          {...props}
        >
          {children}
        </AriaResizableTableContainer>
      </div>
    </TableResizableContext.Provider>
  )
}

ResizableTableContainer.displayName = 'ResizableTableContainer'
