import { InputOTP as Root } from './InputOTP'
import { InputOTPGroup } from './InputOTPGroup'
import { InputOTPSeparator } from './InputOTPSeparator'
import { InputOTPSlot } from './InputOTPSlot'

export const InputOTP: typeof Root & {
  Group: typeof InputOTPGroup
  Slot: typeof InputOTPSlot
  Separator: typeof InputOTPSeparator
} = Object.assign(Root, {
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
})

InputOTP.displayName = 'InputOTP'
InputOTPGroup.displayName = 'InputOTP.Group'
InputOTPSlot.displayName = 'InputOTP.Slot'
InputOTPSeparator.displayName = 'InputOTP.Separator'

export { type InputOTPProps } from './InputOTP'
export { type InputOTPGroupProps } from './InputOTPGroup'
export { type InputOTPSlotProps } from './InputOTPSlot'
export { type InputOTPSeparatorProps } from './InputOTPSeparator'
export {
  inputOTPSlotStyles,
  inputOTPStyles,
  type InputOTPSlotStylesProps,
  type InputOTPStylesProps,
} from './InputOTP.styles'
