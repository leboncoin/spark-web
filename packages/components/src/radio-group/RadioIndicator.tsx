import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { RadioGroup as RadixRadioGroup } from 'radix-ui'
import { Ref } from 'react'

import { radioIndicatorStyles, RadioIndicatorStylesProps } from './RadioIndicator.styles'

export interface RadioIndicatorProps
  extends RadioIndicatorStylesProps,
    useRender.ComponentProps<'span'> {
  className?: string
  /**
   * Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.
   */
  forceMount?: true | undefined
  ref?: Ref<HTMLSpanElement>
}

export const RadioIndicator = ({
  intent,
  className,
  ref,
  render,
  children,
  ...others
}: RadioIndicatorProps) => {
  const defaultProps = {
    className: radioIndicatorStyles({ intent, className }),
    ...others,
    children,
  }

  const element = useRender({
    defaultTagName: 'span',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'span'>(defaultProps, {}),
  })

  if (render) {
    return (
      <RadixRadioGroup.Indicator asChild ref={ref}>
        {element}
      </RadixRadioGroup.Indicator>
    )
  }

  return (
    <RadixRadioGroup.Indicator
      ref={ref}
      className={radioIndicatorStyles({ intent, className })}
      asChild={false}
      {...others}
    >
      {children}
    </RadixRadioGroup.Indicator>
  )
}

RadioIndicator.displayName = 'RadioGroup.RadioIndicator'
