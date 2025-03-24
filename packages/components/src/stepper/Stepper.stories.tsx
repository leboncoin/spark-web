import { StoryLabel } from '@docs/helpers/StoryLabel'
import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { ArrowHorizontalUp } from '@spark-ui/icons/ArrowHorizontalUp'
import { Meta, StoryFn } from '@storybook/react'
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
    <Stepper aria-label="Default stepper">
      <Stepper.DecrementButton aria-label="Decrement" />
      <Stepper.Input />
      <Stepper.IncrementButton aria-label="Increment" />
    </Stepper>
  )
}

export const Uncontrolled: StoryFn = () => {
  return (
    <Stepper defaultValue={0} onValueChange={console.log} aria-label="Default stepper">
      <Stepper.DecrementButton aria-label="Decrement" />
      <Stepper.Input />
      <Stepper.IncrementButton aria-label="Increment" />
    </Stepper>
  )
}

export const Controlled: StoryFn = () => {
  const [count, setCount] = useState(0)

  return (
    <Stepper value={count} onValueChange={setCount} aria-label="Default stepper">
      <Stepper.DecrementButton aria-label="Decrement" />
      <Stepper.Input />
      <Stepper.IncrementButton aria-label="Increment" />
    </Stepper>
  )
}

export const Disabled: StoryFn = _args => (
  <Stepper aria-label="Disabled stepper" disabled onValueChange={() => console.log('disabled')}>
    <Stepper.DecrementButton aria-label="Decrement" />
    <Stepper.Input />
    <Stepper.IncrementButton aria-label="Increment" />
  </Stepper>
)

export const ReadOnly: StoryFn = _args => (
  <Stepper aria-label="Readonly stepper" readOnly defaultValue={10}>
    <Stepper.DecrementButton aria-label="Decrement" />
    <Stepper.Input />
    <Stepper.IncrementButton aria-label="Increment" />
  </Stepper>
)

export const Custom: StoryFn = _args => (
  <Stepper aria-label="Composed stepper">
    <Stepper.DecrementButton aria-label="Decrement" design="filled" intent="basic" asChild>
      <Icon>
        <ArrowHorizontalDown />
      </Icon>
    </Stepper.DecrementButton>
    <Stepper.Input />
    <Stepper.IncrementButton aria-label="Increment" design="filled" intent="basic" asChild>
      <Icon>
        <ArrowHorizontalUp />
      </Icon>
    </Stepper.IncrementButton>
  </Stepper>
)

export const State: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-2 md:grid-cols-3">
    {states.map(state => (
      <div key={state}>
        <StoryLabel>{state}</StoryLabel>
        <Stepper aria-label={`Stepper ${state}`} state={state}>
          <Stepper.DecrementButton aria-label="Decrement" />
          <Stepper.Input />
          <Stepper.IncrementButton aria-label="Increment" />
        </Stepper>
      </div>
    ))}
  </div>
)

export const Step: StoryFn = _args => (
  <Stepper aria-label="Stepper with custom step" step={3}>
    <Stepper.DecrementButton aria-label="Decrement" />
    <Stepper.Input />
    <Stepper.IncrementButton aria-label="Increment" />
  </Stepper>
)

export const MinMaxValues: StoryFn = _args => (
  <Stepper aria-label="Stepper with min/max values" minValue={0} maxValue={100} defaultValue={0}>
    <Stepper.DecrementButton aria-label="Decrement" />
    <Stepper.Input />
    <Stepper.IncrementButton aria-label="Increment" />
  </Stepper>
)

export const FormatOptions: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-2 md:grid-cols-3">
    <div>
      <StoryLabel>Percentages</StoryLabel>
      <Stepper
        aria-label="Stepper with percentages"
        minValue={0}
        defaultValue={0.01}
        formatOptions={{ style: 'percent' }}
      >
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    </div>

    <div>
      <StoryLabel>Currency values</StoryLabel>
      <Stepper
        aria-label="Stepper with currency value"
        defaultValue={1}
        step={5}
        formatOptions={{ style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' }}
      >
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    </div>

    <div>
      <StoryLabel>Units</StoryLabel>
      <Stepper
        aria-label="Stepper with units"
        defaultValue={20}
        formatOptions={{ style: 'unit', unit: 'celsius' }}
      >
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    </div>
  </div>
)

export const WithFormField: StoryFn = _args => (
  <FormField name="title" isRequired state="error">
    <FormField.Label>Title</FormField.Label>
    <Stepper aria-label="Stepper with min/max values" minValue={0} maxValue={100} defaultValue={0}>
      <Stepper.DecrementButton aria-label="Decrement" />
      <Stepper.Input />
      <Stepper.IncrementButton aria-label="Increment" />
    </Stepper>
    <FormField.ErrorMessage>oops</FormField.ErrorMessage>
    <FormField.HelperMessage>This is a helper message</FormField.HelperMessage>
  </FormField>
)
