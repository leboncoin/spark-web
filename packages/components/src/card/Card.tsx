import { ComponentProps } from 'react'

import { Slot } from '../slot'
import { cardStyles, type CardStylesProps } from './Card.styles'

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

  return (
    <Component
      data-spark-component="card"
      ref={ref}
      className={cardStyles({
        className,
        design,
        intent,
        inset,
      })}
      {...props}
    >
      {children}
    </Component>
  )
}

Card.displayName = 'Card'
