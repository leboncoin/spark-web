import { StoryLabel } from '@docs/helpers/StoryLabel'
import { Meta, StoryFn } from '@storybook/react'
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
        <StoryLabel>{`${intent}${intent === 'basic' ? ' (default)' : ''}`}</StoryLabel>

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
        <StoryLabel>{`${shape}${shape === 'square' ? ' (default)' : ''}`}</StoryLabel>

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
