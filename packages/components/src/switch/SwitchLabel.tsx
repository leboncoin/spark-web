import { Label, LabelProps } from '../label'
import { labelStyles, LabelStylesProps } from './SwitchLabel.styles'

export interface SwitchLabelProps extends LabelStylesProps, LabelProps {
  /**
   * The id of the element the label is associated with.
   */
  htmlFor?: string
  /**
   * When true, prevents the user from interacting with the switch item.
   */
  disabled?: boolean
}

export const SwitchLabel = ({ className, disabled, ...others }: SwitchLabelProps) => (
  <Label
    data-spark-component="switch-label"
    className={labelStyles({ disabled, className })}
    {...others}
  />
)
