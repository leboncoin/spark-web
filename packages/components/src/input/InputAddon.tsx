import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { Children, type ComponentPropsWithoutRef, type PropsWithChildren, Ref } from 'react'

import { inputAddonStyles, type InputAddonStylesProps } from './InputAddon.styles'
import { useInputGroup } from './InputGroupContext'

export interface InputAddonProps
  extends useRender.ComponentProps<'div'>,
    ComponentPropsWithoutRef<'div'>,
    Omit<InputAddonStylesProps, 'intent' | 'disabled'> {
  ref?: Ref<HTMLDivElement>
}

export const InputAddon = ({
  render: renderProp,
  className,
  children,
  ref,
  ...others
}: PropsWithChildren<InputAddonProps>) => {
  const { state, disabled, readOnly } = useInputGroup()

  const isRawText = typeof children === 'string'
  const hasCustomRender = !isRawText && !!renderProp
  const child = isRawText ? children : Children.only(children)

  const getDesign = (): InputAddonStylesProps['design'] => {
    if (isRawText) return 'text'

    return hasCustomRender ? 'solid' : 'inline'
  }

  const design = getDesign()

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'input-addon',
    className: inputAddonStyles({
      className,
      intent: state,
      disabled,
      readOnly,
      asChild: hasCustomRender,
      design,
    }),
    ...(disabled && { tabIndex: -1 }),
    children: child,
  }

  return useRender({
    defaultTagName: 'div',
    render: renderProp,
    ref,
    props: mergeProps<'div'>(defaultProps, others),
  })
}

InputAddon.displayName = 'InputGroup.Addon'
