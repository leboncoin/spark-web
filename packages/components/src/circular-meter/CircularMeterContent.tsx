import { cx } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren } from 'react'

import { useCircularMeter } from './CircularMeterContext'

export type CircularMeterContentProps = ComponentProps<'div'> & PropsWithChildren

export const CircularMeterContent = ({
  className,
  children,
  ...others
}: CircularMeterContentProps) => {
  const { orientation } = useCircularMeter()

  return (
    <div
      data-spark-component="circular-meter-content"
      className={cx(
        'gap-xs flex default:flex-col',
        orientation === 'vertical' && 'default:text-center',
        className
      )}
      {...others}
    >
      {children}
    </div>
  )
}

CircularMeterContent.displayName = 'CircularMeter.Content'
