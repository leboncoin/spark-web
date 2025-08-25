import type { RefObject } from 'react'

/**
 * Utility function to animate an element with CSS animation classes
 * and automatically remove the classes when the animation is complete.
 *
 * @param element - The HTML element to animate
 * @param animationClasses - The CSS classes containing the animation (can be multiple classes)
 * @param options - Optional configuration for the animation
 */
export function animate(
  element: Element | null,
  animationClasses: string,
  options: {
    /** Whether to remove the classes after animation (default: true) */
    removeAfterAnimation?: boolean
    /** Callback when animation starts */
    onStart?: () => void
    /** Callback when animation ends */
    onEnd?: () => void
  } = {}
): void {
  if (!element) {
    // eslint-disable-next-line no-console
    console.warn('animate: Element is null or undefined')

    return
  }

  const { removeAfterAnimation = true, onStart, onEnd } = options

  // Call onStart callback
  onStart?.()

  // Split classes and add them to the element
  const classArray = animationClasses.trim().split(/\s+/)

  // Add each class individually to avoid issues with spaces
  for (let i = 0; i < classArray.length; i++) {
    const className = classArray[i]
    if (className && className.length > 0) {
      element.classList.add(className)
    }
  }

  // Set up the animation end listener
  const handleAnimationEnd = () => {
    if (removeAfterAnimation) {
      // Remove each class individually to avoid issues with spaces
      for (let i = 0; i < classArray.length; i++) {
        const className = classArray[i]
        if (className && className.length > 0) {
          element.classList.remove(className)
        }
      }
    }
    onEnd?.()

    // Clean up the event listener
    element.removeEventListener('animationend', handleAnimationEnd)
    element.removeEventListener('animationcancel', handleAnimationEnd)
  }

  // Listen for animation end
  element.addEventListener('animationend', handleAnimationEnd)
  element.addEventListener('animationcancel', handleAnimationEnd)
}

/**
 * Hook-like function for React components that returns a function to trigger animations
 *
 * @param elementRef - React ref to the element to animate
 * @returns Function to trigger the animation
 */
export function useAnimate(elementRef: RefObject<Element | null>) {
  return (animationClasses: string, options?: Parameters<typeof animate>[2]) => {
    animate(elementRef.current, animationClasses, options)
  }
}
