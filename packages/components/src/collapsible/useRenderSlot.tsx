import { createElement, isValidElement, type ReactElement, type ReactNode } from 'react'

export function useRenderSlot(asChild: boolean, children: ReactNode) {
  if (!asChild || !isValidElement(children)) {
    return { renderProp: undefined, innerChildren: children }
  }

  const { children: innerChildren, ...childProps } = (children as ReactElement<any>).props

  return {
    renderProp: createElement((children as ReactElement<any>).type, childProps),
    innerChildren,
  }
}
