import { Children, isValidElement, ReactNode } from 'react'

const MOUSE_EVENTS = [
  'onClick',
  'onMouseDown',
  'onMouseUp',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOver',
  'onMouseOut',
  'onDoubleClick',
  'onContextMenu',
] as const

export const hasBackdrop = (children: ReactNode): boolean => {
  let backdropFound = false

  const searchForBackdrop = (node: ReactNode): void => {
    if (backdropFound) return

    Children.forEach(node, child => {
      if (backdropFound) return

      if (isValidElement(child)) {
        const isBackdropComponent =
          typeof child.type === 'function' &&
          (child.type as { displayName?: string }).displayName === 'Card.Backdrop'

        if (isBackdropComponent) {
          backdropFound = true

          return
        }

        const hasChildren =
          child.props && typeof child.props === 'object' && 'children' in child.props

        if (hasChildren) {
          const childChildren = (child.props as { children: ReactNode }).children
          if (childChildren !== undefined && childChildren !== null) {
            searchForBackdrop(childChildren)
          }
        }
      }
    })
  }

  searchForBackdrop(children)

  return backdropFound
}

export const isInteractive = (
  children: ReactNode,
  asChild: boolean | undefined,
  props: Record<string, any>
): boolean => {
  const hasMouseEventHandlers = MOUSE_EVENTS.some(event => event in props)

  if (hasMouseEventHandlers) {
    return true
  }

  if (!asChild) {
    return false
  }

  const child = Children.only(children)

  if (!isValidElement(child)) {
    return false
  }

  const interactiveElements = ['a', 'button']
  const isInteractiveElement =
    typeof child.type === 'string' && interactiveElements.includes(child.type)

  if (isInteractiveElement) {
    return true
  }

  const childProps = child.props as Record<string, any>
  const hasChildEventHandlers = MOUSE_EVENTS.some(event => event in childProps)

  return hasChildEventHandlers
}
