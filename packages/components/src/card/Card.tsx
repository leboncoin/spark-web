import { ComponentProps } from 'react'

import { Slot } from '../slot'
import { cardStyles, type CardStylesProps } from './Card.styles'
import { hasBackdrop } from './utils'
import { CardContext } from './context'

export interface CardProps extends ComponentProps<'div'>, CardStylesProps {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  /**
   * Whether the card should have an inset padding.
   */
  inset?: boolean
}

export const Card = ({
  children,
  design = 'filled',
  intent = 'surface',
  inset = false,
  asChild,
  className,
  ref,
  ...props
}: CardProps) => {
  const Component = asChild ? Slot : 'div'
  const backdropDetected = hasBackdrop(children)

  return (
    <CardContext.Provider
      value={{
        design,
        intent,
        hasBackdrop: backdropDetected,
        inset,
      }}
    >
      <Component
        data-spark-component="card"
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
