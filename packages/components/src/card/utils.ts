import { Children, isValidElement, type ReactElement, ReactNode } from 'react'

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
  _children: ReactNode,
  render: ReactElement | undefined,
  props: Record<string, any>
): boolean => {
  const hasMouseEventHandlers = MOUSE_EVENTS.some(event => event in props)

  if (hasMouseEventHandlers) {
    return true
  }

  if (!render || !isValidElement(render)) {
    return false
  }

  const interactiveElements = ['a', 'button']
  const isInteractiveElement =
    typeof render.type === 'string' && interactiveElements.includes(render.type)

  if (isInteractiveElement) {
    return true
  }

  const renderProps = (render.props || {}) as Record<string, any>
  const hasRenderEventHandlers = MOUSE_EVENTS.some(event => event in renderProps)

  return hasRenderEventHandlers
}
