import { cva, cx } from 'class-variance-authority'
import { type ReactNode } from 'react'

export const cardStyles = cva(
  [
    'sb-unstyled',
    'inline-flex w-sz-224 flex-col justify-between overflow-hidden rounded-lg p-sm',
    'transition-all duration-200',
    'text-left text-body-1 font-bold text-on-basic',
    'bg-linear-to-br from-main to-basic',
    'outline-hidden focus-visible:ring-2 focus-visible:ring-outline-high',
  ],
  {
    variants: {
      disabled: {
        true: 'opacity-dim-3 hover:cursor-not-allowed',
        false: 'hover:cursor-pointer',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
)

interface Props {
  children: ReactNode
  className?: string
  description?: string
  href?: string
  isExternalLink?: boolean
}

export const Card = ({
  children,
  className,
  description,
  href,
  isExternalLink = false,
  ...rest
}: Props) => {
  const dynamicProps = isExternalLink
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {}

  return (
    <a className={cx(cardStyles(rest), className)} href={href} {...dynamicProps}>
      <div className="sb-unstyled bg-surface p-md text-on-surface h-full rounded-[12px]">
        {children}

        {description && (
          <>
            <hr className="sb-unstyled my-md border-outline" />
            <p className="text-body-2 font-regular">{description}</p>
          </>
        )}
      </div>
    </a>
  )
}
