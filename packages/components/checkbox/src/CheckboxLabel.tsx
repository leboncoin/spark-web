import { Label, LabelProps } from '@spark-ui/label'

import { labelStyles, type LabelStylesProps } from './CheckboxLabel.styles'

export interface CheckboxLabelProps extends LabelProps, LabelStylesProps {
  /**
   * When true, prevents the user from interacting with the checkbox item.
   */
  disabled?: boolean
}

export const CheckboxLabel = ({ disabled, ...rest }: CheckboxLabelProps) => (
  <Label className={labelStyles({ disabled })} {...rest} />
)

CheckboxLabel.displayName = 'CheckboxLabel'
