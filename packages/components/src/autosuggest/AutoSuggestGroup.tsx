import { cx } from 'class-variance-authority'
import { Children, isValidElement, ReactNode, Ref } from 'react'
import { useSnapshot } from 'valtio'
import { useAutoSuggest } from './AutoSuggest'

import {
  AutoSuggestGroupProvider,
  useAutoSuggestGroupContext,
} from './AutoSuggestItemsGroupContext'

interface GroupProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const Group = ({ children, ref: forwardedRef, ...props }: GroupProps) => {
  const { state } = useAutoSuggest()
  const snap = useSnapshot(state)

  return (
    <AutoSuggestGroupProvider>
      <GroupContent ref={forwardedRef} {...props}>
        {children}
      </GroupContent>
    </AutoSuggestGroupProvider>
  )
}

const GroupContent = ({ children, className, ref: forwardedRef }: GroupProps) => {
  const { state } = useAutoSuggest()
  const snap = useSnapshot(state)
  const groupCtx = useAutoSuggestGroupContext()

  const hasVisibleOptions = Children.toArray(children).some(child => {
    return (
      isValidElement(child) &&
      snap.options.find(option => option.value === (child.props as { value: string }).value)
    )
  })

  return hasVisibleOptions ? (
    <div
      ref={forwardedRef}
      role="group"
      aria-labelledby={groupCtx.groupLabelId}
      className={cx(className)}
    >
      {children}
    </div>
  ) : null
}

Group.displayName = 'AutoSuggest.Group'
