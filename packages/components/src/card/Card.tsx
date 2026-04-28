import { ComponentProps } from 'react'

import { Slot } from '../slot'
import { cardStyles, type CardStylesProps } from './Card.styles'
import { CardContext } from './context'
import { hasType, isInteractive } from './utils'

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
  design = 'outlined',
  intent = 'surface',
  inset = false,
  asChild,
  className,
  ref,
  ...props
}: CardProps) => {
  const Component = asChild ? Slot : 'div'
  const typeDetected = hasType(children)
  const interactiveDetected = isInteractive(children, asChild, props)

  return (
    <CardContext.Provider
      value={{
        design,
        intent,
        hasType: typeDetected,
        inset,
        isInteractive: interactiveDetected,
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
        })}
        {...props}
      >
        {children}
      </Component>
    </CardContext.Provider>
  )
}

Card.displayName = 'Card'
