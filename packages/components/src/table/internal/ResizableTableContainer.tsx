import { useResizeObserver } from '@react-aria/utils'
import type { Key } from '@react-types/shared'
import type { ColumnSize } from '@react-types/table'
import { cx } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { useLayoutEffect, useRef, useState } from 'react'

import { TableResizableContext } from './TableContext'

export interface ResizableTableContainerProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  onResizeStart?: (widths: Map<Key, ColumnSize>) => void
  onResize?: (widths: Map<Key, ColumnSize>) => void
  onResizeEnd?: (widths: Map<Key, ColumnSize>) => void
}

export function ResizableTableContainer({
  className,
  children,
  ...props
}: ResizableTableContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tableWidth, setTableWidth] = useState(0)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => setTableWidth(el.clientWidth)
    update()
  }, [])

  useResizeObserver({
    ref: containerRef,
    onResize: () => {
      const el = containerRef.current
      if (!el) return
      setTableWidth(el.clientWidth)
    },
  })

  return (
    <TableResizableContext.Provider value={{ isResizable: true, tableWidth }}>
      <div
        ref={containerRef}
        data-spark-component="resizable-table-container"
        className={cx('relative w-full overflow-auto', className)}
        {...props}
      >
        {children}
      </div>
    </TableResizableContext.Provider>
  )
}

ResizableTableContainer.displayName = 'ResizableTableContainer'
