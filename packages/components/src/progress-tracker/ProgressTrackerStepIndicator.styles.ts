import { cva, VariantProps } from 'class-variance-authority'

export const stepIndicatorVariant = cva(
  [
    'relative flex shrink-0 justify-center items-center',
    'rounded-full',
    'text-body-2 font-bold',
    'group-disabled/btn:opacity-dim-3',
  ],
  {
    variants: {
      size: {
        sm: [
          'w-sz-16 h-sz-16',
          'group-data-[orientation=horizontal]/list:mt-[-16px]',
          'group-data-[orientation=vertical]/list:ml-[-16px]',
        ],
        md: [
          'w-sz-24 h-sz-24',
          'group-data-[orientation=horizontal]/list:mt-[-24px]',
          'group-data-[orientation=vertical]/list:ml-[-24px]',
        ],
        lg: [
          'w-sz-32 h-sz-32',
          'group-data-[orientation=horizontal]/list:mt-[-32px]',
          'group-data-[orientation=vertical]/list:ml-[-32px]',
        ],
      },
      intent: {
        support: '',
        neutral: '',
        success: '',
      },
      state: {
        complete: '',
        incomplete: '',
        active: '',
      },
    },
    /**
     * Known type issue with CVA compoundVariants and VS Code/Intellisense:
     * https://github.com/joe-bell/cva/discussions/195#discussioncomment-6750163
     * */
    /* @ts-ignore */
    compoundVariants: [
      // Support
      {
        intent: 'support',
        state: ['complete', 'incomplete'],
        class: [
          'text-on-support-container bg-support-container',
          'group-hover/btn:group-data-[interactive=true]/btn:bg-support-container-hovered',
          'group-hover/btn:group-data-[interactive=false]/btn:bg-support-container',
        ],
      },
      {
        intent: 'support',
        state: 'active',
        class: 'text-on-support bg-support',
      },
      // Neutral
      {
        intent: 'neutral',
        state: ['complete', 'incomplete'],
        class: [
          'text-on-neutral-container bg-neutral-container',
          'group-hover/btn:group-data-[interactive=true]/btn:bg-neutral-container-hovered',
          'group-hover/btn:group-data-[interactive=false]/btn:bg-neutral-container',
        ],
      },
      {
        intent: 'neutral',
        state: 'active',
        class: 'text-on-neutral bg-neutral',
      },
      // Success
      {
        intent: 'success',
        state: ['complete', 'incomplete'],
        class: [
          'text-on-success-container bg-success-container',
          'group-hover/btn:group-data-[interactive=true]/btn:bg-success-container-hovered',
          'group-hover/btn:group-data-[interactive=false]/btn:bg-success-container',
        ],
      },
      {
        intent: 'success',
        state: 'active',
        class: 'text-on-success bg-success',
      },
    ],
    defaultVariants: {
      size: 'lg',
      state: 'incomplete',
      intent: 'support',
    },
  }
)

export type StepIndicatorVariantProps = VariantProps<typeof stepIndicatorVariant>
