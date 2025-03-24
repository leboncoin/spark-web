import { Meta, StoryFn } from '@storybook/react'

import { Label } from '.'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['indicators'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=10003-24215&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <div className="gap-md flex flex-col">
    <Label htmlFor="label-default">Title</Label>
    <input
      type="text"
      id="label-default"
      placeholder="IPhone 14"
      className="border-md border-neutral p-md active:border-main rounded-sm"
    />
  </div>
)

export const Required: StoryFn = _args => (
  <div className="gap-md flex flex-col">
    <Label className="gap-sm flex items-center" htmlFor="label-required">
      Title
      <Label.RequiredIndicator />
    </Label>

    <input
      type="text"
      id="label-required"
      placeholder="IPhone 14"
      className="border-md border-neutral p-md active:border-main rounded-sm"
      required
    />
  </div>
)

export const RequiredIndicator: StoryFn = _args => (
  <div className="gap-md flex flex-col">
    <Label className="gap-sm flex items-center" htmlFor="label-indicator">
      Title
      <Label.RequiredIndicator>Required</Label.RequiredIndicator>
    </Label>

    <input
      type="text"
      id="label-indicator"
      placeholder="IPhone 14"
      className="border-md border-neutral p-md active:border-main rounded-sm"
      required
    />
  </div>
)
