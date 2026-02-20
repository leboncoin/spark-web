import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { Label as RadixLabel } from 'radix-ui'
import { Ref } from 'react'

export type LabelProps = Omit<RadixLabel.LabelProps, 'asChild' | 'children'> &
  useRender.ComponentProps<'label'> & {
    ref?: Ref<HTMLLabelElement>
  }

export const Label = ({ className, render, children, ref, ...others }: LabelProps) => {
  const defaultProps = {
    'data-spark-component': 'label',
    className: cx('text-body-1', className),
    ...others,
    children,
  }

  const element = useRender({
    defaultTagName: 'label',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'label'>(defaultProps, {}),
  })

  if (render) {
    return (
      <RadixLabel.Label asChild ref={ref}>
        {element}
      </RadixLabel.Label>
    )
  }

  return (
    <RadixLabel.Label
      ref={ref}
      data-spark-component="label"
      className={cx('text-body-1', className)}
      asChild={false}
      {...others}
    >
      {children}
    </RadixLabel.Label>
  )
}

Label.displayName = 'Label'
