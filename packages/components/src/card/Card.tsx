import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ComponentProps } from 'react'

import { cardStyles, type CardStylesProps } from './Card.styles'
import { CardContext } from './context'
import { hasBackdrop, isInteractive } from './utils'

export interface CardProps
  extends useRender.ComponentProps<'div'>,
    ComponentProps<'div'>,
    CardStylesProps {
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
  render,
  className,
  ref,
  ...props
}: CardProps) => {
  const backdropDetected = hasBackdrop(children)
  const interactiveDetected = isInteractive(
    children,
    typeof render === 'function' ? undefined : render,
    props
  )

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'card',
    'data-interactive': interactiveDetected,
    className: cardStyles({
      className,
      design,
      intent,
      hasBackdrop: backdropDetected,
    }),
    children,
  }

  const element = useRender({
    defaultTagName: 'div',
    render,
    ref,
    props: mergeProps<'div'>(defaultProps, props),
  })

  return (
    <CardContext.Provider
      value={{
        design,
        intent,
        hasBackdrop: backdropDetected,
        inset,
        isInteractive: interactiveDetected,
      }}
    >
      {element}
    </CardContext.Provider>
  )
}

Card.displayName = 'Card'
