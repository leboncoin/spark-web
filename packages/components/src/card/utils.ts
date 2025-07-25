import { Children, isValidElement, ReactNode } from 'react'

export const hasBackdrop = (children: ReactNode): boolean => {
  let found = false

  const checkChildren = (node: ReactNode): void => {
    if (found) return

    Children.forEach(node, child => {
      if (found) return

      if (isValidElement(child)) {
        const isBackdropElement =
          typeof child.type === 'function' &&
          (child.type as { displayName?: string }).displayName === 'Card.Backdrop'

        if (isBackdropElement) {
          found = true

          return
        }

        // Recursively check children
        if (child.props && typeof child.props === 'object' && 'children' in child.props) {
          const children = child.props.children as ReactNode
          if (children !== undefined && children !== null) {
            checkChildren(children)
          }
        }
      }
    })
  }

  checkChildren(children)

  return found
}
