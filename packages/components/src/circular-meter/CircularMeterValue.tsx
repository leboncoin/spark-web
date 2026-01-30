import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cva } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren } from 'react'

import { useCircularMeter } from './CircularMeterContext'
import { useCircularMeterTrack } from './CircularMeterTrack'

export type CircularMeterValueProps = Omit<ComponentProps<typeof BaseMeter.Value>, 'render'>

const valueStyles = cva(['default:text-on-surface default:font-bold'], {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    inside: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    // Inside the track
    { size: 'sm', inside: true, class: 'default:text-body-2 default:font-bold' },
    { size: 'md', inside: true, class: 'default:text-body-2 default:font-bold' },
    { size: 'lg', inside: true, class: 'default:text-body-1 default:font-bold' },
    { size: 'xl', inside: true, class: 'default:text-display-3' },
    // Outside the track
    { size: 'sm', inside: false, class: 'default:text-body-1 default:font-bold' },
    { size: 'md', inside: false, class: 'default:text-headline-2' },
    { size: 'lg', inside: false, class: 'default:text-headline-2' },
    { size: 'xl', inside: false, class: 'default:text-display-3' },
  ],
  defaultVariants: {
    size: 'lg',
    inside: true,
  },
})

export const CircularMeterValue = ({
  className,
  children,
  ...others
}: PropsWithChildren<CircularMeterValueProps>) => {
  const { sizeProp } = useCircularMeter()
  const isInside = useCircularMeterTrack()

  return (
    <BaseMeter.Value
      data-spark-component="circular-meter-value"
      className={valueStyles({ size: sizeProp, inside: isInside, className })}
      {...others}
    >
      {children}
    </BaseMeter.Value>
  )
}

CircularMeterValue.displayName = 'CircularMeter.Value'
