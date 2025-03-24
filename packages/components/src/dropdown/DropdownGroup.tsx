import { cx } from 'class-variance-authority'
import { ReactNode, Ref } from 'react'

import { DropdownGroupProvider, useDropdownGroupContext } from './DropdownItemsGroupContext'

interface GroupProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const Group = ({ children, ref: forwardedRef, ...props }: GroupProps) => {
  return (
    <DropdownGroupProvider>
      <GroupContent ref={forwardedRef} {...props}>
        {children}
      </GroupContent>
    </DropdownGroupProvider>
  )
}

const GroupContent = ({ children, className, ref: forwardedRef }: GroupProps) => {
  const { labelId } = useDropdownGroupContext()

  return (
    <div ref={forwardedRef} role="group" aria-labelledby={labelId} className={cx(className)}>
      {children}
    </div>
  )
}

Group.displayName = 'Dropdown.Group'
