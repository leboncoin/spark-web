import { tw } from '@spark-ui/internal-utils'

export const intentVariants = [
  // current
  {
    intent: 'current',
    isEmpty: true,
    class: tw(['border-current']),
  },
  {
    intent: 'current',
    isEmpty: false,
    class: tw(['before:border-current after:border-current']),
  },
  // outline
  {
    intent: 'outline',
    isEmpty: true,
    class: tw(['border-outline']),
  },
  {
    intent: 'outline',
    isEmpty: false,
    class: tw(['before:border-outline after:border-outline']),
  },
] as const
