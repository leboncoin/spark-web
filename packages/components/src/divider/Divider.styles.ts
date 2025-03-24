import { tw } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

import { intentVariants } from './variants/intents'

export const dividerStyles = cva(['overflow-hidden group'], {
  variants: {
    isEmpty: {
      true: ['border-solid'],
      false: ['inline-flex items-center', 'after:border-solid before:border-solid'],
    },
    orientation: {
      vertical: ['w-fit inline-flex'],
      horizontal: ['w-full'],
    },
    writingMode: {
      'horizontal-tb': [],
      'vertical-lr': [],
    },
    alignment: {
      start: [],
      end: [],
      center: [],
    },
    intent: {
      current: [],
      outline: [],
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    writingMode: 'horizontal-tb',
    alignment: 'center',
    intent: 'outline',
  },
  compoundVariants: [
    {
      isEmpty: true,
      orientation: 'horizontal',
      class: tw(['my-lg border-t-sm']),
    },
    {
      isEmpty: true,
      orientation: 'vertical',
      class: tw(['mx-lg min-h-sz-24 border-l-sm']),
    },
    {
      isEmpty: false,
      orientation: 'horizontal',
      writingMode: 'horizontal-tb',
      class: tw(['flex-row my-sm grow-0', 'before:border-t-sm', 'after:border-t-sm', '*:px-lg']),
    },
    {
      isEmpty: false,
      orientation: 'vertical',
      writingMode: 'horizontal-tb',
      class: tw(['flex-col mx-sm', 'before:border-l-sm', 'after:border-l-sm', '*:py-lg']),
    },
    {
      isEmpty: false,
      orientation: 'vertical',
      writingMode: 'vertical-lr',
      class: tw(['flex-col mx-sm', 'before:border-l-sm', 'after:border-l-sm', '*:px-lg']),
    },
    {
      isEmpty: false,
      orientation: 'horizontal',
      alignment: 'end',
      class: tw(['after:w-sz-40 before:grow after:grow-0']),
    },
    {
      isEmpty: false,
      orientation: 'horizontal',
      alignment: 'start',
      class: tw(['before:w-sz-40 before:grow-0 after:grow']),
    },
    {
      isEmpty: false,
      orientation: 'horizontal',
      alignment: 'center',
      class: tw(['justify-center before:grow after:grow']),
    },
    {
      isEmpty: false,
      orientation: 'vertical',
      alignment: 'end',
      class: tw(['after:h-sz-40 before:grow after:grow-0 before:min-h-sz-40']),
    },
    {
      isEmpty: false,
      orientation: 'vertical',
      alignment: 'start',
      class: tw(['before:h-sz-40 before:grow-0 after:grow after:min-h-sz-40']),
    },
    {
      isEmpty: false,
      orientation: 'vertical',
      alignment: 'center',
      class: tw(['justify-center before:grow after:grow before:min-h-sz-40 after:min-h-sz-40']),
    },
    ...intentVariants,
  ],
})

export type DividerStylesProps = VariantProps<typeof dividerStyles>
