import { StoryLabel } from '@docs/helpers/StoryLabel'
import { Meta, StoryFn } from '@storybook/react'

import { Button } from '../button'
import { Badge, type BadgeProps } from '.'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['indicators'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=1613-31302&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const sizes: BadgeProps['size'][] = ['sm', 'md']
const intents: BadgeProps['intent'][] = [
  'main',
  'support',
  'accent',
  'basic',
  'success',
  'alert',
  'danger',
  'info',
  'neutral',
  'surface',
]

const fakeAvatar = <div className="size-sz-40 bg-outline rounded-sm" />

export const Default: StoryFn = _args => <Badge count={1}>{fakeAvatar}</Badge>

export const Intents: StoryFn = _args => (
  <div className="gap-xl grid grid-cols-2 sm:grid-cols-5">
    {intents.map(intent => (
      <div key={intent} className="flex flex-col items-center">
        <StoryLabel className="mb-xl">{`
            ${intent}
            ${intent === 'danger' ? ' (default)' : ''}
          `}</StoryLabel>

        <Badge intent={intent} count={1}>
          {fakeAvatar}
        </Badge>
      </div>
    ))}
  </div>
)

export const Standalone: StoryFn = _args => (
  <Button design="tinted">
    Standalone <Badge count={100} aria-label="New notification" />
  </Button>
)

export const NoCount: StoryFn = _args => <Badge>{fakeAvatar}</Badge>

export const CountThreshold: StoryFn = _args => (
  <div className="gap-xl flex">
    <div className="text-center">
      <StoryLabel className="mb-xl">Default threshold</StoryLabel>
      <Badge
        count={1000}
        aria-label={({ overflowCount }) => `More than ${overflowCount} notifications`}
      >
        {fakeAvatar}
      </Badge>
    </div>
    <div className="text-center">
      <StoryLabel className="mb-xl">Custom threshold</StoryLabel>
      <Badge
        count={1000}
        overflowCount={999}
        aria-label={({ overflowCount }) => `More than ${overflowCount} notifications`}
      >
        {fakeAvatar}
      </Badge>
    </div>
  </div>
)

export const Sizes: StoryFn = _args => (
  <div className="gap-xl flex">
    {sizes.map(size => (
      <div className="gap-xl flex" key={size}>
        <div className="text-center">
          <StoryLabel className="mb-xl">{`
            ${size}
            ${size === 'md' ? ' (default)' : ''}
          `}</StoryLabel>

          <Badge key={size} size={size} count={25}>
            {fakeAvatar}
          </Badge>
        </div>

        <div className="text-center">
          <StoryLabel className="mb-xl">{`
            ${size}
            ${size === 'md' ? ' (default)' : ''}
            empty
          `}</StoryLabel>

          <Badge key={size} size={size}>
            {fakeAvatar}
          </Badge>
        </div>
      </div>
    ))}
  </div>
)
