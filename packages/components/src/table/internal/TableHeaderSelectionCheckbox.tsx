import { useTableSelectAllCheckbox } from '@react-aria/table'
import type { TableState } from '@react-stately/table'
import type { Key } from '@react-types/shared'
import type { KeyboardEvent } from 'react'

import { TableSelectionCheckbox } from './TableSelectionCheckbox'

/**
 * Header "select all" checkbox that bases its checked/indeterminate state only
 * on the currently visible (rendered) rows. So when the user changes page in a
 * paginated table, the header shows unchecked instead of indeterminate when no
 * visible row is selected.
 *
 * Keyboard: the column header `<th>` uses React Aria `usePress` for collection
 * selection; Space/Enter would bubble from the checkbox and toggle the wrong key.
 * We stop propagation on those keys and explicitly toggle on Enter (Radix checkbox
 * prevents default Enter on the button so it does not activate like Space).
 */
export function TableHeaderSelectionCheckbox({ state }: { state: TableState<unknown> }) {
  const { checkboxProps: selectAllAriaProps } = useTableSelectAllCheckbox(state)
  const { collection, selectionManager } = state
  const selectedKeys = selectionManager.selectedKeys

  // Visible row keys: only the body row keys (currently rendered rows).
  // TableCollection has a body node whose children are the rows.
  const collectionWithBody = collection as unknown as {
    body?: { key: Key }
    getChildren: (key: Key) => Iterable<{ key: Key }>
    getKeys: () => IterableIterator<Key>
  }
  const bodyNode = collectionWithBody.body
  const visibleRowKeys =
    bodyNode != null
      ? new Set<Key>([...collectionWithBody.getChildren(bodyNode.key)].map(node => node.key))
      : new Set<Key>(collection.getKeys())

  const keysSet = (selectedKeys as unknown) === 'all' ? visibleRowKeys : (selectedKeys as Set<Key>)
  const selectedVisibleCount = [...visibleRowKeys].filter(key => keysSet.has(key)).length
  const visibleCount = visibleRowKeys.size

  const isAllSelected = visibleCount > 0 && selectedVisibleCount === visibleCount
  const isIndeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleCount

  const {
    isSelected: _ignoredSelected,
    isIndeterminate: _ignoredIndeterminate,
    onChange: toggleAllOnChange,
    ...selectAllRest
  } = selectAllAriaProps

  const onHeaderSelectAllKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.stopPropagation()
    }
    if (e.key !== 'Enter') {
      return
    }
    e.preventDefault()
    if (!selectAllAriaProps.isDisabled) {
      toggleAllOnChange?.(!isAllSelected)
    }
  }

  return (
    <TableSelectionCheckbox
      checkboxProps={{
        ...selectAllRest,
        isSelected: isAllSelected,
        isIndeterminate,
        onChange: toggleAllOnChange,
        onKeyDown: onHeaderSelectAllKeyDown,
      }}
    />
  )
}

TableHeaderSelectionCheckbox.displayName = 'Table.HeaderSelectionCheckbox'
