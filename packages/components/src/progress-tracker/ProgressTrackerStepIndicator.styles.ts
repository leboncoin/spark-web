import { cva, type VariantProps } from 'class-variance-authority'

import { outlineVariants, tintedVariants } from './stepIndicatorVariants'

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
        basic: '',
        support: '',
        main: '',
        neutral: '',
        info: '',
        accent: '',
        danger: '',
        alert: '',
        success: '',
      },
      design: {
        outline: 'border-sm',
        tinted: '',
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
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    compoundVariants: [...outlineVariants, ...tintedVariants],
    defaultVariants: {
      size: 'lg',
      state: 'incomplete',
      intent: 'basic',
      design: 'outline',
    },
  }
)

export type StepIndicatorVariantProps = VariantProps<typeof stepIndicatorVariant>
