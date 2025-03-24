import { StoryLabel } from '@docs/helpers/StoryLabel'
import { StarFill } from '@spark-ui/icons/StarFill'
import { StarOutline } from '@spark-ui/icons/StarOutline'
import type { Meta, StoryFn } from '@storybook/react'
import { type ComponentProps, useState } from 'react'

import { FormField } from '../form-field'
import { Switch } from '.'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=55014-22749&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => <Switch>Agreed</Switch>

export const Uncontrolled: StoryFn = _args => <Switch defaultChecked>Agreed</Switch>

export const Controlled: StoryFn = () => {
  const [checked, setChecked] = useState(true)

  return (
    <Switch checked={checked} onCheckedChange={setChecked}>
      Agreed
    </Switch>
  )
}

export const Reverse: StoryFn = _args => <Switch reverse>Agreed</Switch>

export const Icons: StoryFn = _args => (
  <Switch checkedIcon={<StarFill />} uncheckedIcon={<StarOutline />}>
    Mode
  </Switch>
)

export const Disabled: StoryFn = _args => (
  <div className="gap-lg flex">
    <Switch disabled>Agreed</Switch>

    <Switch defaultChecked disabled>
      Agreed
    </Switch>
  </div>
)

const sizes: ComponentProps<typeof Switch>['size'][] = ['sm', 'md']

export const Sizes: StoryFn = _args => (
  <div className="gap-lg flex">
    {sizes.map(size => (
      <div key={size}>
        <StoryLabel>{size}</StoryLabel>
        <Switch name="small" size={size}>
          Agreed
        </Switch>
      </div>
    ))}
  </div>
)

const intents: ComponentProps<typeof Switch>['intent'][] = [
  'main',
  'support',
  'accent',
  'basic',
  'success',
  'alert',
  'error',
  'info',
  'neutral',
]

export const Intent: StoryFn = _args => (
  <div className="gap-lg flex">
    {intents.map(intent => (
      <div key={intent}>
        <StoryLabel>{intent}</StoryLabel>
        <Switch intent={intent} defaultChecked aria-label={`My ${intent} switch`} />
      </div>
    ))}
  </div>
)

export const FieldHelperMessage: StoryFn = _args => (
  <FormField name="agreement">
    <Switch>Gifts only</Switch>

    <FormField.HelperMessage>Display free items only</FormField.HelperMessage>
  </FormField>
)

export const FieldInvalid: StoryFn = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <FormField name="agreement" state={!isChecked ? 'error' : undefined}>
      <Switch checked={isChecked} onCheckedChange={setIsChecked}>
        Third-party recommendations
      </Switch>

      <FormField.ErrorMessage>
        You must agree with third-party recommendations
      </FormField.ErrorMessage>
    </FormField>
  )
}
