import { Button } from '@spark-ui/components/button'
import { animate, useAnimate } from '@spark-ui/theme-utils'
import { useRef } from 'react'

// Example 1: Basic usage with animate function
export function BasicSparkAnimateExample() {
  const elementRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    animate(elementRef.current, 'animate-shake-x animation-duration-500')
  }

  return (
    <Button ref={elementRef} onClick={handleClick}>
      Click me!
    </Button>
  )
}

// Example 2: Using the useAnimate hook
export function HookSparkAnimateExample() {
  const elementRef = useRef<HTMLButtonElement>(null)
  const triggerAnimation = useAnimate(elementRef)

  const handleClick = () => {
    triggerAnimation('animate-scale-in animation-duration-150')
  }

  return (
    <Button
      ref={elementRef}
      className="bg-accent text-on-accent flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg font-semibold"
      onClick={handleClick}
    >
      Click me!
    </Button>
  )
}
