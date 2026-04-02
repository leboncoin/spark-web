import type { Selection } from '@react-types/shared'
import type { SortDescriptor } from '@react-types/shared'
import type { GridNode } from '@react-types/grid'
import { createContext, useContext } from 'react'

import type { ResizableTableContainerProps } from './ResizableTableContainer'

export interface TableResizableContextValue {
  isResizable: boolean
  tableWidth: number
}

export const TableResizableContext = createContext<TableResizableContextValue>({
  isResizable: false,
  tableWidth: 0,
})

export function useTableResizableContext() {
  return useContext(TableResizableContext)
}

/** Values provided by Table (root) and consumed by Table.Grid and Table.BulkBar. */
export interface TableContextValue {
  onResizeStart?: ResizableTableContainerProps['onResizeStart']
  onResize?: ResizableTableContainerProps['onResize']
  onResizeEnd?: ResizableTableContainerProps['onResizeEnd']
  // Selection (optional when table has no selection)
  selectionMode?: 'none' | 'single' | 'multiple'
  selectionBehavior?: 'toggle' | 'replace'
  selectedKeys?: Selection
  onSelectionChange?: (keys: Selection) => void
  // BulkBar: optional when not using BulkBar
  totalCount?: number
  hasMultiplePages?: boolean
  onSelectAll?: () => void
  // Derived for BulkBar (from selectedKeys + onSelectionChange)
  selectedCount: number
  onClearSelection: () => void
  // Layout / grid
  allowsResizing?: boolean
  /** `aria-label` for column resizer control. */
  resizeColumnAriaLabel?: string | ((column: GridNode<unknown>) => string)
  maxHeight?: number | string
  onKeyDownCapture?: React.KeyboardEventHandler<Element>
  sortDescriptor?: SortDescriptor
  onSortChange?: (descriptor: SortDescriptor) => void
  className?: string
  // Pass-through for AriaTable (aria-label, etc.)
  [key: string]: unknown
}

const defaultTableContextValue: TableContextValue = {
  selectedCount: 0,
  onClearSelection: () => {},
}

export const TableContext = createContext<TableContextValue>(defaultTableContextValue)

export function useTableContext(): TableContextValue {
  return useContext(TableContext)
}
