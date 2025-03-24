import { cva, VariantProps } from 'class-variance-authority'

export const inputAddonStyles = cva(
  [
    'overflow-hidden',
    'border-sm',
    'shrink-0',
    'h-full',
    'focus-visible:relative focus-visible:z-raised',
  ],
  {
    variants: {
      /**
       * Change the component to the HTML tag or custom component of the only child.
       */
      asChild: { false: ['flex', 'items-center', 'px-lg'] },
      intent: {
        neutral: 'border-outline',
        error: 'border-error',
        alert: 'border-alert',
        success: 'border-success',
      },
      /**
       * Disable the input addon, preventing user interaction and adding opacity.
       */
      disabled: {
        true: ['pointer-events-none border-outline!'],
      },
      /**
       * Changes input addon styles based on the read only status from the input.
       */
      readOnly: {
        true: ['pointer-events-none'],
      },
      /**
       * Main style of the input addon.
       */
      design: {
        text: '',
        solid: '',
        inline: '',
      },
    },
    compoundVariants: [
      {
        disabled: false,
        readOnly: false,
        design: 'text',
        class: ['bg-surface', 'text-on-surface'],
      },
      {
        disabled: true,
        design: 'text',
        class: ['text-on-surface/dim-3'],
      },
      {
        disabled: true,
        design: ['solid', 'inline'],
        class: ['opacity-dim-3'],
      },
    ],
    defaultVariants: {
      intent: 'neutral',
    },
  }
)

export type InputAddonStylesProps = VariantProps<typeof inputAddonStyles>
