import { cva } from 'class-variance-authority'

export const stepItemVariant = cva(
  [
    'relative inline-flex items-start flex-auto first:grow-0 justify-center group/item',
    // Progress Track
    'after:absolute after:z-base',
    'last:after:content-none',
    // Horizontal orientation
    'group-data-[orientation=horizontal]/list:px-[1px]',
    'group-data-[orientation=horizontal]/list:before:absolute group-data-[orientation=horizontal]/list:before:z-base',
    'group-data-[orientation=horizontal]/list:before:left-0 group-data-[orientation=horizontal]/list:after:right-0',
    'group-data-[orientation=horizontal]/list:before:h-[1px] group-data-[orientation=horizontal]/list:after:h-[1px]',
    'first:group-data-[orientation=horizontal]/list:before:content-none',
    // Vertical orientation
    'group-data-[orientation=vertical]/list:py-[1px]',
    'group-data-[orientation=vertical]/list:items-start',
    'group-data-[orientation=vertical]/list:after:w-[1px] group-data-[orientation=vertical]/list:after:bottom-[-1px]',
  ],
  {
    variants: {
      size: {
        sm: [
          // Horizontal orientation
          'group-data-[orientation=horizontal]/list:before:top-[8px] group-data-[orientation=horizontal]/list:after:top-[8px]',
          'group-data-[orientation=horizontal]/list:before:right-[calc(50%+12px)] group-data-[orientation=horizontal]/list:after:left-[calc(50%+12px)]',
          'first:group-data-[orientation=horizontal]/list:after:left-[calc(50%+10px)]',
          'last:group-data-[orientation=horizontal]/list:before:right-[calc(50%+10px)]',
          // Vertical orientation
          'group-data-[orientation=vertical]/list:after:left-[8px]',
          'group-data-[orientation=vertical]/list:after:top-[25px]',
          'first:group-data-[orientation=vertical]/list:after:top-[21px]',
        ],
        md: [
          // Horizontal orientation
          'group-data-[orientation=horizontal]/list:before:top-[12px] group-data-[orientation=horizontal]/list:after:top-[12px]',
          'group-data-[orientation=horizontal]/list:before:right-[calc(50%+16px)] group-data-[orientation=horizontal]/list:after:left-[calc(50%+16px)]',
          'first:group-data-[orientation=horizontal]/list:after:left-[calc(50%+14px)]',
          'last:group-data-[orientation=horizontal]/list:before:right-[calc(50%+14px)]',
          // Vertical orientation
          'group-data-[orientation=vertical]/list:after:left-[12px]',
          'group-data-[orientation=vertical]/list:after:top-[33px]',
          'first:group-data-[orientation=vertical]/list:after:top-[29px]',
        ],
        lg: [
          // Horizontal orientation
          'group-data-[orientation=horizontal]/list:before:top-[16px] group-data-[orientation=horizontal]/list:after:top-[16px]',
          'group-data-[orientation=horizontal]/list:before:right-[calc(50%+20px)] group-data-[orientation=horizontal]/list:after:left-[calc(50%+20px)]',
          'first:group-data-[orientation=horizontal]/list:after:left-[calc(50%+18px)]',
          'last:group-data-[orientation=horizontal]/list:before:right-[calc(50%+18px)]',
          // Vertical orientation
          'group-data-[orientation=vertical]/list:after:left-[16px]',
          'group-data-[orientation=vertical]/list:after:top-[41px]',
          'first:group-data-[orientation=vertical]/list:after:top-[37px]',
        ],
      },
      intent: {
        basic: ['after:bg-basic', 'group-data-[orientation=horizontal]/list:before:bg-basic'],
        support: ['after:bg-support', 'group-data-[orientation=horizontal]/list:before:bg-support'],
        main: ['after:bg-main', 'group-data-[orientation=horizontal]/list:before:bg-main'],
        neutral: ['after:bg-neutral', 'group-data-[orientation=horizontal]/list:before:bg-neutral'],
        info: ['after:bg-info', 'group-data-[orientation=horizontal]/list:before:bg-info'],
        accent: ['after:bg-accent', 'group-data-[orientation=horizontal]/list:before:bg-accent'],
        danger: ['after:bg-error', 'group-data-[orientation=horizontal]/list:before:bg-error'],
        alert: ['after:bg-alert', 'group-data-[orientation=horizontal]/list:before:bg-alert'],
        success: ['after:bg-success', 'group-data-[orientation=horizontal]/list:before:bg-success'],
      },
      disabled: {
        true: 'before:opacity-dim-3',
        false: '',
      },
      disabledAfter: {
        true: 'after:opacity-dim-3',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
      disabledAfter: false,
      size: 'lg',
      intent: 'basic',
    },
  }
)

export const stepButtonVariant = cva(
  [
    'relative flex group/btn disabled:cursor-default',
    // Horizontal orientation
    'group-data-[orientation=horizontal]/list:flex-col group-data-[orientation=horizontal]/list:items-center',
    'group-data-[orientation=horizontal]/list:text-center group-data-[orientation=horizontal]/list:mx-sm',
    'group-first/item:group-data-[orientation=horizontal]/list:ml-0 group-last/item:group-data-[orientation=horizontal]/list:mr-0',
    // Vertical orientation
    'group-data-[orientation=vertical]/list:flex-row group-data-[orientation=vertical]/list:items-start',
    'group-data-[orientation=vertical]/list:text-left group-data-[orientation=vertical]/list:my-sm',
    'group-first/item:group-data-[orientation=vertical]/list:mt-0 group-last/item:group-data-[orientation=vertical]/list:mb-0',
  ],
  {
    variants: {
      size: {
        sm: [
          'group-data-[orientation=horizontal]/list:min-w-sz-16 group-data-[orientation=horizontal]/list:mt-[16px]',
          'group-data-[orientation=vertical]/list:min-h-sz-16 group-data-[orientation=vertical]/list:ml-[16px]',
        ],
        md: [
          'group-data-[orientation=horizontal]/list:min-w-sz-24 group-data-[orientation=horizontal]/list:mt-[24px]',
          'group-data-[orientation=vertical]/list:min-h-sz-24 group-data-[orientation=vertical]/list:ml-[24px]',
        ],
        lg: [
          'group-data-[orientation=horizontal]/list:min-w-sz-32 group-data-[orientation=horizontal]/list:mt-[32px]',
          'group-data-[orientation=vertical]/list:min-h-sz-32 group-data-[orientation=vertical]/list:ml-[32px]',
        ],
      },
      readOnly: {
        true: 'cursor-default',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'lg',
      readOnly: false,
    },
  }
)
