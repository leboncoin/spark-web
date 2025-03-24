import { Label } from 'radix-ui'
import type { HTMLAttributes, PropsWithChildren } from 'react'

import { radioLabelStyles, RadioLabelStylesProps } from './RadioLabel.styles'

export interface RadioLabelProps
  extends RadioLabelStylesProps,
    PropsWithChildren<HTMLAttributes<HTMLLabelElement>> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  /**
   * The id of the element the label is associated with.
   */
  htmlFor?: string
  /**
   * When true, prevents the user from interacting with the radio item.
   */
  disabled?: boolean
}

export const RadioLabel = ({ disabled, ...others }: RadioLabelProps) => {
  return <Label.Root className={radioLabelStyles({ disabled })} {...others} />
}

RadioLabel.displayName = 'RadioGroup.RadioLabel'
