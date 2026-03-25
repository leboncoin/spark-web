import { Radio } from '@base-ui/react/radio'
import { Ref } from 'react'

import { radioIndicatorStyles, RadioIndicatorStylesProps } from './RadioIndicator.styles'

export interface RadioIndicatorProps extends RadioIndicatorStylesProps {
  className?: string
  /**
   * Whether to keep the indicator mounted in the DOM when the radio is unchecked.
   * Useful when controlling animation with React animation libraries.
   */
  keepMounted?: boolean
  ref?: Ref<HTMLSpanElement>
}

export const RadioIndicator = ({
  intent,
  className,
  keepMounted,
  ref,
  ...others
}: RadioIndicatorProps) => {
  return (
    <Radio.Indicator
      ref={ref}
      keepMounted={keepMounted}
      className={radioIndicatorStyles({ intent, className })}
      {...others}
    />
  )
}

RadioIndicator.displayName = 'RadioGroup.RadioIndicator'
