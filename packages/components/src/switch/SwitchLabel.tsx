import { Label, LabelProps } from '../label'
import { labelStyles, LabelStylesProps } from './SwitchLabel.styles'

export interface SwitchLabelProps extends LabelStylesProps, LabelProps {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
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
  <Label className={labelStyles({ disabled, className })} {...others} />
)
