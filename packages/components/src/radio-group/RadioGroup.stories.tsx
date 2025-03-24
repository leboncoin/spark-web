import { StoryLabel } from '@docs/helpers/StoryLabel'
import { Meta, StoryFn } from '@storybook/react'
import { cx } from 'class-variance-authority'
import { useId, useState } from 'react'

import { FormField } from '../form-field'
import { Label } from '../label'
import { VisuallyHidden } from '../visually-hidden'
import { RadioGroup, RadioGroupProps, RadioProps } from '.'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=1611-30265&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <div className="gap-lg flex">
    <div className="w-1/2 shrink basis-auto">
      <RadioGroup defaultValue="1">
        <RadioGroup.Radio value="1">First</RadioGroup.Radio>
        <RadioGroup.Radio value="2">Second</RadioGroup.Radio>
        <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
      </RadioGroup>
    </div>

    <div className="w-1/2 shrink basis-auto">
      <RadioGroup defaultValue="2">
        <RadioGroup.Radio value="1">
          First item from options list. You should choose wisely to avoid bad surprises.
        </RadioGroup.Radio>
        <RadioGroup.Radio value="2">
          Second from options list. You should choose wisely to avoid bad surprises.
        </RadioGroup.Radio>
        <RadioGroup.Radio value="3">
          Third from options list. You should choose wisely to avoid bad surprises.
        </RadioGroup.Radio>
      </RadioGroup>
    </div>
  </div>
)

export const Uncontrolled: StoryFn = _args => (
  <RadioGroup defaultValue="1">
    <RadioGroup.Radio value="1">First</RadioGroup.Radio>
    <RadioGroup.Radio value="2">Second</RadioGroup.Radio>
    <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
  </RadioGroup>
)

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState('1')

  const handleChange = (current: string) => {
    setValue(current)
  }

  return (
    <RadioGroup value={value} onValueChange={handleChange}>
      <RadioGroup.Radio value="1">First</RadioGroup.Radio>
      <RadioGroup.Radio value="2">Second</RadioGroup.Radio>
      <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
    </RadioGroup>
  )
}

export const Reverse: StoryFn = _args => (
  <RadioGroup className="max-w-sz-112" reverse defaultValue="1">
    <RadioGroup.Radio value="1">First</RadioGroup.Radio>
    <RadioGroup.Radio value="2">Second</RadioGroup.Radio>
    <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
  </RadioGroup>
)

const intents: RadioGroupProps['intent'][] = [
  'main',
  'support',
  'accent',
  'basic',
  'info',
  'neutral',
  'success',
  'alert',
  'error',
]

