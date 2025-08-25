import { ComponentProps } from 'react'

import { Slot } from '../slot'
import { cardStyles, type CardStylesProps } from './Card.styles'
import { CardContext } from './context'
import { hasBackdrop, isInteractive } from './utils'

export interface CardProps extends ComponentProps<'div'>, CardStylesProps {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  /**
   * Whether the card should have an inset padding.
   */
  inset?: boolean
  /**
   * Whether the card content should have a gradient background.
   */
  withGradient?: boolean
}

export const Card = ({
  children,
  design = 'filled',
  intent = 'surface',
  inset = false,
  asChild,
  withGradient,
  className,
  ref,
  ...props
}: CardProps) => {
  const Component = asChild ? Slot : 'div'
  const backdropDetected = hasBackdrop(children)
  const interactiveDetected = isInteractive(children, asChild, props)

  return (
    <CardContext.Provider
      value={{
        design,
        intent,
        hasBackdrop: backdropDetected,
        inset,
        isInteractive: interactiveDetected,
        withGradient,
      }}
    >
      <Component
        data-spark-component="card"
        data-interactive={interactiveDetected}
        ref={ref}
        className={cardStyles({
          className,
          design,
          intent,
          hasBackdrop: backdropDetected,
        })}
        {...props}
      >
        {children}
      </Component>
    </CardContext.Provider>
  )
}

Card.displayName = 'Card'
