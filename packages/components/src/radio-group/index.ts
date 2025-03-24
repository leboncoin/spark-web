import { Radio } from './Radio'
import { RadioGroup as Root } from './RadioGroup'

export const RadioGroup: typeof Root & {
  Radio: typeof Radio
} = Object.assign(Root, {
  Radio,
})

RadioGroup.displayName = 'RadioGroup'
Radio.displayName = 'RadioGroup.Radio'

export { type RadioGroupProps } from './RadioGroup'
export { type RadioProps } from './Radio'