export const Intent: StoryFn = _args => {
  return (
    <div className="gap-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
      {intents.map(intent => (
        <div key={intent}>
          <StoryLabel>{`${intent}${intent === 'basic' ? ' (default)' : ''}`}</StoryLabel>
          <RadioGroup defaultValue="1" intent={intent}>
            <RadioGroup.Radio value="1">First</RadioGroup.Radio>
            <RadioGroup.Radio value="2">Second</RadioGroup.Radio>
            <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

const orientations: RadioGroupProps['orientation'][] = ['horizontal', 'vertical']

export const Orientation: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      {orientations.map(orientation => (
        <div key={orientation}>
          <StoryLabel>{orientation}</StoryLabel>
          <RadioGroup defaultValue="1" orientation={orientation}>
            <RadioGroup.Radio value="1">First</RadioGroup.Radio>
            <RadioGroup.Radio value="2">Second</RadioGroup.Radio>
            <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export const Disabled: StoryFn = _args => (
  <RadioGroup disabled>
    <RadioGroup.Radio value="1">First</RadioGroup.Radio>
    <RadioGroup.Radio value="2">Second</RadioGroup.Radio>
    <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
  </RadioGroup>
)

export const DisabledItem: StoryFn = _args => (
  <RadioGroup>
    <RadioGroup.Radio value="1">First</RadioGroup.Radio>
    <RadioGroup.Radio disabled value="2">
      Second
    </RadioGroup.Radio>
    <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
  </RadioGroup>
)

export const CustomImplementation: StoryFn = () => {
  const CustomRadio = ({
    children,
    selectedValue,
    ...others
  }: RadioProps & { selectedValue: string }) => {
    const id = useId()
    const { value } = others

    return (
      <Label
        id={id}
        htmlFor={value}
        className={cx(
          'max-w-sz-320 gap-md p-lg flex flex-wrap rounded-md shadow-sm',
          value === selectedValue ? 'bg-success/dim-4' : '',
          'cursor-pointer'
        )}
      >
        <RadioGroup.Radio aria-labelledby={id} id={value} {...others} />
        {children}
      </Label>
    )
  }

  const Example = () => {
    const [value, setValue] = useState<string>('')

    function onValueChange(current: string) {
      setValue(current)
    }

    const radios = ['A', 'B', 'C']

    return (
      <RadioGroup value={value} name="sport" onValueChange={onValueChange}>
        {radios.map(radio => {
          return (
            <CustomRadio selectedValue={value} key={radio} value={radio}>
              <div className="flex grow justify-between">
                <span className="font-bold">{radio}</span>
                <span>this is a custom</span>
              </div>
              <div className="w-full text-right italic">implementation of a radio</div>
            </CustomRadio>
          )
        })}
      </RadioGroup>
    )
  }

  return <Example />
}

export const InvisibleRadioGroup: StoryFn = () => {
  const CustomRadio = ({
    children,
    selectedValue,
    ...others
  }: RadioProps & { selectedValue: string }) => {
    const id = useId()
    const { value } = others

    return (
      <Label
        id={id}
        htmlFor={value}
        className={cx(
          'max-w-sz-320 gap-md p-lg flex flex-wrap rounded-md shadow-sm',
          value === selectedValue ? 'bg-success/dim-4' : '',
          'cursor-pointer',
          'focus-within:ring-outline-high',
          '[&:has(:focus-visible)]:focus-within:ring-2'
        )}
      >
        <VisuallyHidden>
          <RadioGroup.Radio aria-labelledby={id} id={value} {...others} />
        </VisuallyHidden>
        {children}
      </Label>
    )
  }

  const Example = () => {
    const [value, setValue] = useState<string>('')

    function onValueChange(current: string) {
      setValue(current)
    }

    const radios = ['D', 'E', 'F']

    return (
      <RadioGroup value={value} name="sport" onValueChange={onValueChange}>
        {radios.map(radio => {
          return (
            <CustomRadio selectedValue={value} key={radio} value={radio}>
              <div className="flex grow justify-between">
                <span className="font-bold">{radio}</span>
                <span>this is a custom</span>
              </div>
              <div className="w-full text-right italic">implementation of a radio</div>
            </CustomRadio>
          )
        })}
      </RadioGroup>
    )
  }

  return <Example />
}

export const WithFormField: StoryFn = _args => {
  const [value, setValue] = useState<string>()

  const handleValueChange = (current: string) => {
    setValue(current)
  }

  return (
    <FormField name="condition" state={!value ? 'error' : undefined} isRequired>
      <FormField.Label asChild>
        <p>Apparel condition</p>
      </FormField.Label>

      <RadioGroup value={value} onValueChange={handleValueChange}>
        <RadioGroup.Radio value="1">New</RadioGroup.Radio>
        <RadioGroup.Radio value="2">Very good</RadioGroup.Radio>
        <RadioGroup.Radio value="3">Good</RadioGroup.Radio>
        <RadioGroup.Radio value="4">Satisfactory</RadioGroup.Radio>
      </RadioGroup>

      <FormField.ErrorMessage>The condition is required</FormField.ErrorMessage>
    </FormField>
  )
}

export const FieldLabel: StoryFn = _args => {
  return (
    <FormField name="sport">
      <FormField.Label>Sports</FormField.Label>

      <RadioGroup>
        <RadioGroup.Radio value="soccer">Soccer</RadioGroup.Radio>
        <RadioGroup.Radio value="tennis">Tennis</RadioGroup.Radio>
        <RadioGroup.Radio value="baseball">Baseball</RadioGroup.Radio>
      </RadioGroup>
    </FormField>
  )
}

export const FieldHiddenLabel: StoryFn = _args => {
  return (
    <FormField name="sport">
      <VisuallyHidden>
        <FormField.Label>Sports</FormField.Label>
      </VisuallyHidden>

      <RadioGroup>
        <RadioGroup.Radio value="soccer">Soccer</RadioGroup.Radio>
        <RadioGroup.Radio value="tennis">Tennis</RadioGroup.Radio>
        <RadioGroup.Radio value="baseball">Baseball</RadioGroup.Radio>
      </RadioGroup>
    </FormField>
  )
}

export const FieldRequired: StoryFn = _args => {
  return (
    <FormField name="sport" isRequired>
      <FormField.Label>Sports</FormField.Label>

      <RadioGroup>
        <RadioGroup.Radio value="soccer">Soccer</RadioGroup.Radio>
        <RadioGroup.Radio value="tennis">Tennis</RadioGroup.Radio>
        <RadioGroup.Radio value="baseball">Baseball</RadioGroup.Radio>
      </RadioGroup>
    </FormField>
  )
}

export const FieldHelperMessage: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>Sports</FormField.Label>

      <RadioGroup>
        <RadioGroup.Radio value="soccer">Soccer</RadioGroup.Radio>
        <RadioGroup.Radio value="tennis">Tennis</RadioGroup.Radio>
        <RadioGroup.Radio value="baseball">Baseball</RadioGroup.Radio>
      </RadioGroup>

      <FormField.HelperMessage>Practicing sports is good for your health</FormField.HelperMessage>
    </FormField>
  )
}

export const FieldInvalid: StoryFn = _args => {
  return (
    <FormField name="title" state="error">
      <FormField.Label>Sports</FormField.Label>

      <RadioGroup>
        <RadioGroup.Radio value="soccer">Soccer</RadioGroup.Radio>
        <RadioGroup.Radio value="tennis">Tennis</RadioGroup.Radio>
        <RadioGroup.Radio value="baseball">Baseball</RadioGroup.Radio>
      </RadioGroup>

      <FormField.ErrorMessage>You must choose a sport among the list</FormField.ErrorMessage>
    </FormField>
  )
}
