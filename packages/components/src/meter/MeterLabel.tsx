import { Meter as BaseMeter } from '@base-ui/react/meter'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { ComponentProps, useCallback, useId } from 'react'

import { ID_PREFIX, useMeter } from './MeterContext'

export type MeterLabelProps = Omit<ComponentProps<typeof BaseMeter.Label>, 'render'>

export const MeterLabel = ({
  id: idProp,
  children,
  ref: forwardedRef,
  ...others
}: MeterLabelProps) => {
  const internalID = `${ID_PREFIX}-label-${useId()}`
  const id = idProp || internalID

  const { onLabelId } = useMeter()
  const rootRef = useCallback(
    (el: HTMLSpanElement) => {
      onLabelId(el ? id : undefined)
    },
    [id, onLabelId]
  )
  const ref = useMergeRefs(forwardedRef, rootRef)

  return (
    <BaseMeter.Label
      data-spark-component="meter-label"
      id={id}
      className="default:text-body-1 text-on-surface default:font-bold"
      ref={ref}
      {...others}
    >
      {children}
    </BaseMeter.Label>
  )
}

MeterLabel.displayName = 'Meter.Label'
