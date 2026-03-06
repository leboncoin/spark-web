import type { Key } from '@react-types/shared'
import { useContext } from 'react'
import { TableStateContext } from 'react-aria-components'

import { Checkbox } from '../checkbox'
import { TableSelectionCheckbox } from './TableSelectionCheckbox'

/**
 * Header "select all" checkbox that bases its checked/indeterminate state only
 * on the currently visible (rendered) rows. So when the user changes page in a
 * paginated table, the header shows unchecked instead of indeterminate when no
 * visible row is selected.
 *
 * Renders the Checkbox directly and calls selectionManager.toggleSelectAll() so
 * we fully control the displayed state instead of overriding React Aria's context.
 */
export function TableHeaderSelectionCheckbox() {
  const tableState = useContext(TableStateContext)

  if (!tableState) {
    return <TableSelectionCheckbox />
  }

  const { collection, selectionManager } = tableState
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

  const checked = isIndeterminate ? 'indeterminate' : isAllSelected

  return (
    <span
      onClick={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}
      className="flex h-full min-h-full items-center justify-center"
    >
      <Checkbox
        checked={checked}
        onCheckedChange={() => {
          selectionManager.toggleSelectAll()
        }}
      />
    </span>
  )
}

TableHeaderSelectionCheckbox.displayName = 'Table.HeaderSelectionCheckbox'
