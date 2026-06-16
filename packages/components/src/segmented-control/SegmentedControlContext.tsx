import { createContext, RefObject, useContext } from 'react'

export interface SegmentedControlContextInterface {
  checkedValue: string | null
  containerRef: RefObject<HTMLDivElement | null>
  onValueChange: (value: string) => void
  name?: string
  rowLength?: number
  itemValues: string[]
}

export const SegmentedControlContext = createContext<SegmentedControlContextInterface>(
  {} as SegmentedControlContextInterface
)

export const useSegmentedControlContext = () => {
  const context = useContext(SegmentedControlContext)

  if (!context) {
    throw Error('useSegmentedControlContext must be used within a SegmentedControlContext Provider')
  }

  return context
}
