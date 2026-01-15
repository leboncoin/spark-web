import { FormField } from '@spark-ui/components/form-field'
import { Tag } from '@spark-ui/components/tag'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { Slider, type SliderProps } from '.'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=3409-22562&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <form>
    <Slider defaultValue={[50]} name="default-slider">
      <Slider.Track />
      <Slider.Thumb aria-label="Power" />
    </Slider>
  </form>
)

export const Controlled: StoryFn = _args => {
  const [value, setValue] = useState([0, 100])

  return (
    <form>
      <label htmlFor="controlled-slider">
        Volume between {value[0]} and {value[1]}
      </label>

      <Slider
        min={0}
        max={100}
        value={value}
        onValueChange={setValue}
        onValueCommit={() => {
          console.log(value)
        }}
        id="controlled-slider"
        name="controlled-slider"
      >
        <Slider.Track />
        <Slider.Thumb aria-label="Power" />
        <Slider.Thumb aria-label="Power" />
      </Slider>
    </form>
  )
}

export const Range: StoryFn = _args => (
  <div>
    <Slider defaultValue={[25, 75]}>
      <Slider.Track />

      <Slider.Thumb aria-label="Power min" />
      <Slider.Thumb aria-label="Power max" />
    </Slider>
  </div>
)

const intents: SliderProps['intent'][] = [
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

const shapes: SliderProps['shape'][] = ['square', 'rounded']

export const Intent: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-2 sm:grid-cols-5">
    {intents.map(intent => (
      <div key={intent} className="grow">
        <Tag className="mb-md flex">{`${intent}${intent === 'basic' ? ' (default)' : ''}`}</Tag>

        <Slider defaultValue={[75]} intent={intent}>
          <Slider.Track />
          <Slider.Thumb aria-label={`Power ${intent}`} />
        </Slider>
      </div>
    ))}
  </div>
)

export const Shape: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-2">
    {shapes.map(shape => (
      <div key={shape} className="grow">
        <Tag className="mb-md flex">{`${shape}${shape === 'square' ? ' (default)' : ''}`}</Tag>

        <Slider defaultValue={[75]} shape={shape}>
          <Slider.Track />
          <Slider.Thumb aria-label={`Power ${shape}`} />
        </Slider>
      </div>
    ))}
  </div>
)

export const Disabled: StoryFn = _args => (
  <div>
    <Slider defaultValue={[50]} disabled>
      <Slider.Track />
      <Slider.Thumb aria-label="Power" />
    </Slider>
  </div>
)

export const RestrictedValues: StoryFn = () => {
  const values = [10, 25, 50, 100]

  const [value, setValue] = useState([0])
  const remappedValue = values[value.at(0) ?? 0]

  return (
    <div>
      <Slider onValueChange={setValue} value={value} max={values.length - 1}>
        <Slider.Track />
        <Slider.Thumb aria-valuetext={String(remappedValue)} aria-label="Power" />
      </Slider>
      <div className="mt-md gap-y-md flex flex-col">
        <p className="font-semi-bold">
          slider value: <span className="font-regular">{value}</span>
        </p>

        <p className="font-semi-bold">
          remapped value: <span className="font-regular">{remappedValue}</span>
        </p>
      </div>
    </div>
  )
}

const states: SliderProps['state'][] = ['error', 'alert', 'success']

export const Statuses: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-3">
    {states.map(state => (
      <div key={state} className="grow">
        <Tag className="mb-md flex">{state}</Tag>

        <Slider defaultValue={[75]} state={state}>
          <Slider.Track />
          <Slider.Thumb aria-label={`Power ${state}`} />
        </Slider>
      </div>
    ))}
  </div>
)

export const ThumbWithValue: StoryFn = _args => {
  const [value, setValue] = useState([50])

  return (
    <Slider className="mt-md" onValueChange={setValue} value={value} name="default-slider">
      <Slider.Track />
      <Slider.Thumb className="relative" aria-label="Power">
        <span className="absolute -top-full left-1/2 -translate-x-1/2">{value}</span>
      </Slider.Thumb>
    </Slider>
  )
}

export const FormFieldLabel: StoryFn = _args => (
  <form action="">
    <FormField name="volume">
      <FormField.Label>Volume</FormField.Label>
      <Slider defaultValue={[50]}>
        <Slider.Track />
        <Slider.Thumb />
      </Slider>
    </FormField>
  </form>
)

export const FormFieldHelperMessage: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-3">
    {states.map(state => (
      <FormField key={state} name={`volume-${state}`} state={state}>
        <FormField.Label>Volume</FormField.Label>
        <Slider defaultValue={[50]}>
          <Slider.Track />
          <Slider.Thumb />
        </Slider>
        <FormField.HelperMessage>
          {state === 'error' && 'Volume must be between 30 and 70'}
          {state === 'alert' && 'Volume is getting high'}
          {state === 'success' && 'Volume is optimal'}
        </FormField.HelperMessage>
      </FormField>
    ))}
  </div>
)
