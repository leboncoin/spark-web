import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ReactNode } from 'react'

import { useCardContext } from './context'

export const typeStyles = cva(
  [
    // Base structure
    'rounded-t-lg default:text-body-2-highlight',
    'default:text-center',

    // Height and layout
    'min-h-sz-32', // Minimum height same as Backdrop
    'px-md', // Horizontal padding for text
    'py-xs', // Vertical padding for text (allows height to grow)

    // Layout
    'flex items-center justify-center', // Vertical centering of text
    'whitespace-normal break-words', // Allow text wrapping
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
      design: {
        outlined: [], // Margins handled via compoundVariants to account for border width
        tinted: [],
      },
      hasMediumBorder: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      { design: 'outlined', hasMediumBorder: false, class: '-mx-px -mt-px' },
      {
        design: 'outlined',
        hasMediumBorder: true,
        class: '-mx-(--border-width-md) -mt-(--border-width-md)',
      },
    ],
    defaultVariants: {
      intent: 'main',
      design: 'outlined',
      hasMediumBorder: false,
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

  // Card with outlined design and hasType=true uses border-md (2px), so Type needs -2px margins
  const hasMediumBorder = cardContext.design === 'outlined' && cardContext.hasType

  // Don't render if no children provided (for backward compatibility with Backdrop)
  if (!children) {
    return null
  }

  return (
    <header
      className={typeStyles({
        intent: resolvedIntent,
        design: cardContext.design,
        hasMediumBorder,
      })}
      {...props}
    >
      {children}
    </header>
  )
}

Type.displayName = 'Card.Type'
