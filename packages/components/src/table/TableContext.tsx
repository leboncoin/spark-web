import { createContext, useContext } from 'react'
import type { Selection } from 'react-aria-components'
import type { SortDescriptor } from 'react-aria-components'

import type { ResizableTableContainerProps } from './ResizableTableContainer'

export interface TableResizableContextValue {
  isResizable: boolean
}

export const TableResizableContext = createContext<TableResizableContextValue>({
  isResizable: false,
})

export function useTableResizableContext() {
  return useContext(TableResizableContext)
}

/** Values provided by Table (root) and consumed by Table.Grid and Table.BulkBar. */
export interface TableContextValue
  extends Pick<ResizableTableContainerProps, 'onResizeStart' | 'onResize' | 'onResizeEnd'> {
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
