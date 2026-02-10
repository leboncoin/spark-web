import { Slider as BaseSlider } from '@base-ui/react/slider'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cx } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { useSliderContext } from './SliderContext'

export type SliderControlProps = Omit<ComponentProps<typeof BaseSlider.Control>, 'render'>

export const SliderControl = ({ className, ref, ...rest }: SliderControlProps) => {
  const { hasValueInThumb, controlRef } = useSliderContext()
  const mergedRef = useMergeRefs(controlRef, ref)

  return (
    <BaseSlider.Control
      data-spark-component="slider-control"
      ref={mergedRef}
      className={cx(
        'min-h-sz-24 relative col-span-2 flex w-full min-w-0 flex-1 items-center',
        hasValueInThumb && 'mt-xl',
        className
      )}
      {...rest}
    />
  )
}

SliderControl.displayName = 'Slider.Control'
