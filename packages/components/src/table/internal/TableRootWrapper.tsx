import type { GridNode } from '@react-types/grid'
import type { Key, SelectionBehavior } from '@react-types/shared'
import type { ColumnSize } from '@react-types/table'
import type { TableProps as AriaTableProps } from '@react-types/table'
import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'

import { TableContext, type TableContextValue } from './TableContext'

export interface TableProps extends Omit<AriaTableProps<object>, 'children' | 'className'> {
  className?: string
  selectionBehavior?: SelectionBehavior
  onKeyDownCapture?: React.KeyboardEventHandler<Element>
  /** When true (default), columns can be resized. Pass onResizeStart, onResize, onResizeEnd to react to resize events. */
  allowsResizing?: boolean
  /** `aria-label` for the column resize control (for i18n). */
  resizeColumnAriaLabel?: string | ((column: GridNode<unknown>) => string)
  onResizeStart?: (widths: Map<Key, ColumnSize>) => void
  onResize?: (widths: Map<Key, ColumnSize>) => void
  onResizeEnd?: (widths: Map<Key, ColumnSize>) => void
  /** Max height of the scroll container (number in px or CSS value). Applied so vertical and horizontal scrollbars share the same container. */
  maxHeight?: number | string
  /** When true, header cells use `position: sticky` inside the scroll container (pair with `maxHeight`). */
  stickyHeader?: boolean
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
  resizeColumnAriaLabel,
  maxHeight,
  stickyHeader,
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
    resizeColumnAriaLabel,
    maxHeight,
    stickyHeader,
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
