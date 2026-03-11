import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { Table as AriaTable, type TableProps as AriaTableProps } from 'react-aria-components'

import type { ResizableTableContainerProps } from './ResizableTableContainer'
import { ResizableTableContainer } from './ResizableTableContainer'
import { isColumnResizerElement, isInteractiveElement } from './table-utils'
import { TableContext, type TableContextValue, useTableContext } from './TableContext'

export interface TableProps
  extends Omit<AriaTableProps, 'className'>,
    Pick<ResizableTableContainerProps, 'onResizeStart' | 'onResize' | 'onResizeEnd'> {
  className?: string
  onKeyDownCapture?: React.KeyboardEventHandler<Element>
  /** When true (default), columns can be resized. Pass onResizeStart, onResize, onResizeEnd to react to resize events. */
  allowsResizing?: boolean
  /** Max height of the scroll container (number in px or CSS value). Applied so vertical and horizontal scrollbars share the same container. */
  maxHeight?: number | string
  /** For BulkBar: total number of items (e.g. for "Select all X items"). */
  totalCount?: number
  /** When true, BulkBar shows "Clear all" and "Select all" buttons. */
  hasMultiplePages?: boolean
  /**
   * Called when user clicks "Clear all" in BulkBar.
   * Useful with pagination selection models (e.g. `useTablePagination`) where clearing only the
   * current page would be incorrect.
   */
  onClearSelection?: () => void
  /** Called when user clicks "Select all" in BulkBar. */
  onSelectAll?: () => void
}

export interface TableRootWrapperProps extends TableProps {
  children: ReactNode
}

export function TableRootWrapper({
  children,
  className,
  selectedKeys,
  onSelectionChange,
  totalCount,
  hasMultiplePages,
  onClearSelection: onClearSelectionProp,
  onSelectAll,
  allowsResizing = true,
  maxHeight,
  onResizeStart,
  onResize,
  onResizeEnd,
  onKeyDownCapture,
  sortDescriptor,
  onSortChange,
  ...restProps
}: TableRootWrapperProps) {
  let selectedCount = 0

  if (selectedKeys === 'all') {
    selectedCount = totalCount ?? 0
  } else if (selectedKeys instanceof Set) {
    selectedCount = selectedKeys.size
  } else if (selectedKeys) {
    selectedCount = new Set(selectedKeys).size
  }
  const onClearSelection = onClearSelectionProp ?? (() => onSelectionChange?.(new Set()))

  const contextValue = {
    ...restProps,
    selectedKeys,
    onSelectionChange,
    totalCount,
    hasMultiplePages,
    onSelectAll,
    selectedCount,
    onClearSelection,
    allowsResizing,
    maxHeight,
    onResizeStart,
    onResize,
    onResizeEnd,
    onKeyDownCapture,
    sortDescriptor,
    onSortChange,
    className,
  }

  return (
    <TableContext.Provider value={contextValue as TableContextValue}>
      <div className={cx('gap-md flex flex-col', className)}>{children}</div>
    </TableContext.Provider>
  )
}

TableRootWrapper.displayName = 'Table'

export const TableRoot = ({ className, onKeyDownCapture, ...props }: TableProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Native capture-phase listener so we run BEFORE react-aria's native listeners
  // (which handle row selection on Space/Enter). Synthetic onKeyDownCapture runs
  // too late. When focus is on an interactive element (switch, button, etc.),
  // we consume the event and trigger a click so the control activates without
  // the row being selected.
  useLayoutEffect(() => {
    const el = wrapperRef.current
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
      ;(e.target as HTMLElement).click()
    }

    el.addEventListener('keydown', handleKeyDown, true)

    return () => el.removeEventListener('keydown', handleKeyDown, true)
  }, [])

  return (
    <AriaTable
      ref={wrapperRef}
      data-spark-component="table"
      className={cx(
        'default:w-full',
        'border-separate border-spacing-y-0',
        'bg-surface',
        'outline-none',
        'text-body-1',
        'forced-color-adjust-none',
        'data-focus-visible:u-outline-inset',
        'has-[>[data-empty]]:h-full',
        className
      )}
      {...(onKeyDownCapture ? { ...props, onKeyDownCapture } : props)}
    />
  )
}

TableRoot.displayName = 'Table.Grid.Inner'

function toMaxHeightStyle(value: number | string): React.CSSProperties['maxHeight'] {
  return typeof value === 'number' ? `${value}px` : value
}

export interface TableGridProps {
  /** Required for accessibility. */
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
  children?: ReactNode
}

export function TableGrid({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className: gridClassName,
  children,
}: TableGridProps) {
  const ctx = useTableContext()
  const {
    allowsResizing = true,
    maxHeight,
    onResizeStart,
    onResize,
    onResizeEnd,
    onKeyDownCapture,
    sortDescriptor,
    onSortChange,
    className: contextClassName,
    ...ariaTableProps
  } = ctx

  const scrollContainerStyle =
    maxHeight != null ? { maxHeight: toMaxHeightStyle(maxHeight) } : undefined
  const className = gridClassName ?? contextClassName

  const tableRootProps = {
    ...ariaTableProps,
    ...(ariaLabel != null && { 'aria-label': ariaLabel }),
    ...(ariaLabelledBy != null && { 'aria-labelledby': ariaLabelledBy }),
    sortDescriptor,
    onSortChange,
    onKeyDownCapture,
    className,
  }

  if (allowsResizing) {
    return (
      <ResizableTableContainer
        className={className}
        style={scrollContainerStyle}
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
      >
        <TableRoot {...tableRootProps}>{children}</TableRoot>
      </ResizableTableContainer>
    )
  }

  return (
    <div className="relative w-full overflow-auto" style={scrollContainerStyle}>
      <TableRoot {...tableRootProps}>{children}</TableRoot>
    </div>
  )
}

TableGrid.displayName = 'Table.Grid'
