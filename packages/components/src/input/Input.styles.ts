import { cva, VariantProps } from 'class-variance-authority'

export const inputStyles = cva(
  [
    'relative',
    'border-sm',
    'peer',
    'w-full',
    'appearance-none outline-hidden',
    'bg-surface',
    'text-ellipsis text-body-1 text-on-surface',
    'caret-neutral',
    'autofill:shadow-surface autofill:shadow-[inset_0_0_0px_1000px]',
    'disabled:cursor-not-allowed disabled:border-outline disabled:bg-on-surface/dim-5 disabled:text-on-surface/dim-3',
    'read-only:cursor-default read-only:pointer-events-none read-only:bg-on-surface/dim-5',
    'focus:ring-1 focus:ring-inset',
  ],
  {
    variants: {
      /**
       * Change the component to the HTML tag or custom component of the only child.
       */
      asChild: {
        true: ['min-h-sz-44'],
        false: ['h-sz-44'],
      },
      /**
       * Color scheme of the button.
       */
      intent: {
        neutral: [
          'border-outline',
          'hover:border-outline-high',
          'focus:ring-outline-high focus:border-outline-high',
        ],
        success: ['border-success', 'focus:ring-success'],
        alert: ['border-alert', 'focus:ring-alert'],
        error: ['border-error', 'focus:ring-error'],
      },
      /**
       * Sets if there is an addon before the input text.
       */
      hasLeadingAddon: {
        true: ['rounded-l-0'],
        false: ['rounded-l-lg'],
      },
      /**
       * Sets if there is an addon after the input text.
       */
      hasTrailingAddon: {
        true: ['rounded-r-0'],
        false: ['rounded-r-lg'],
      },
      /**
       * Sets if there is an icon before the input text.
       */
      hasLeadingIcon: {
        true: ['pl-3xl'],
        false: ['pl-lg'],
      },
      /**
       * Sets if there is an icon after the input text.
       */
      hasTrailingIcon: { true: '' },
      /**
       * Sets if there is a button to clear the input text.
       */
      hasClearButton: { true: '' },
    },
    compoundVariants: [
      {
        hasTrailingIcon: false,
        hasClearButton: false,
        class: 'pr-lg',
      },
      {
        hasTrailingIcon: true,
        hasClearButton: false,
        class: 'pr-3xl',
      },
      {
        hasTrailingIcon: false,
        hasClearButton: true,
        class: 'pr-3xl',
      },
      {
        hasTrailingIcon: true,
        hasClearButton: true,
        class: 'pr-[calc(var(--spacing-3xl)*2)]',
      },
    ],
    defaultVariants: {
      intent: 'neutral',
    },
  }
)

export type InputStylesProps = VariantProps<typeof inputStyles>
