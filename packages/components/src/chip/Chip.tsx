import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import React, { ComponentPropsWithoutRef, isValidElement, MouseEvent, Ref } from 'react'

import { chipStyles, type ChipStylesProps } from './Chip.styles'
import { ChipContext } from './useChipContext'
import { useChipElement } from './useChipElement'

type ChipPrimitiveProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'disabled' | 'type'>

export interface ChipProps
  extends Omit<useRender.ComponentProps<'button'>, 'ref' | 'onClick'>,
    ChipPrimitiveProps,
    Omit<ChipStylesProps, 'hasClearButton' | 'disabled'> {
  /**
   * Configures a toggleButton aria-pressed initial value
   */
  defaultPressed?: boolean
  /**
   * Configures a toggleButton aria-pressed value
   */
  pressed?: boolean
  /**
   * Event handler fired each clicking event
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    args: { pressed: boolean; value?: number | string | readonly string[] }
  ) => void
  /**
   * Clear chip handler
   */
  onClear?: (event?: MouseEvent<HTMLButtonElement>) => void
  ref?: Ref<HTMLButtonElement | HTMLDivElement>
}

export const Chip = ({
  design = 'outlined',
  disabled,
  children,
  intent = 'basic',
  defaultPressed,
  pressed,
  render,
  className,
  onClick,
  onClear,
  ref: forwardedRef,
  ...otherProps
}: ChipProps) => {
  const {
    defaultTagName,
    chipProps: { children: formattedChildren, ...chipProps },
    compoundElements,
  } = useChipElement({
    render:
      typeof render === 'object' && render !== null && isValidElement(render) ? render : undefined,
    pressed,
    defaultPressed,
    onClick,
    disabled: !!disabled,
    value: otherProps.value,
    defaultValue: otherProps.defaultValue,
    children,
    onClear,
  })

  const { clearButton } = compoundElements

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'chip',
    className: chipStyles({
      className,
      design,
      disabled,
      intent,
      hasClearButton: !!clearButton,
    }),
    ...chipProps,
    children: formattedChildren,
  }

  const element = useRender({
    defaultTagName: defaultTagName === 'button' ? 'button' : 'div',
    render,
    ref: forwardedRef,
    props:
      defaultTagName === 'button'
        ? mergeProps<'button'>(defaultProps, otherProps)
        : mergeProps<'div'>(defaultProps, otherProps as React.ComponentProps<'div'>),
  })

  return (
    <ChipContext.Provider value={{ disabled, design, intent, onClear }}>
      {element as unknown as React.ReactElement}
    </ChipContext.Provider>
  )
}

Chip.displayName = 'Chip'
