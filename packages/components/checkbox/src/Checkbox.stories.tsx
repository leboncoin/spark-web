import { FormField } from '@spark-ui/form-field'
import { Close } from '@spark-ui/icons/dist/icons/Close'
import { Plus } from '@spark-ui/icons/dist/icons/Plus'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

const meta: Meta<typeof Checkbox> = {
  title: 'components/Checkbox',
  component: Checkbox,
}

export default meta

export const Default: StoryFn = _args => <Checkbox>Accept terms and conditions</Checkbox>

export const WithAMultilineLabel: StoryFn = _args => (
  <Checkbox>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dictum imperdiet. Vivamus
    turpis lectus, venenatis at ipsum finibus, condimentum eleifend quam. Cras pellentesque tempor
    metus, accumsan semper erat imperdiet at. Integer mattis dictum eros, a vulputate sem efficitur
    et. Aliquam dapibus non augue quis efficitur. Fusce auctor sit amet mauris sed maximus. In hac
    habitasse platea dictumst. In consectetur, elit at vestibulum condimentum, diam mauris
    vestibulum nisl, quis cursus arcu massa vitae nisl.
  </Checkbox>
)

export const Disabled: StoryFn = _args => <Checkbox disabled>Accept terms and conditions</Checkbox>

export const Uncontrolled: StoryFn = () => {
  const handleCheckedChange = (current: boolean, indeterminate?: boolean) => {
    console.log(current, indeterminate)
  }

  return (
    <div className="flex flex-col gap-lg">
      <Checkbox defaultChecked onCheckedChange={handleCheckedChange}>
        Accept terms and conditions
      </Checkbox>
    </div>
  )
}

export const Controlled: StoryFn = () => {
  const [checked, setChecked] = useState(true)

  const handleCheckedChange = (current: boolean) => {
    setChecked(current)
  }

  return (
    <div className="flex gap-lg">
      <Checkbox checked={checked} onCheckedChange={handleCheckedChange}>
        Accept terms and conditions
      </Checkbox>

      <Checkbox checked="indeterminate" onCheckedChange={handleCheckedChange}>
        Accept terms and conditions
      </Checkbox>
    </div>
  )
}

const intent = ['primary', 'success', 'alert', 'error', 'info', 'neutral'] as const

export const Intent: StoryFn = _args => (
  <div className="flex gap-lg">
    {intent.map(color => {
      return (
        <Checkbox className="capitalize" key={color} intent={color}>
          {color}
        </Checkbox>
      )
    })}
  </div>
)

export const Icon: StoryFn = _args => (
  <div className="flex flex-col gap-lg">
    <Checkbox defaultChecked icon={<Close />}>
      Accept terms and conditions
    </Checkbox>
    <Checkbox checked="indeterminate" indeterminateIcon={<Plus />}>
      Accept terms and conditions
    </Checkbox>
  </div>
)

export const Group: StoryFn = _args => {
  return (
    <CheckboxGroup name="sport">
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
    </CheckboxGroup>
  )
}

export const GroupControlled: StoryFn = () => {
  const [value, setValue] = useState<string[]>([])

  const handleCheckedChange = (current: string[]) => {
    setValue(current)
  }

  return (
    <CheckboxGroup value={value} onCheckedChange={handleCheckedChange}>
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
    </CheckboxGroup>
  )
}

export const GroupUncontrolled: StoryFn = () => {
  const handleCheckedChange = (value: string[]) => {
    console.log(value)
  }

  return (
    <CheckboxGroup defaultValue={['soccer', 'tennis']} onCheckedChange={handleCheckedChange}>
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
    </CheckboxGroup>
  )
}

export const GroupOrientation: StoryFn = _args => {
  return (
    <CheckboxGroup orientation="horizontal" intent="neutral">
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
    </CheckboxGroup>
  )
}

export const GroupIntent: StoryFn = _args => {
  return (
    <CheckboxGroup intent="neutral">
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
    </CheckboxGroup>
  )
}

export const GroupImproved: StoryFn = () => {
  const [value, setValue] = useState<string[]>([])

  const handleCheckedChange = (current: string[]) => {
    setValue(current)
  }

  return (
    <FormField name="sport" state={value.length === 0 ? 'error' : undefined} isRequired>
      <FormField.Label asChild>
        <span>Sports</span>
      </FormField.Label>

      <CheckboxGroup value={value} onCheckedChange={handleCheckedChange}>
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="tennis">Tennis</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
      </CheckboxGroup>

      <FormField.ErrorMessage>The sport field is required.</FormField.ErrorMessage>
    </FormField>
  )
}
