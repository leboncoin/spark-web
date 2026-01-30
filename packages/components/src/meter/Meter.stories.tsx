import { Tag } from '@spark-ui/components/tag'
import { Meta, StoryFn } from '@storybook/react-vite'

import { Meter, MeterProps } from '.'

const meta: Meta<typeof Meter> = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['indicators'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=54401-18032&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  return (
    <Meter value={24} aria-label="Storage used">
      <Meter.Label>Storage used</Meter.Label>
      <Meter.Value />
      <Meter.Track />
    </Meter>
  )
}

const intents: MeterProps['intent'][] = ['main', 'support', 'success', 'alert', 'danger', 'info']

export const Intent: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-wrap">
      {intents.map(intent => (
        <div className="gap-md flex flex-col">
          <Tag className="flex">{intent}</Tag>
          <Meter key={intent} aria-label="Storage used" value={60} intent={intent}>
            <Meter.Label>Storage used</Meter.Label>
            <Meter.Value />
            <Meter.Track />
          </Meter>
        </div>
      ))}
    </div>
  )
}

export const CustomValue: StoryFn = () => {
  return (
    <Meter value={1} max={4}>
      <Meter.Label>Step</Meter.Label>
      <Meter.Value>{(_: string, value: number) => `${value}/4`}</Meter.Value>
      <Meter.Track />
    </Meter>
  )
}

const shapes: MeterProps['shape'][] = ['square', 'rounded']

export const Shape: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      {shapes.map(shape => (
        <div key={shape} className="gap-md flex flex-col">
          <Tag className="flex">{shape}</Tag>
          <Meter aria-label="Storage used" value={60} shape={shape}>
            <Meter.Label>Storage used</Meter.Label>
            <Meter.Value />
            <Meter.Track />
          </Meter>
        </div>
      ))}
    </div>
  )
}
