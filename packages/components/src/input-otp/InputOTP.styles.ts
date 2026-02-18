import { cva, VariantProps } from 'class-variance-authority'

export const inputOTPContainerStyles = cva(['relative', 'inline-flex', 'items-center', 'gap-sm'])

export const inputOTPSlotStyles = cva(
  [
    // Base slot styles
    'relative h-[50px] w-sz-40',
    'border-sm rounded-md',
    'text-center text-display-3 text-on-surface',
    'outline-hidden',
    'transition-colors',
    'flex items-center justify-center',
    // Slot that receives focus when clicking the group (first empty or last slot)
    // Use data-[focus-target=true]:... for distinct styles
    // Active state (when focused)
    'data-[active=true]:ring-1',
    'data-[active=true]:ring-inset',
    'data-[active=true]:ring-l-2',
    'data-[active=true]:border-focus',
    'data-[active=true]:z-raised ring-focus',
    // Disabled state
    'data-[disabled=true]:cursor-not-allowed',
    'data-[disabled=true]:border-outline',
    'data-[disabled=true]:bg-on-surface/dim-5',
    'data-[disabled=true]:text-on-surface/dim-3',
    // Read-only state (same as disabled but text stays normal)
    'data-[readonly=true]:cursor-default',
    'data-[readonly=true]:data-[active=false]:border-outline',
    'data-[readonly=true]:bg-on-surface/dim-5',
    'group-hover:data-[focus-target=true]:data-[disabled=false]:border-outline-high',
  ],
  {
    variants: {
      /**
       * Color scheme of the slot
       */
      intent: {
        neutral: ['data-[filled=true]:bg-neutral-container bg-surface border-outline'],
        success: ['border-success bg-success-container text-on-success-container'],
        alert: ['border-alert bg-alert-container text-on-alert-container'],
        error: ['border-error bg-error-container text-on-error-container'],
      },
    },
    defaultVariants: {
      intent: 'neutral',
    },
  }
)

export type InputOTPSlotStylesProps = VariantProps<typeof inputOTPSlotStyles>

// Keep for backward compatibility
export const inputOTPStyles = inputOTPSlotStyles
export type InputOTPStylesProps = InputOTPSlotStylesProps
