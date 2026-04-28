import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ReactNode } from 'react'

import { useCardContext } from './context'

export const typeStyles = cva(
  [
    // Base structure
    'rounded-t-lg default:text-body-2 default:font-bold',
    'default:text-center',

    // Height and layout
    'min-h-sz-32', // Minimum height same as Backdrop
    'px-md', // Horizontal padding for text
    'py-xs', // Vertical padding for text (allows height to grow)

    // Layout
    'flex items-center justify-center', // Vertical centering of text
    'whitespace-normal break-words', // Allow text wrapping

    // Fix border-radius visual gap by overlapping parent border
    '-mx-px -mt-px',
  ],
  {
    variants: {
      intent: {
        main: ['bg-main text-on-main'],
        support: ['bg-support text-on-support'],
        accent: ['bg-accent text-on-accent'],
        success: ['bg-success text-on-success'],
        alert: ['bg-alert text-on-alert'],
        danger: ['bg-error text-on-error'],
        info: ['bg-info text-on-info'],
        neutral: ['bg-neutral text-on-neutral'],
        surface: ['bg-surface-inverse text-on-surface-inverse'],
      },
    },
    defaultVariants: {
      intent: 'main',
    },
  }
)

type TypeStylesProps = VariantProps<typeof typeStyles>

export interface TypeProps extends ComponentProps<'header'>, TypeStylesProps {
  /**
   * The type or category to display (e.g., "Best seller", "New product")
   */
  children?: ReactNode
}

export const Type = ({ intent, children, ...props }: TypeProps) => {
  const cardContext = useCardContext()

  // Use intent from props if provided, otherwise inherit from parent Card context
  const resolvedIntent = intent ?? cardContext.intent ?? 'main'

  // Don't render if no children provided (for backward compatibility with Backdrop)
  if (!children) {
    return null
  }

  return (
    <header className={typeStyles({ intent: resolvedIntent })} {...props}>
      {children}
    </header>
  )
}

Type.displayName = 'Card.Type'
