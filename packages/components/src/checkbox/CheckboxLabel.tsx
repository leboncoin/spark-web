import { Label, LabelProps } from '../label'
import { labelStyles, type LabelStylesProps } from './CheckboxLabel.styles'

export interface CheckboxLabelProps extends LabelProps, LabelStylesProps {
  /**
   * When true, prevents the user from interacting with the checkbox item.
   */
  disabled?: boolean
}

export const CheckboxLabel = ({ disabled, ...others }: CheckboxLabelProps) => (
  <Label className={labelStyles({ disabled })} {...others} />
)

CheckboxLabel.displayName = 'CheckboxLabel'
