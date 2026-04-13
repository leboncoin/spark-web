import { useEffect } from 'react'

import { useSelectGroupContext } from './SelectItemsGroupContext'

interface LabelProps {
  children: string
}

/**
 * A label for a group of select items. Renders a <div> element.
 */

export const Label = ({ children }: LabelProps) => {
  const { setGroupLabel } = useSelectGroupContext()

  useEffect(() => {
    setGroupLabel(children)
  }, [children])

  return null
}

Label.displayName = 'Select.Label'
