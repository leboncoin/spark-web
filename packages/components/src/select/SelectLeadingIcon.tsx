import { ReactElement } from 'react'

import { Icon } from '../icon'

/**
 * An icon displayed at the start of the select trigger. Renders a <span> element.
 */

export const LeadingIcon = ({ children }: { children: ReactElement }) => {
  return (
    <Icon size={'sm'} className="shrink-0">
      {children}
    </Icon>
  )
}

LeadingIcon.displayName = 'Select.LeadingIcon'
