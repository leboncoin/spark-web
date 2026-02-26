import { Slider as BaseSlider } from '@base-ui/react/slider'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { ComponentProps, type PropsWithChildren, useRef } from 'react'

import { useSliderContext } from './SliderContext'
import { thumbVariants } from './SliderThumb.styles'
import { SliderThumbContext } from './SliderThumbContext'

export type SliderThumbProps = Omit<ComponentProps<typeof BaseSlider.Thumb>, 'render' | 'index'> &
  PropsWithChildren

export const SliderThumb = ({
  className,
  ref: forwardedRef,
  children,
  ...rest
}: SliderThumbProps) => {
  const { intent, fieldLabelId, fieldId, thumbRef: contextThumbRef } = useSliderContext()

  const innerRef = useRef<HTMLDivElement>(null)
  const ref = useMergeRefs(contextThumbRef, forwardedRef ?? innerRef)

  return (
    <SliderThumbContext.Provider value={{ isInsideThumb: true }}>
      <BaseSlider.Thumb
        data-spark-component="slider-thumb"
        ref={ref}
        id={fieldId}
        className={thumbVariants({ intent, className })}
        aria-labelledby={fieldLabelId}
        {...rest}
      >
        {children}
      </BaseSlider.Thumb>
    </SliderThumbContext.Provider>
  )
}

SliderThumb.displayName = 'Slider.Thumb'
