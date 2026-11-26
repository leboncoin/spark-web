import { autoUpdate } from '@floating-ui/dom'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cx } from 'class-variance-authority'
import { Popover as RadixPopover } from 'radix-ui'
import { ComponentProps, Ref, useEffect, useLayoutEffect, useState } from 'react'

import { usePopover } from './PopoverContext'

export interface OverlayProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
  /**
   * Specify a container element to portal the overlay into.
   */
  container?: RadixPopover.PopoverPortalProps['container']
  /**
   * Space (in px) between the highlighted element and the edges of the spotlight.
   * @default 8
   */
  spotlightPadding?: number
  /**
   * Corner radius (in px) of the spotlight.
   * @default 8
   */
  spotlightRadius?: number
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

/** Duration of the spotlight transition when it moves to another element (ex: next onboarding step). */
const SPOTLIGHT_TRANSITION_MS = 300

const isSameRect = (a: Rect | null, b: Rect | null) =>
  a === b ||
  (!!a && !!b && a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height)

/**
 * A full-size rectangle, minus a rounded rectangle around the target.
 * The `evenodd` fill rule turns the inner shape into a hole that lets the target show (and be hit) through the overlay.
 * The path always has the same structure so that the browser can interpolate it when the spotlight moves.
 */
export const getSpotlightClipPath = ({ x, y, width, height }: Rect, radius: number) => {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2))
  const right = x + width
  const bottom = y + height
  const outer = 'M-99999,-99999 H99999 V99999 H-99999 Z'
  const inner = [
    `M${x + r},${y}`,
    `H${right - r}`,
    `A${r},${r} 0 0 1 ${right},${y + r}`,
    `V${bottom - r}`,
    `A${r},${r} 0 0 1 ${right - r},${bottom}`,
    `H${x + r}`,
    `A${r},${r} 0 0 1 ${x},${bottom - r}`,
    `V${y + r}`,
    `A${r},${r} 0 0 1 ${x + r},${y}`,
    'Z',
  ].join(' ')

  return `path(evenodd, "${outer} ${inner}")`
}

/**
 * Keeps track of the position of `target` relative to `overlay` (on scroll, resize, layout shifts...).
 */
const useSpotlightRect = ({
  target,
  overlay,
  padding,
}: {
  target: HTMLElement | null
  overlay: HTMLElement | null
  padding: number
}) => {
  const [rect, setRect] = useState<Rect | null>(null)

  useLayoutEffect(() => {
    if (!target || !overlay) {
      setRect(null)

      return
    }

    const update = () => {
      const targetRect = target.getBoundingClientRect()
      const overlayRect = overlay.getBoundingClientRect()
      const nextRect = {
        x: targetRect.x - overlayRect.x - padding,
        y: targetRect.y - overlayRect.y - padding,
        width: targetRect.width + padding * 2,
        height: targetRect.height + padding * 2,
      }

      setRect(prevRect => (isSameRect(prevRect, nextRect) ? prevRect : nextRect))
    }

    return autoUpdate(target, overlay, update)
  }, [target, overlay, padding])

  return rect
}

/**
 * Returns `true` for a short period after `target` changed from one element to another,
 * so that the spotlight animates between elements, but follows scroll/resize instantly.
 */
const useIsMovingToNewTarget = (target: HTMLElement | null) => {
  const [previousTarget, setPreviousTarget] = useState(target)
  const [isMoving, setIsMoving] = useState(false)

  if (target !== previousTarget) {
    setPreviousTarget(target)
    if (previousTarget && target) setIsMoving(true)
  }

  useEffect(() => {
    if (!isMoving) return

    const timeout = setTimeout(() => setIsMoving(false), SPOTLIGHT_TRANSITION_MS)

    return () => clearTimeout(timeout)
  }, [isMoving, target])

  return isMoving
}

/**
 * The backdrop element that dims the rest of the page while the popover is open. Useful for onboarding experiences.
 * It cuts a hole (spotlight) around the element the popover is attached to: `Popover.Anchor` if used, `Popover.Trigger` otherwise.
 * While highlighted, this element receives a `data-spotlighted` attribute.
 * It is portaled on its own: render it as a sibling of Popover.Portal, not inside it. Renders a <div> element.
 */
export const Overlay = ({
  className,
  container,
  spotlightPadding = 8,
  spotlightRadius = 8,
  style,
  ref,
  ...props
}: OverlayProps) => {
  const { open, anchorElement, triggerElement } = usePopover()
  const [overlayElement, setOverlayElement] = useState<HTMLDivElement | null>(null)
  const mergedRef = useMergeRefs<HTMLDivElement | null>(ref, setOverlayElement)

  const target = open ? (anchorElement ?? triggerElement) : null
  const rect = useSpotlightRect({ target, overlay: overlayElement, padding: spotlightPadding })
  const isMoving = useIsMovingToNewTarget(target)

  useEffect(() => {
    if (!target) return

    target.setAttribute('data-spotlighted', '')

    return () => target.removeAttribute('data-spotlighted')
  }, [target])

  return (
    <RadixPopover.Portal container={container}>
      <div
        ref={mergedRef}
        data-spark-component="popover-overlay"
        data-state={open ? 'open' : 'closed'}
        data-spotlight={rect ? '' : undefined}
        aria-hidden="true"
        className={cx(
          'z-overlay size-screen fixed inset-0',
          'bg-overlay/dim-1',
          'data-[state=open]:animate-fade-in',
          'data-[state=closed]:animate-fade-out data-[state=closed]:pointer-events-none',
          isMoving &&
            'motion-safe:ease-standard motion-safe:transition-[clip-path] motion-safe:duration-300',
          className
        )}
        style={{
          ...(rect && { clipPath: getSpotlightClipPath(rect, spotlightRadius) }),
          ...style,
        }}
        {...props}
      />
    </RadixPopover.Portal>
  )
}

Overlay.displayName = 'Popover.Overlay'
