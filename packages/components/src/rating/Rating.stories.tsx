import { Tag } from '@spark-ui/components/tag'
import { Meta, StoryFn } from '@storybook/react-vite'

import { Rating } from '.'

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=11013-788&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => <Rating aria-label="Rating control" />

export const Readonly: StoryFn = _args => (
  <Rating defaultValue={3.5} aria-label="Rating control with readOnly" readOnly />
)

export const Disabled: StoryFn = _args => (
  <Rating defaultValue={3} aria-label="Rating control disabled" disabled />
)

export const Rounded: StoryFn = _args => (
  <div className="gap-xl flex flex-row flex-wrap">
    {[1.1, 2.24, 3.75, 4.74].map(val => (
      <div key={val} className="">
        <Tag className="mb-md flex">{val}</Tag>
        <Rating defaultValue={val} aria-label={`Rating control ${val}`} readOnly />
      </div>
    ))}
  </div>
)
