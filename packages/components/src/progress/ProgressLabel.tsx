import { Progress as BaseProgress } from '@base-ui/react/progress'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { ComponentProps, useCallback, useId } from 'react'

import { ID_PREFIX, useProgress } from './ProgressContext'

export type ProgressLabelProps = Omit<ComponentProps<typeof BaseProgress.Label>, 'render'>

/**
 * The label of the progress indicator. Renders a <span> element.
 */
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
    <BaseProgress.Label
      data-spark-component="progress-label"
      id={id}
      className="default:text-body-1 text-on-surface default:font-bold"
      ref={ref}
      {...others}
    >
      {children}
    </BaseProgress.Label>
  )
}

ProgressLabel.displayName = 'Progress.Label'
