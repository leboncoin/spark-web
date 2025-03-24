import { Children, type FC, isValidElement, type ReactElement, type ReactNode } from 'react'

import { type ItemProps } from './SelectItem'
import { type ItemsMap, type SelectItem } from './types'

export const findElement = (children: ReactNode) => (name: string) => {
  const validChildren = Children.toArray(children).filter(isValidElement)

  return validChildren.find(child => {
    return getElementDisplayName(child)?.includes(name)
  })
}

const getElementDisplayName = (element?: ReactElement) => {
  return element ? (element.type as FC & { displayName?: string }).displayName : ''
}

const getOrderedItems = (children: ReactNode, result: SelectItem[] = []): SelectItem[] => {
  Children.forEach(children, child => {
    if (!isValidElement(child)) return

    if (
      getElementDisplayName(child) === 'Select.Item' ||
      getElementDisplayName(child) === 'Select.Placeholder'
    ) {
      const childProps = child.props as ItemProps
      result.push({
        value: childProps.value,
        disabled: !!childProps.disabled,
        text: childProps.children,
      })
    }

    if ((child.props as { children: ReactNode }).children) {
      getOrderedItems((child.props as { children: ReactNode }).children, result)
    }
  })

  return result
}

export const getItemsFromChildren = (children: ReactNode): ItemsMap => {
  const newMap: ItemsMap = new Map()

  getOrderedItems(children).forEach(itemData => {
    newMap.set(itemData.value, itemData)
  })

  return newMap
}
