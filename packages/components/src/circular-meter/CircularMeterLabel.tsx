import { Meter as BaseMeter } from '@base-ui/react/meter'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cva } from 'class-variance-authority'
import { ComponentProps, useCallback, useId } from 'react'

import { ID_PREFIX, useCircularMeter } from './CircularMeterContext'
import { useCircularMeterTrack } from './CircularMeterTrack'

export type CircularMeterLabelProps = Omit<ComponentProps<typeof BaseMeter.Label>, 'render'>

const labelStyles = cva([], {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    inside: {
      true: ['default:text-on-surface/dim-1'],
      false: ['default:text-on-surface'],
    },
  },
  compoundVariants: [
    // Inside the track
    { size: 'sm', inside: true, class: 'default:text-small' },
    { size: 'md', inside: true, class: 'default:text-small ' },
    { size: 'lg', inside: true, class: 'default:text-caption' },
    { size: 'xl', inside: true, class: 'default:text-body-2' },
    // Outside the track
    { size: 'sm', inside: false, class: 'default:text-body-1' },
    { size: 'md', inside: false, class: 'default:text-body-1' },
    { size: 'lg', inside: false, class: 'default:text-body-1' },
    { size: 'xl', inside: false, class: 'default:text-body-1' },
  ],
  defaultVariants: {
    size: 'lg',
    inside: true,
  },
})

export const CircularMeterLabel = ({
  id: idProp,
  children,
  className,
  ref: forwardedRef,
  ...others
}: CircularMeterLabelProps) => {
  const internalID = `${ID_PREFIX}-label-${useId()}`
  const id = idProp || internalID

  const { onLabelId, sizeProp } = useCircularMeter()
  const isInside = useCircularMeterTrack()
  const rootRef = useCallback(
    (el: HTMLSpanElement) => {
      onLabelId(el ? id : undefined)
    },
    [id, onLabelId]
  )
  const ref = useMergeRefs(forwardedRef, rootRef)

  return (
    <BaseMeter.Label
      data-spark-component="circular-meter-label"
      id={id}
      className={labelStyles({ size: sizeProp, inside: isInside, className })}
      ref={ref}
      {...others}
    >
      {children}
    </BaseMeter.Label>
  )
}

CircularMeterLabel.displayName = 'CircularMeter.Label'
