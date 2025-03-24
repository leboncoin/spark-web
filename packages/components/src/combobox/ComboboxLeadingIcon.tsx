import { ReactElement } from 'react'

import { Icon } from '../icon'

export const LeadingIcon = ({ children }: { children: ReactElement }) => {
  return (
    <Icon size={'sm'} className="h-sz-44 shrink-0">
      {children}
    </Icon>
  )
}

LeadingIcon.displayName = 'Combobox.LeadingIcon'
