import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { Label } from 'radix-ui'
import type { HTMLAttributes, PropsWithChildren, Ref } from 'react'

import { radioLabelStyles, RadioLabelStylesProps } from './RadioLabel.styles'

export interface RadioLabelProps
  extends RadioLabelStylesProps,
    PropsWithChildren<Omit<HTMLAttributes<HTMLLabelElement>, 'children'>>,
    useRender.ComponentProps<'label'> {
  /**
   * The id of the element the label is associated with.
   */
  htmlFor?: string
  /**
   * When true, prevents the user from interacting with the radio item.
   */
  disabled?: boolean
  ref?: Ref<HTMLLabelElement>
}

export const RadioLabel = ({ disabled, render, children, ref, ...others }: RadioLabelProps) => {
  const defaultProps = {
    'data-spark-component': 'radio-label',
    className: radioLabelStyles({ disabled }),
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
      <Label.Root asChild ref={ref}>
        {element}
      </Label.Root>
    )
  }

  return (
    <Label.Root
      data-spark-component="radio-label"
      className={radioLabelStyles({ disabled })}
      asChild={false}
      ref={ref}
      {...others}
    >
      {children}
    </Label.Root>
  )
}

RadioLabel.displayName = 'RadioGroup.RadioLabel'
