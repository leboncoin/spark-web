import { ConversationFill } from '@spark-ui/icons/ConversationFill'
import { FireFill } from '@spark-ui/icons/FireFill'
import { MailFill } from '@spark-ui/icons/MailFill'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { Icon } from '../icon'
import { SegmentedControl } from '.'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Experimental/SegmentedControl',
  component: SegmentedControl,
  tags: ['form'],
  parameters: {
    design: {
      type: 'figma',
      url: '',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  const [value, setValue] = useState<string | null>(null)

  return (
    <SegmentedControl value={value ?? undefined} onValueChange={setValue}>
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
    </SegmentedControl>
  )
}

export const Size: StoryFn = _args => (
  <div className="gap-lg flex flex-col">
    {(['sm', 'md', 'lg'] as const).map(size => (
      <div key={size} className="gap-sm flex flex-col">
        <p className="text-caption text-on-surface/dim-1">
          {size}
          {size === 'md' && ' (default)'}
        </p>
        <SegmentedControl defaultValue="week" size={size}>
          <SegmentedControl.Indicator />
          <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
          <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
          <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
        </SegmentedControl>
      </div>
    ))}
  </div>
)

export const WithIcons: StoryFn = _args => (
  <SegmentedControl defaultValue="today">
    <SegmentedControl.Indicator />
    <SegmentedControl.Item value="inbox" aria-label="Inbox">
      <Icon size="sm">
        <MailFill />
      </Icon>
    </SegmentedControl.Item>
    <SegmentedControl.Item value="today" aria-label="Today">
      <Icon size="sm">
        <ConversationFill />
      </Icon>
    </SegmentedControl.Item>
    <SegmentedControl.Item value="upcoming" aria-label="Upcoming">
      <Icon size="sm">
        <FireFill />
      </Icon>
    </SegmentedControl.Item>
  </SegmentedControl>
)

export const Disabled: StoryFn = _args => (
  <SegmentedControl defaultValue="week">
    <SegmentedControl.Indicator />
    <SegmentedControl.Item value="day" disabled>
      Day
    </SegmentedControl.Item>
    <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
    <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
  </SegmentedControl>
)
