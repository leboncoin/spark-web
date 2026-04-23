import { ConversationFill } from '@spark-ui/icons/ConversationFill'
import { FireFill } from '@spark-ui/icons/FireFill'
import { MailFill } from '@spark-ui/icons/MailFill'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { cx } from 'class-variance-authority'
import { useState } from 'react'

import { SegmentedControl } from '.'
import { FormField } from '../form-field'
import { Icon } from '../icon'
import { Tag } from '../tag'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
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
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <SegmentedControl value={value} onValueChange={setValue}>
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
    </SegmentedControl>
  )
}

export const WithIcons: StoryFn = _args => (
  <SegmentedControl defaultValue="today">
    <SegmentedControl.Indicator />
    <SegmentedControl.Item value="inbox">
      <Icon size="sm">
        <MailFill />
      </Icon>
      Inbox
    </SegmentedControl.Item>
    <SegmentedControl.Item value="today">
      <Icon size="sm">
        <ConversationFill />
      </Icon>
      Today
    </SegmentedControl.Item>
    <SegmentedControl.Item value="upcoming">
      <Icon size="sm">
        <FireFill />
      </Icon>
      Upcoming
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

export const CustomContent: StoryFn = _args => (
  <SegmentedControl defaultValue="none">
    <SegmentedControl.Indicator />
    <SegmentedControl.Item value="none">Aucune</SegmentedControl.Item>
    <SegmentedControl.Item value="premium" className="gap-xs flex flex-col items-center">
      <strong>2$ per month</strong>
      <Tag design="tinted" intent="neutral">
        No commitment
      </Tag>
    </SegmentedControl.Item>
  </SegmentedControl>
)

export const NoIndicator: StoryFn = _args => {
  const checkedStyles = cx('data-checked:bg-surface-inverse data-checked:text-on-surface-inverse')

  return (
    <SegmentedControl defaultValue="none">
      <SegmentedControl.Item value="none" className={checkedStyles}>
        Aucune
      </SegmentedControl.Item>
      <SegmentedControl.Item value="premium" className={checkedStyles}>
        2$ per month
      </SegmentedControl.Item>
    </SegmentedControl>
  )
}

export const FieldLabel: StoryFn = _args => (
  <FormField name="view">
    <FormField.Label>Display</FormField.Label>
    <SegmentedControl defaultValue="week">
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
    </SegmentedControl>
  </FormField>
)

export const FieldHelperMessage: StoryFn = _args => (
  <FormField name="view">
    <FormField.Label>Display</FormField.Label>
    <SegmentedControl defaultValue="week">
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
    </SegmentedControl>
    <FormField.HelperMessage>Choose the granularity of the calendar view.</FormField.HelperMessage>
  </FormField>
)

export const FieldRequired: StoryFn = _args => (
  <FormField name="view" isRequired>
    <FormField.Label>Display</FormField.Label>
    <SegmentedControl defaultValue="week">
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
    </SegmentedControl>
  </FormField>
)
