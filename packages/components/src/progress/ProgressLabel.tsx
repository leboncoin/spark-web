import { useMergeRefs } from '@spark-ui/use-merge-refs'
import { ComponentPropsWithRef, useCallback, useId } from 'react'

import { ID_PREFIX, useProgress } from './ProgressContext'

export type ProgressLabelProps = ComponentPropsWithRef<'span'>

export const ProgressLabel = ({
  id: idProp,
  children,
  ref: forwardedRef,
  ...others
}: ProgressLabelProps) => {
  const internalID = `${ID_PREFIX}-label-${useId()}`
  const id = idProp || internalID

  const { onLabelId } = useProgress()
  const rootRef = useCallback(
    (el: HTMLSpanElement) => {
      onLabelId(el ? id : undefined)
    },
    [id, onLabelId]
  )
  const ref = useMergeRefs(forwardedRef, rootRef)

  return (
    <span id={id} className="text-body-2 text-on-surface" ref={ref} {...others}>
      {children}
    </span>
  )
}

ProgressLabel.displayName = 'Progress.Label'
