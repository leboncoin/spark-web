import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva } from 'class-variance-authority'
import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

import { usePopover } from './PopoverContext'

export type ArrowProps = Omit<RadixPopover.PopoverArrowProps, 'asChild' | 'children'> &
  useRender.ComponentProps<'svg'> & {
    ref?: Ref<SVGSVGElement>
  }

export const Arrow = ({ render, width = 16, height = 8, className, ref, ...rest }: ArrowProps) => {
  const { intent } = usePopover()

  const arrowStyles = cva('visible', {
    variants: {
      intent: {
        surface: 'fill-surface',
        main: 'fill-main-container',
        support: 'fill-support-container',
        accent: 'fill-accent-container',
        basic: 'fill-basic-container',
        success: 'fill-success-container',
        alert: 'fill-alert-container',
        danger: 'fill-error-container',
        info: 'fill-info-container',
        neutral: 'fill-neutral-container',
      },
    },
    defaultVariants: {
      intent: 'surface',
    },
  })

  const defaultProps = {
    'data-spark-component': 'popover-arrow',
    className: arrowStyles({ intent, className }),
    width,
    height,
    ...rest,
  }

  const element = useRender({
    defaultTagName: 'svg',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'svg'>(defaultProps, {}),
  })

  if (render) {
    return (
      <RadixPopover.Arrow asChild width={width} height={height} {...rest}>
        {element}
      </RadixPopover.Arrow>
    )
  }

  return (
    <RadixPopover.Arrow
      data-spark-component="popover-arrow"
      ref={ref}
      className={arrowStyles({ intent, className })}
      asChild={false}
      width={width}
      height={height}
      {...rest}
    />
  )
}

Arrow.displayName = 'Popover.Arrow'
