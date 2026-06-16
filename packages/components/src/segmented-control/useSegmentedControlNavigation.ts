import { KeyboardEvent, RefObject } from 'react'

interface UseSegmentedControlNavigationProps {
  itemValues: string[]
  containerRef: RefObject<HTMLDivElement | null>
  onValueChange: (value: string) => void
}

/**
 * Custom hook that handles keyboard navigation for SegmentedControl.
 * Uses sequential left/right navigation.
 */
export const useSegmentedControlNavigation = ({
  itemValues,
  containerRef,
  onValueChange,
}: UseSegmentedControlNavigationProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Find the currently focused item (which may differ from checkedValue during keyboard navigation)
    const focusedElement = e.target as HTMLElement
    const focusedValue = focusedElement.getAttribute('data-value')

    if (!focusedValue) return

    const currentIndex = itemValues.indexOf(focusedValue)
    if (currentIndex === -1) return

    let nextIndex: number | null = null

    // Always use 1D sequential navigation (left/right only)
    nextIndex = calculate1DNavigation(e.key, currentIndex, itemValues.length)

    if (nextIndex !== null && nextIndex !== currentIndex) {
      e.preventDefault()

      // Skip disabled items
      let attempts = 0
      const maxAttempts = itemValues.length

      while (attempts < maxAttempts) {
        const nextValue = itemValues[nextIndex]
        if (!nextValue) return

        const nextItem = containerRef.current?.querySelector<HTMLElement>(
          `[data-value="${CSS.escape(nextValue)}"]`
        )

        // If the item is not disabled, focus it and update the value
        if (nextItem && !nextItem.hasAttribute('data-disabled')) {
          nextItem.focus()
          onValueChange(nextValue)
          return
        }

        // If disabled, continue in the same direction
        const direction = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
        nextIndex = (nextIndex + direction + itemValues.length) % itemValues.length
        attempts++
      }
    }
  }

  return { handleKeyDown }
}

/**
 * Calculate next index for 1D sequential navigation.
 * Navigation wraps around at the boundaries.
 */
function calculate1DNavigation(
  key: string,
  currentIndex: number,
  totalItems: number
): number | null {
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (currentIndex + 1) % totalItems
    case 'ArrowLeft':
    case 'ArrowUp':
      return (currentIndex - 1 + totalItems) % totalItems
    default:
      return null
  }
}
