import { ComponentPropsWithoutRef, MouseEvent, Ref } from 'react'

import { chipStyles, type ChipStylesProps } from './Chip.styles'
import { ChipContext } from './useChipContext'
import { useChipElement } from './useChipElement'

type ChipPrimitiveProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'disabled' | 'type'>

export interface ChipProps extends ChipPrimitiveProps, Omit<ChipStylesProps, 'hasClearButton'> {
  /**
   * Configures a toggleButton aria-pressed initial value
   */
  defaultPressed?: boolean
  /**
   * Configures a toggleButton aria-pressed value
   */
  pressed?: boolean
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
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
  asChild,
  className,
  onClick,
  onClear,
  ref: forwardedRef,
  ...otherProps
}: ChipProps) => {
  const {
    Element: ChipElement,
    chipProps: { children: formattedChildren, ...chipProps },
    compoundElements,
  } = useChipElement({
    asChild,
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

  return (
    <ChipContext.Provider value={{ disabled, design, intent, onClear }}>
      <ChipElement
        ref={forwardedRef}
        className={chipStyles({
          className,
          design,
          disabled,
          intent,
          hasClearButton: !!clearButton,
        })}
        {...{
          ...chipProps,
          ...otherProps,
        }}
        data-spark-component="chip"
      >
        {formattedChildren}
      </ChipElement>
    </ChipContext.Provider>
  )
}

Chip.displayName = 'Chip'
