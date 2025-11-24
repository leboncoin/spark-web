import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { useSortableList } from './useSortableList'

const meta: Meta = {
  title: 'Hooks/useSortableList',
  tags: ['hooks'],
}

export default meta

interface SimpleItem {
  id: string
  name: string
}

export const Default: StoryFn = () => {
  const [items, setItems] = useState<SimpleItem[]>([
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
    { id: '5', name: 'Item 5' },
    { id: '6', name: 'Item 6' },
    { id: '7', name: 'Item 7' },
    { id: '8', name: 'Item 8' },
    { id: '9', name: 'Item 9' },
    { id: '10', name: 'Item 10' },
  ])

  const { getItemProps } = useSortableList<SimpleItem, HTMLLIElement>({
    items,
    onReorder: setItems,
    getItemKey: item => item.id,
  })

  return (
    <ul className="gap-md flex flex-row flex-wrap">
      {items.map((item, index) => {
        const props = getItemProps(item, index)

        return (
          <li
            key={item.id}
            {...props}
            className="border-sm size-sz-96 bg-surface text-on-surface data-drag-over:bg-surface-hovered flex cursor-move items-center justify-center rounded-lg border-dashed"
            aria-label={`Drag to reorder ${item.name}`}
          >
            {item.name}
          </li>
        )
      })}
    </ul>
  )
}
