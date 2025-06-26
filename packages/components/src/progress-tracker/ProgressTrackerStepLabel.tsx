import { cva } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { useProgressTrackerStepContext } from './ProgressTrackerContext'

type ProgressTrackerStepLabelProps = ComponentPropsWithoutRef<'span'> & {
  children: ReactNode
}

const stepLabel = cva(
  [
    'flex text-body-2 ',
    'text-on-surface group-disabled/btn:text-on-surface/dim-1',
    'group-data-[orientation=horizontal]/list:mt-md',
    'group-data-[orientation=vertical]/list:ml-md',
    'group-data-[orientation=vertical]/list:my-auto',
  ],
  {
    variants: {
      state: {
        complete: '',
        incomplete: '',
        active: 'font-bold',
      },
    },
  }
)

export const ProgressTrackerStepLabel = ({
  className,
  children,
}: ProgressTrackerStepLabelProps) => {
  const { state } = useProgressTrackerStepContext()

  return <span className={stepLabel({ state, className })}>{children}</span>
}

ProgressTrackerStepLabel.displayName = 'ProgressTracker.StepLabel'
