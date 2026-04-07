import { useTableColumnResize } from '@react-aria/table'
import type { GridNode } from '@react-types/grid'
import { cx } from 'class-variance-authority'
import { useRef } from 'react'

export function TableColumnResizer({
  column,
  ariaLabel,
  resizeState,
  resizeCallbacks,
}: {
  column: GridNode<unknown>
  ariaLabel?: string
  resizeState: any
  resizeCallbacks: {
    onResizeStart?: (widths: any) => void
    onResize?: (widths: any) => void
    onResizeEnd?: (widths: any) => void
  }
}) {
  const resizeInputRef = useRef<HTMLInputElement>(null)
  const { resizerProps, inputProps, isResizing } = useTableColumnResize(
    {
      column,
      'aria-label': ariaLabel ?? 'Resize column',
      onResizeStart: resizeCallbacks.onResizeStart,
      onResize: resizeCallbacks.onResize,
      onResizeEnd: resizeCallbacks.onResizeEnd,
    } as any,
    resizeState,
    resizeInputRef
  )

  return (
    <div
      role="presentation"
      className={cx(
        // Visible resize handle on the right edge of the header.
        'cursor-col-resize absolute inset-y-lg right-0 flex w-lg items-center justify-center',
        // Provide a visible affordance.
        'after:block after:h-full after:w-[2px] after:bg-outline after:transition-all after:duration-75',
        // Focus visible when the hidden input is focused.
        'has-[input:focus-visible]:after:u-outline has-[input:focus-visible]:after:outline-offset-2',
        isResizing && 'after:bg-outline-high after:scale-120'
      )}
      data-resizable-direction="both"
      {...resizerProps}
    >
      <input
        ref={resizeInputRef}
        // When not actively resizing, disable the input so grid keyboard navigation
        // cannot land on it (it remains programmatically focusable once enabled).
        disabled={!isResizing}
        {...inputProps}
      />
    </div>
  )
}

TableColumnResizer.displayName = 'Table.ColumnResizer'
