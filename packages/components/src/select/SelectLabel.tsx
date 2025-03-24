import { useEffect } from 'react'

import { useSelectGroupContext } from './SelectItemsGroupContext'

interface LabelProps {
  children: string
}

export const Label = ({ children }: LabelProps) => {
  const { setGroupLabel } = useSelectGroupContext()

  useEffect(() => {
    setGroupLabel(children)
  }, [children])

  return null
}

Label.displayName = 'Select.Label'
