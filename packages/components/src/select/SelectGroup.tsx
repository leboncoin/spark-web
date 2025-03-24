import { cx } from 'class-variance-authority'
import { ReactNode, type Ref } from 'react'

import { SelectGroupProvider, useSelectGroupContext } from './SelectItemsGroupContext'

interface GroupProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLOptGroupElement>
}

export const Group = ({ children, ref: forwardedRef, ...props }: GroupProps) => {
  return (
    <SelectGroupProvider>
      <GroupContent ref={forwardedRef} {...props}>
        {children}
      </GroupContent>
    </SelectGroupProvider>
  )
}

const GroupContent = ({ children, className, ref: forwardedRef }: GroupProps) => {
  const { groupLabel } = useSelectGroupContext()

  return (
    <optgroup
      data-spark-component="select-group"
      ref={forwardedRef}
      className={cx(className)}
      label={groupLabel}
    >
      {children}
    </optgroup>
  )
}

Group.displayName = 'Select.Group'
