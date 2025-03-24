import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentPropsWithRef } from 'react'

import { Slot } from '../slot'

const textLinkStyles = cva(['inline-flex items-center focus-visible:u-outline'], {
  variants: {
    intent: {
      current: 'text-current hover:opacity-dim-1',
      main: 'text-main hover:text-main-hovered',
      support: 'text-support hover:text-support-hovered',
      accent: 'text-accent hover:text-accent-hovered',
      basic: 'text-basic hover:text-basic-hovered',
      success: 'text-success hover:text-success-hovered',
      alert: 'text-alert hover:text-alert-hovered',
      danger: 'text-error hover:text-error-hovered',
      info: 'text-info hover:text-info-hovered',
      neutral: 'text-neutral hover:text-neutral-hovered',
    },
    /** By default, TextLink inherits the current font weight. Use `bold` to highlight it. */
    bold: {
      true: 'font-bold',
    },
    /**
     * Underline is enabled by default.
     * You can remove it, but be careful about a11y, as you should make obvious to users what is a link or not.
     */
    underline: {
      true: 'underline',
      false: 'hover:underline focus:underline',
    },
  },
  defaultVariants: {
    intent: 'current',
    bold: false,
    underline: true,
  },
})

export type StylesProps = VariantProps<typeof textLinkStyles>

export type TextLinkProps = ComponentPropsWithRef<'a'> &
  StylesProps & {
    /**
     * Change the component to the HTML tag or custom component of the only child.
     */
    asChild?: boolean
  }

export const TextLink = ({
  asChild = false,
  bold = false,
  children,
  className,
  intent = 'current',
  underline = true,
  ref,
  ...props
}: TextLinkProps) => {
  const Component = asChild ? Slot : 'a'

  return (
    <Component
      ref={ref}
      className={textLinkStyles({ className, bold, intent, underline })}
      {...props}
    >
      {children}
    </Component>
  )
}
