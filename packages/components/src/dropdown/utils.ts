import { type FC, isValidElement, type ReactElement, type ReactNode, Children } from 'react'

import { type ItemProps } from './DropdownItem'
import { ItemTextProps } from './DropdownItemText'
import { type DropdownItem, type ItemsMap } from './types'

export function getIndexByKey(map: ItemsMap, targetKey: string) {
  let index = 0
  for (const [key] of map.entries()) {
    if (key === targetKey) {
      return index
    }
    index++
  }

  return -1
}

const getKeyAtIndex = (map: ItemsMap, index: number) => {
  let i = 0
  for (const key of map.keys()) {
    if (i === index) return key
    i++
  }

  return undefined
}

export const getElementByIndex = (map: ItemsMap, index: number) => {
  const key = getKeyAtIndex(map, index)

  return key !== undefined ? map.get(key) : undefined
}

const getElementDisplayName = (element?: ReactElement) => {
  return element ? (element.type as FC & { displayName?: string }).displayName : ''
}

export const getOrderedItems = (
  children: ReactNode,
  result: DropdownItem[] = []
): DropdownItem[] => {
  Children.forEach(children, child => {
    if (!isValidElement(child)) return

    if (getElementDisplayName(child) === 'Dropdown.Item') {
      const childProps = child.props as ItemProps
      result.push({
        value: childProps.value,
        disabled: !!childProps.disabled,
        text: getItemText(childProps.children),
      })
    }

    if ((child.props as { children: ReactNode }).children) {
      getOrderedItems((child.props as { children: ReactNode }).children, result)
    }
  })

  return result
}

/**
 * If Dropdown.Item children:
 * - is a string, then the string is used.
 * - is JSX markup, then we look for Dropdown.ItemText to get its string value.
 */
export const getItemText = (children: ReactNode, itemText = ''): string => {
  if (typeof children === 'string') {
    return children
  }

  Children.forEach(children, child => {
    if (!isValidElement(child)) return

    if (getElementDisplayName(child) === 'Dropdown.ItemText') {
      itemText = (child.props as ItemTextProps).children
    }

    if ((child.props as { children: ReactNode }).children) {
      getItemText((child.props as { children: ReactNode }).children, itemText)
    }
  })

  return itemText
}

export const getItemsFromChildren = (children: ReactNode): ItemsMap => {
  const newMap: ItemsMap = new Map()

  getOrderedItems(children).forEach(itemData => {
    newMap.set(itemData.value, itemData)
  })

  return newMap
}

export const hasChildComponent = (children: ReactNode, displayName: string): boolean => {
  return Children.toArray(children).some(child => {
    if (!isValidElement(child)) return false

    if (getElementDisplayName(child) === displayName) {
      return true
    } else if ((child.props as { children: ReactNode }).children) {
      return hasChildComponent((child.props as { children: ReactNode }).children, displayName)
    }

    return false
  })
}
