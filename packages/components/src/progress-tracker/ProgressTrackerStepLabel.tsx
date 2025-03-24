import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { stepLabel } from './ProgressTrackerStepLabel.styles'

type ProgressTrackerStepLabelProps = ComponentPropsWithoutRef<'span'> & {
  children: ReactNode
}

export const ProgressTrackerStepLabel = ({
  className,
  children,
}: ProgressTrackerStepLabelProps) => <span className={stepLabel({ className })}>{children}</span>

ProgressTrackerStepLabel.displayName = 'ProgressTracker.StepLabel'
