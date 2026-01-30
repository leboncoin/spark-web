import { Tag } from '@spark-ui/components/tag'
import { Meta, StoryFn } from '@storybook/react-vite'

import { Label } from '../label'
import { CircularMeter, CircularMeterProps } from '.'

const meta: Meta<typeof CircularMeter> = {
  title: 'Components/CircularMeter',
  component: CircularMeter,
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
    <CircularMeter value={24}>
      <CircularMeter.Track>
        <CircularMeter.Value />
        <CircularMeter.Label>Storage used</CircularMeter.Label>
      </CircularMeter.Track>
    </CircularMeter>
  )
}

const intents: CircularMeterProps['intent'][] = [
  'main',
  'support',
  'success',
  'alert',
  'danger',
  'info',
]

export const Intent: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-wrap">
      {intents.map(intent => (
        <div className="gap-md flex flex-col">
          <Tag className="flex">{intent}</Tag>
          <CircularMeter key={intent} aria-label="Storage used" value={70} intent={intent}>
            <CircularMeter.Track key={intent} aria-label="Storage used">
              <CircularMeter.Value />
              <CircularMeter.Label>Storage used</CircularMeter.Label>
            </CircularMeter.Track>
          </CircularMeter>
        </div>
      ))}
    </div>
  )
}

export const Size: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-wrap items-start justify-evenly">
      <div className="gap-md flex flex-col">
        <Tag>sm</Tag>
        <CircularMeter value={75} size="sm" aria-label="Small (24px)">
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      </div>

      <div className="gap-md flex flex-col">
        <Tag>md</Tag>
        <CircularMeter value={75} size="md" aria-label="Medium (64px)">
          <CircularMeter.Track>
            <CircularMeter.Value />
          </CircularMeter.Track>
          <CircularMeter.Content>
            <CircularMeter.Label>Storage used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      </div>

      <div className="gap-md flex flex-col">
        <Tag>lg (default)</Tag>
        <CircularMeter value={75} size="lg" aria-label="Large (96px)">
          <CircularMeter.Track>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage used</CircularMeter.Label>
          </CircularMeter.Track>
        </CircularMeter>
      </div>

      <div className="gap-md flex flex-col">
        <Tag>xl</Tag>
        <CircularMeter value={75} size="xl" aria-label="Extra Large (128px)">
          <CircularMeter.Track>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage used</CircularMeter.Label>
          </CircularMeter.Track>
        </CircularMeter>
      </div>
    </div>
  )
}

export const Orientation: StoryFn = _args => {
  return (
    <div className="gap-lg flex">
      <div className="gap-md flex flex-col">
        <Tag>vertical (default)</Tag>

        <CircularMeter size="sm" value={75} aria-label="Storage used" orientation="vertical">
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      </div>

      <div className="gap-md flex flex-col">
        <Tag>horizontal</Tag>

        <CircularMeter size="sm" value={75} aria-label="Storage used" orientation="horizontal">
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      </div>
    </div>
  )
}

export const CustomValue: StoryFn = () => {
  return (
    <CircularMeter size="sm" value={1} max={4}>
      <CircularMeter.Track />
      <CircularMeter.Content>
        <CircularMeter.Label>Step</CircularMeter.Label>
        <CircularMeter.Value>
          {((_: string, value: number) => `${value}/4`) as any}
        </CircularMeter.Value>
      </CircularMeter.Content>
    </CircularMeter>
  )
}

export const CustomLayout: StoryFn = () => {
  return (
    <div className="gap-lg flex flex-wrap">
      <CircularMeter
        size="sm"
        value={70}
        intent="alert"
        orientation="horizontal"
        className="border-sm border-outline p-lg rounded-lg"
      >
        <CircularMeter.Track />
        <CircularMeter.Content>
          <CircularMeter.Value />
          <CircularMeter.Label className="opacity-dim-1">of missed calls</CircularMeter.Label>
        </CircularMeter.Content>
      </CircularMeter>

      <CircularMeter
        value={70}
        intent="alert"
        orientation="vertical"
        className="border-sm border-outline p-lg rounded-lg text-center"
      >
        <CircularMeter.Track>
          <CircularMeter.Value />
        </CircularMeter.Track>
        <CircularMeter.Content>
          <CircularMeter.Label className="text-on-surface text-body-1 font-bold">
            of missed calls
          </CircularMeter.Label>
          <p className="text-body-2 text-on-surface/dim-1">14 missed calls</p>
        </CircularMeter.Content>
      </CircularMeter>

      <CircularMeter
        size="xl"
        value={70}
        intent="alert"
        orientation="vertical"
        className="border-sm border-outline p-lg rounded-lg text-center"
      >
        <CircularMeter.Track>
          <CircularMeter.Value />
          <CircularMeter.Label>of missed calls</CircularMeter.Label>
        </CircularMeter.Track>
        <CircularMeter.Content>
          <p className="text-body-2 text-on-surface/dim-1">14 missed calls</p>
        </CircularMeter.Content>
      </CircularMeter>

      <div className="border-sm border-outline p-lg gap-lg flex flex-col rounded-lg">
        <Label className="text-body-1 font-bold">Ad completion score:</Label>
        <CircularMeter
          aria-label="Ad completion score"
          value={70}
          intent="alert"
          orientation="horizontal"
        >
          <CircularMeter.Track>
            <CircularMeter.Value />
          </CircularMeter.Track>
          <CircularMeter.Content>
            <p className="text-on-surface text-body-1 font-bold">your ad has potential !</p>
            <p className="text-body-2 text-on-surface/dim-1">
              Add more information to get more visibility
            </p>
          </CircularMeter.Content>
        </CircularMeter>
      </div>
    </div>
  )
}
