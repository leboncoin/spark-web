import { Check } from '@spark-ui/icons/Check'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { Meta, StoryFn } from '@storybook/react-vite'

import { Textarea, TextareaGroup } from '.'

const meta: Meta<typeof TextareaGroup> = {
  title: 'Components/TextareaGroup',
  component: TextareaGroup,
  subcomponents: {
    'TextareaGroup.LeadingIcon': TextareaGroup.LeadingIcon,
    'TextareaGroup.TrailingIcon': TextareaGroup.TrailingIcon,
    'TextareaGroup.ClearButton': TextareaGroup.ClearButton,
  },
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=55066-31324&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <TextareaGroup>
    <TextareaGroup.LeadingIcon>
      <PenOutline />
    </TextareaGroup.LeadingIcon>

    <Textarea rows={1} defaultValue="IPhone 12 in good condition" aria-label="Message" />

    <TextareaGroup.TrailingIcon>
      <Check />
    </TextareaGroup.TrailingIcon>
    <TextareaGroup.ClearButton aria-label="Clear" />
  </TextareaGroup>
)

export const Disabled: StoryFn = _args => (
  <TextareaGroup disabled>
    <TextareaGroup.LeadingIcon>
      <PenOutline />
    </TextareaGroup.LeadingIcon>

    <Textarea rows={2} defaultValue="IPhone 12 in good condition" aria-label="Message" />

    <TextareaGroup.TrailingIcon>
      <Check />
    </TextareaGroup.TrailingIcon>
  </TextareaGroup>
)

export const Icon: StoryFn = _args => (
  <TextareaGroup>
    <TextareaGroup.LeadingIcon>
      <PenOutline />
    </TextareaGroup.LeadingIcon>

    <Textarea rows={2} aria-label="Message" />

    <TextareaGroup.TrailingIcon>
      <Check />
    </TextareaGroup.TrailingIcon>
  </TextareaGroup>
)

export const State: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      <TextareaGroup state="error">
        <Textarea rows={2} aria-label="Description" />
      </TextareaGroup>

      <TextareaGroup state="alert">
        <TextareaGroup.LeadingIcon>
          <PenOutline />
        </TextareaGroup.LeadingIcon>

        <Textarea rows={2} aria-label="Description" />
      </TextareaGroup>

      <TextareaGroup state="success">
        <TextareaGroup.LeadingIcon>
          <PenOutline />
        </TextareaGroup.LeadingIcon>

        <Textarea rows={2} aria-label="Description" />

        <TextareaGroup.TrailingIcon>
          <Check />
        </TextareaGroup.TrailingIcon>
      </TextareaGroup>
    </div>
  )
}
