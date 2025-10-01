import { Tag } from '@spark-ui/components/tag'
import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { ArrowHorizontalUp } from '@spark-ui/icons/ArrowHorizontalUp'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { FormField } from '../form-field'
import { Icon } from '../icon'
import { Stepper, StepperProps } from '.'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=55687-12472&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const states: StepperProps['state'][] = ['error', 'alert', 'success']

export const Default: StoryFn = _args => {
  return (
    <Stepper>
      <Stepper.DecrementButton aria-label="Decrement" />
      <Stepper.Input aria-label="Default stepper" />
      <Stepper.IncrementButton aria-label="Increment" />
    </Stepper>
  )
}

export const Uncontrolled: StoryFn = () => {
  return (
    <Stepper defaultValue={0} onValueChange={console.log}>
      <Stepper.DecrementButton aria-label="Decrement" />
      <Stepper.Input aria-label="Uncontrolled stepper" />
      <Stepper.IncrementButton aria-label="Increment" />
    </Stepper>
  )
}

export const Controlled: StoryFn = () => {
  const [count, setCount] = useState(0)

  return (
    <Stepper value={count} onValueChange={value => setCount(value ?? 0)}>
      <Stepper.DecrementButton aria-label="Decrement" />
      <Stepper.Input aria-label="Controlled stepper" />
      <Stepper.IncrementButton aria-label="Increment" />
    </Stepper>
  )
}

export const Disabled: StoryFn = _args => (
  <Stepper disabled onValueChange={() => console.log('disabled')} defaultValue={10}>
    <Stepper.DecrementButton aria-label="Decrement" />
    <Stepper.Input aria-label="Disabled stepper" />
    <Stepper.IncrementButton aria-label="Increment" />
  </Stepper>
)

export const ReadOnly: StoryFn = _args => (
  <Stepper readOnly defaultValue={10}>
    <Stepper.DecrementButton aria-label="Decrement" />
    <Stepper.Input aria-label="Readonly stepper" />
    <Stepper.IncrementButton aria-label="Increment" />
  </Stepper>
)

export const Custom: StoryFn = _args => (
  <Stepper>
    <Stepper.DecrementButton aria-label="Decrement">
      <Icon>
        <ArrowHorizontalDown />
      </Icon>
    </Stepper.DecrementButton>
    <Stepper.Input aria-label="Composed stepper" />
    <Stepper.IncrementButton aria-label="Increment">
      <Icon>
        <ArrowHorizontalUp />
      </Icon>
    </Stepper.IncrementButton>
  </Stepper>
)

export const Standalone: StoryFn = _args => (
  <div className="gap-lg flex flex-col items-start">
    <div>
      <Tag className="mb-md flex">No buttons</Tag>
      <Stepper>
        <Stepper.Input aria-label="Stepper without buttons" />
      </Stepper>
    </div>

    <div>
      <Tag className="mb-md flex">Increment button only</Tag>
      <Stepper>
        <Stepper.Input aria-label="Stepper with only increment button" />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    </div>
    <div>
      <Tag className="mb-md flex">Decrement button only</Tag>
      <Stepper>
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input aria-label="Stepper with only decrement button" />
      </Stepper>
    </div>
  </div>
)

export const State: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-2 md:grid-cols-3">
    {states.map(state => (
      <div key={state}>
        <Tag className="mb-md flex">{state}</Tag>
        <Stepper state={state}>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input aria-label="Stepper with state" />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      </div>
    ))}
  </div>
)

export const Step: StoryFn = _args => (
  <Stepper step={10}>
    <Stepper.DecrementButton aria-label="Decrement" />
    <Stepper.Input aria-label="Stepper with custom step" />
    <Stepper.IncrementButton aria-label="Increment" />
  </Stepper>
)

export const MinMaxValues: StoryFn = _args => (
  <Stepper minValue={0} maxValue={10} defaultValue={0}>
    <Stepper.DecrementButton aria-label="Decrement" />
    <Stepper.Input aria-label="Stepper with min/max values" />
    <Stepper.IncrementButton aria-label="Increment" />
  </Stepper>
)

export const FormatOptions: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-2 md:grid-cols-3">
    <div>
      <Tag className="mb-md flex">Percentages</Tag>
      <Stepper minValue={0} defaultValue={0.01} formatOptions={{ style: 'percent' }}>
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input aria-label="Stepper with percentages" />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    </div>

    <div>
      <Tag className="mb-md flex">Currency values</Tag>
      <Stepper
        defaultValue={1}
        step={5}
        formatOptions={{ style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' }}
      >
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input aria-label="Stepper with currency value" />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    </div>

    <div>
      <Tag className="mb-md flex">Units</Tag>
      <Stepper defaultValue={20} formatOptions={{ style: 'unit', unit: 'celsius' }}>
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input aria-label="Stepper with units" />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    </div>
  </div>
)

export const WithFormField: StoryFn = _args => (
  <FormField name="title" isRequired state="error">
    <FormField.Label>Title</FormField.Label>
    <Stepper minValue={0} maxValue={100} defaultValue={0}>
      <Stepper.DecrementButton aria-label="Decrement" />
      <Stepper.Input aria-label="Stepper with form field" />
      <Stepper.IncrementButton aria-label="Increment" />
    </Stepper>
    <FormField.ErrorMessage>oops</FormField.ErrorMessage>
    <FormField.HelperMessage>This is a helper message</FormField.HelperMessage>
  </FormField>
)
