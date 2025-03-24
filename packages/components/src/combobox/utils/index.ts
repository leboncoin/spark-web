import { type FC, isValidElement, type ReactElement, type ReactNode, Children } from 'react'

import { type ItemProps } from '../ComboboxItem'
import { type ItemTextProps } from '../ComboboxItemText'
import { type ComboboxItem, type ItemsMap } from '../types'

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
  result: ComboboxItem[] = []
): ComboboxItem[] => {
  Children.forEach(children, child => {
    if (!isValidElement(child)) return

    if (getElementDisplayName(child) === 'Combobox.Item') {
      const childProps = child.props as ItemProps
      result.push({
        value: childProps.value,
        disabled: !!childProps.disabled,
        text: getItemText(childProps.children),
      })
    }

    if ((child.props as ItemProps).children) {
      getOrderedItems((child.props as ItemProps).children, result)
    }
  })

  return result
}

const findNestedItemText = (children: ReactNode): string => {
  if (!children) return ''

  for (const child of Children.toArray(children)) {
    if (isValidElement(child)) {
      const childElement = child as ReactElement

      if (getElementDisplayName(childElement) === 'Combobox.ItemText') {
        return (childElement.props as ItemTextProps).children
      }

      const foundText = findNestedItemText((childElement.props as ItemTextProps).children)

      if (foundText) return foundText
    }
  }

  return ''
}

/**
 * If Combobox.Item children:
 * - is a string, then the string is used.
 * - is JSX markup, then we look for Combobox.ItemText to get its string value.
 */
export const getItemText = (children: ReactNode): string => {
  return typeof children === 'string' ? children : findNestedItemText(children)
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

export const findElement = (children: ReactNode, value: string) => {
  return Children.toArray(children)
    .filter(isValidElement)
    .find(child => value === getElementDisplayName(child) || '')
}
