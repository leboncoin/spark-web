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
    <Slider defaultValue={50} name="default-slider">
      <Slider.Label>Volume</Slider.Label>
      <Slider.Value>{(_, value) => `${value ?? 0}%`}</Slider.Value>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="Power" getAriaValueText={value => `${value}%`} />
        </Slider.Track>
      </Slider.Control>
      <Slider.MinValue>{value => `${value}%`}</Slider.MinValue>
      <Slider.MaxValue>{value => `${value}%`}</Slider.MaxValue>
    </Slider>
  </form>
)

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState(50)

  return (
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
      <Slider.Label>Volume</Slider.Label>
      <Slider.Value>{(_, value) => `${value}%`}</Slider.Value>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="Power" getAriaValueText={value => `${value}%`} />
        </Slider.Track>
      </Slider.Control>
    </Slider>
  )
}

const intents: SliderProps['intent'][] = ['basic', 'main', 'accent']

export const Intent: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-2 sm:grid-cols-5">
    {intents.map(intent => (
      <div key={intent} className="grow">
        <Tag className="mb-md flex">{`${intent}${intent === 'basic' ? ' (default)' : ''}`}</Tag>

        <Slider defaultValue={75} intent={intent}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb
                aria-label={`Power ${intent}`}
                getAriaValueText={value => `${value}%`}
              />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      </div>
    ))}
  </div>
)

export const Disabled: StoryFn = _args => (
  <div>
    <Slider defaultValue={50} disabled>
      <Slider.Label>Volume</Slider.Label>
      <Slider.Value>{(_, value) => `${value}%`}</Slider.Value>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="Power" getAriaValueText={value => `${value}%`} />
        </Slider.Track>
      </Slider.Control>
    </Slider>
  </div>
)

export const RestrictedValues: StoryFn = () => {
  const values = [10, 25, 50, 100]

  const [value, setValue] = useState(0)
  const remappedValue = values[value] ?? values[0]

  return (
    <Slider onValueChange={setValue} value={value} max={values.length - 1}>
      <Slider.Value>{(_, value) => `${value} (remapped: ${remappedValue})`}</Slider.Value>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="Power" getAriaValueText={() => String(remappedValue)} />
        </Slider.Track>
      </Slider.Control>
    </Slider>
  )
}

export const ThumbWithValue: StoryFn = () => {
  return (
    <form>
      <Slider className="mt-md" defaultValue={0} name="default-slider">
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="Power" getAriaValueText={v => `${v}%`}>
              <Slider.Value>{(_, value) => `${value}% long suffix`}</Slider.Value>
            </Slider.Thumb>
          </Slider.Track>
        </Slider.Control>
        <Slider.MinValue>{value => `${value}%`}</Slider.MinValue>
        <Slider.MaxValue>{value => `${value}%`}</Slider.MaxValue>
      </Slider>
    </form>
  )
}

export const FormFieldExample: StoryFn = _args => (
  <FormField name="volume">
    <FormField.Label>Volume</FormField.Label>
    <Slider defaultValue={50}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb getAriaValueText={value => `${value}%`}>
            <Slider.Value>{(_, value) => `${value}%`}</Slider.Value>
          </Slider.Thumb>
        </Slider.Track>
      </Slider.Control>
    </Slider>
    <FormField.HelperMessage>Set up the volume</FormField.HelperMessage>
  </FormField>
)
