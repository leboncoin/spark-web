/* eslint-disable max-lines-per-function */
import { Ref, useRef } from 'react'

export interface UseSortableListOptions<T> {
  /**
   * The list of items to be sortable
   */
  items: T[]
  /**
   * Callback called when items are reordered
   * @param newItems - The reordered items array
   */
  onReorder: (newItems: T[]) => void
  /**
   * Function to generate a unique key for each item
   * @param item - The item to generate a key for
   * @returns A unique string key for the item
   */
  getItemKey: (item: T) => string
}

export interface SortableItemProps<TElement extends HTMLElement = HTMLElement> {
  /**
   * Whether the item is draggable
   */
  draggable: boolean
  /**
   * Handler for drag start event
   */
  onDragStart: (e: React.DragEvent) => void
  /**
   * Handler for drag enter event
   */
  onDragEnter: (e: React.DragEvent) => void
  /**
   * Handler for drag over event
   */
  onDragOver: (e: React.DragEvent) => void
  /**
   * Handler for drag leave event
   */
  onDragLeave: (e: React.DragEvent) => void
  /**
   * Handler for drag end event
   */
  onDragEnd: (e: React.DragEvent) => void
  /**
   * Handler for drop event
   */
  onDrop: (e: React.DragEvent) => void
  /**
   * Handler for keyboard navigation
   */
  onKeyDown: (e: React.KeyboardEvent) => void
  /**
   * Tab index for keyboard navigation
   */
  tabIndex: number
  /**
   * Ref callback to attach to the item element
   */
  ref: Ref<TElement>
}

export interface UseSortableListReturn<T> {
  /**
   * Get props to spread on a sortable item element (includes ref)
   * @param item - The item to get props for
   * @param index - The current index of the item in the list
   * @returns Props object to spread on the element
   */
  getItemProps: <TElement extends HTMLElement = HTMLElement>(
    item: T,
    index: number
  ) => SortableItemProps<TElement>
}

/**
 * Hook to make a list of items sortable via drag and drop and keyboard navigation
 *
 * @example
 * ```tsx
 * const { getItemProps } = useSortableList({
 *   items: myItems,
 *   onReorder: setMyItems,
 *   getItemKey: (item) => item.id
 * })
 *
 * return (
 *   <ul>
 *     {myItems.map((item, index) => (
 *       <li
 *         key={getItemKey(item)}
 *         {...getItemProps(item, index)}
 *       >
 *         {item.name}
 *       </li>
 *     ))}
 *   </ul>
 * )
 * ```
 */
export function useSortableList<T>({
  items,
  onReorder,
  getItemKey,
}: UseSortableListOptions<T>): UseSortableListReturn<T> {
  // Refs to maintain focus after keyboard reordering
  // Uses a key based on the item rather than index
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
    // Apply inline style for opacity during drag
    ;(e.currentTarget as HTMLElement).style.opacity = 'var(--opacity-dim-3)'
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.setAttribute('data-drag-over', 'true')
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only remove the attribute if we're actually leaving the element
    // (not just moving to a child element)
    const relatedTarget = e.relatedTarget as Node | null
    const currentTarget = e.currentTarget as Node

    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      e.currentTarget.removeAttribute('data-drag-over')
    }
  }

  const handleDragEnd = (e: React.DragEvent) => {
    // Remove inline style for opacity
    ;(e.currentTarget as HTMLElement).style.opacity = ''
    e.currentTarget.removeAttribute('data-drag-over')
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    e.currentTarget.removeAttribute('data-drag-over')

    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)

    if (
      !isNaN(dragIndex) &&
      dragIndex !== dropIndex &&
      dragIndex >= 0 &&
      dragIndex < items.length
    ) {
      const newItems = [...items]
      const [removed] = newItems.splice(dragIndex, 1)
      if (removed) {
        newItems.splice(dropIndex, 0, removed)
        onReorder(newItems)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, _item: T, index: number) => {
    // Determine direction
    let direction = 0
    if (e.key === 'ArrowUp') {
      direction = -1
    } else if (e.key === 'ArrowDown') {
      direction = 1
    } else {
      return
    }

    const targetIndex = index + direction

    // Validate move is within bounds
    if (targetIndex < 0 || targetIndex >= items.length) return

    e.preventDefault()

    // Create new array and swap items
    const newItems = [...items]
    const currentItem = newItems[index]
    const targetItem = newItems[targetIndex]

    if (currentItem && targetItem) {
      ;[newItems[index], newItems[targetIndex]] = [targetItem, currentItem]
      onReorder(newItems)

      // Maintain focus on the moved item
      requestAnimationFrame(() => {
        const itemKey = getItemKey(currentItem)
        const element = itemRefs.current.get(itemKey)
        element?.focus()
      })
    }
  }

  const getItemProps = <TElement extends HTMLElement = HTMLElement>(
    item: T,
    index: number
  ): SortableItemProps<TElement> => {
    const itemKey = getItemKey(item)

    return {
      draggable: true,
      onDragStart: e => handleDragStart(e, index),
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDragEnd: handleDragEnd,
      onDrop: e => handleDrop(e, index),
      onKeyDown: e => handleKeyDown(e, item, index),
      tabIndex: 0,
      ref: (node: TElement | null) => {
        if (node) {
          itemRefs.current.set(itemKey, node as HTMLElement)
        } else {
          itemRefs.current.delete(itemKey)
        }
      },
    }
  }

  return {
    getItemProps,
  }
}
