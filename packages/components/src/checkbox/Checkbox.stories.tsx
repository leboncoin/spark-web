import { Close } from '@spark-ui/icons/Close'
import { Plus } from '@spark-ui/icons/Plus'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../button'
import { Checkbox, CheckboxProps } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=1613-26132&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <Checkbox className="max-w-sz-432">
    Refuse terms and conditions, because you are so unhappy with it. There is no reason to accept
    that, it's unfair!
  </Checkbox>
)

export const Uncontrolled: StoryFn = () => {
  const handleCheckedChange = (current: boolean, indeterminate?: boolean) => {
    console.log(current, indeterminate)
  }

  return (
    <div className="gap-lg flex flex-col">
      <Checkbox defaultChecked onCheckedChange={handleCheckedChange}>
        Accept terms and conditions
      </Checkbox>
    </div>
  )
}

export const Controlled: StoryFn = () => {
  const [checked, setChecked] = useState(true)

  const handleCheckedChange = (current: boolean) => {
    setChecked(current)
  }

  return (
    <div className="gap-lg flex">
      <Checkbox checked={checked} onCheckedChange={handleCheckedChange}>
        Accept terms and conditions
      </Checkbox>

      <Checkbox checked="indeterminate" onCheckedChange={handleCheckedChange}>
        Accept terms and conditions
      </Checkbox>
    </div>
  )
}

export const Disabled: StoryFn = _args => <Checkbox disabled>Accept terms and conditions</Checkbox>

export const Icon: StoryFn = _args => (
  <div className="gap-lg flex flex-col">
    <Checkbox defaultChecked icon={<Close />}>
      Accept terms and conditions
    </Checkbox>
    <Checkbox checked="indeterminate" indeterminateIcon={<Plus />}>
      Accept terms and conditions
    </Checkbox>
  </div>
)

export const Indeterminate: StoryFn = () => {
  const [checked, setChecked] = useState<CheckboxProps['checked']>('indeterminate')

  return (
    <div className="gap-xl inline-flex flex-col">
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        Indeterminate
      </Checkbox>

      <Button
        type="button"
        onClick={() =>
          setChecked(prevIsChecked => (prevIsChecked === 'indeterminate' ? false : 'indeterminate'))
        }
      >
        Toggle indeterminate
      </Button>
    </div>
  )
}
