import { type PropsWithChildren, Ref, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  /**
   * An optional different container where the portaled content should be appended.
   */
  container?: HTMLElement | null
  ref?: Ref<HTMLDivElement>
}

/**
 * A utility component that renders content into a different part of the DOM tree, typically outside the main hierarchy.
 */
export const Portal = ({ children, container }: PropsWithChildren<PortalProps>) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  const targetContainer = container ?? (typeof document !== 'undefined' ? document.body : null)

  if (!targetContainer) return null

  return createPortal(children, targetContainer)
}
