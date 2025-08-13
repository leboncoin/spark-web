import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const backdropStyles = cva(
  [
    'default:bg-surface default:bg-gradient-to-r absolute inset-x-0 top-0',
    'h-sz-16',
    'default:rounded-t-lg',
    'bg-[length:200%_100%] bg-position-[0%_0%]',
  ],
  {
    variants: {
      animation: {
        none: '',
        pulse: 'animate-standalone-backdrop-pulse',
      },
      intent: makeVariants<
        'intent',
        [
          'main',
          'support',
          'accent',
          'basic',
          'success',
          'alert',
          'danger',
          'info',
          'neutral',
          'surface',
          'surfaceInverse',
        ]
      >({
        main: ['default:from-main/dim-4 default:via-main/dim-2 default:to-main/dim-4'],
        support: ['default:from-support/dim-4 default:via-support/dim-2 default:to-support/dim-4'],
        accent: ['default:from-accent/dim-4 default:via-accent/dim-2 default:to-accent/dim-4'],
        basic: ['default:from-basic/dim-4 default:via-basic/dim-2 default:to-basic/dim-4'],
        success: ['default:from-success/dim-4 default:via-success/dim-2 default:to-success/dim-4'],
        alert: ['default:from-alert/dim-4 default:via-alert/dim-2 default:to-alert/dim-4'],
        danger: ['default:from-error/dim-4 default:via-error/dim-2 default:to-error/dim-4'],
        info: ['default:from-info/dim-4 default:via-info/dim-2 default:to-info/dim-4'],
        neutral: ['default:from-neutral/dim-4 default:via-neutral/dim-2 default:to-neutral/dim-4'],
        surface: ['default:from-outline/dim-4 default:via-outline/dim-2 default:to-outline/dim-4'],
        surfaceInverse: [
          'default:from-surface/dim-4 default:via-surface/dim-2 default:to-surface/dim-4',
        ],
      }),
    },
    defaultVariants: {
      intent: 'main',
      animation: 'none',
    },
  }
)

export type BackdropStylesProps = VariantProps<typeof backdropStyles>

interface BackdropProps extends BackdropStylesProps {
  className?: string
}

export const Backdrop = ({ intent = 'main', animation = 'none', ...props }: BackdropProps) => {
  return <div className={backdropStyles({ intent, animation })} {...props} />
}

Backdrop.displayName = 'Card.Backdrop'
