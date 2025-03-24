import { createContext, type Dispatch, type SetStateAction, useContext } from 'react'

import type { ProgressTrackerProps } from './ProgressTracker'

// Interfaces
export type ProgressTrackerContextInterface = Required<
  Pick<ProgressTrackerProps, 'stepIndex' | 'size' | 'intent' | 'design' | 'readOnly'>
> &
  Pick<ProgressTrackerProps, 'onStepClick'> & {
    steps: Map<string, string[]>
    setSteps: Dispatch<SetStateAction<Map<string, string[]>>>
  }

export interface ProgressTrackerStepContextInterface {
  index: number
  state: 'active' | 'complete' | 'incomplete'
}

// Contexts
export const ProgressTrackerContext = createContext<ProgressTrackerContextInterface>(
  {} as ProgressTrackerContextInterface
)

export const ProgressTrackerStepContext = createContext<ProgressTrackerStepContextInterface>(
  {} as ProgressTrackerStepContextInterface
)

// Hooks
export const useProgressTrackerContext = () => useContext(ProgressTrackerContext)

export const useProgressTrackerStepContext = () => useContext(ProgressTrackerStepContext)

export const ID_PREFIX = ':progress-tracker'
