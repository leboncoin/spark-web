/* eslint-disable max-lines */
import { Tag } from '@spark-ui/components/tag'
import { Check } from '@spark-ui/icons/Check'
import { EyeOffOutline } from '@spark-ui/icons/EyeOffOutline'
import { EyeOutline } from '@spark-ui/icons/EyeOutline'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { Search } from '@spark-ui/icons/Search'
import { Meta, StoryFn } from '@storybook/react-vite'
import { ChangeEvent, useState } from 'react'

import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { FormField } from '../form-field'
import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { VisuallyHidden } from '../visually-hidden'
import { Input, InputGroup, type InputGroupProps } from '.'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=54840-133360&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const states: InputGroupProps['state'][] = ['error', 'alert', 'success']

export const Default: StoryFn = _args => (
  <Input placeholder="Type here..." aria-label="Phone type" />
)

export const Uncontrolled: StoryFn = _args => (
  <Input defaultValue="iPhone 12" aria-label="Phone type" />
)

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState('iPhone 13')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return <Input value={value} onChange={handleChange} aria-label="Phone type" />
}

export const Disabled: StoryFn = _args => {
  const [isDisabled, setIsDisabled] = useState(true)

  return (
    <div className="gap-xl flex flex-col">
      <Checkbox checked={isDisabled} onClick={() => setIsDisabled(isDisabled => !isDisabled)}>
        Disabled
      </Checkbox>

      <div>
        <Tag className="mb-md flex">Standalone input</Tag>
        <Input
          className="max-w-sz-320"
          aria-label="Website"
          disabled={isDisabled}
          defaultValue="Hello world"
        />
      </div>

      <div>
        <Tag className="mb-md flex">Addons - solid</Tag>
        <InputGroup className="max-w-sz-320" disabled={isDisabled}>
          <InputGroup.LeadingAddon
            render={<IconButton intent="main" design="filled" aria-label="Search" />}
          >
            <Icon>
              <EyeOutline />
            </Icon>
          </InputGroup.LeadingAddon>
          <InputGroup.ClearButton aria-label="clear" />
          <InputGroup.LeadingIcon>
            <PenOutline />
          </InputGroup.LeadingIcon>
          <Input aria-label="Website" defaultValue="Hello world" />
          <InputGroup.TrailingAddon
            render={<IconButton intent="neutral" design="ghost" aria-label="Search" />}
          >
            <Icon>
              <EyeOutline />
            </Icon>
          </InputGroup.TrailingAddon>
        </InputGroup>
      </div>

      <div>
        <Tag className="mb-md flex">Addons - text</Tag>
        <InputGroup className="max-w-sz-320" disabled={isDisabled}>
          <InputGroup.LeadingAddon>https://</InputGroup.LeadingAddon>
          <InputGroup.LeadingIcon>
            <PenOutline />
          </InputGroup.LeadingIcon>
          <Input aria-label="Website" defaultValue="Hello world" />
          <InputGroup.TrailingAddon>.com</InputGroup.TrailingAddon>
        </InputGroup>
      </div>

      <div>
        <Tag className="mb-md flex">Addons - inline</Tag>
        <InputGroup className="max-w-sz-320" disabled={isDisabled}>
          <InputGroup.LeadingIcon>
            <PenOutline />
          </InputGroup.LeadingIcon>
          <Input aria-label="Website" defaultValue="Hello world" />
          <InputGroup.TrailingAddon>
            <Button size="sm">Button</Button>
          </InputGroup.TrailingAddon>
        </InputGroup>
      </div>

      <div>
        <Tag className="mb-md flex">With FormField label</Tag>
        <FormField disabled={isDisabled}>
          <FormField.Label>My label</FormField.Label>
          <Input
            className="max-w-sz-320"
            aria-label="Website"
            disabled={isDisabled}
            defaultValue="Hello world"
          />
        </FormField>
      </div>
    </div>
  )
}

export const ReadOnly: StoryFn = _args => {
  const [isReadOnly, setIsReadOnly] = useState(true)

  return (
    <div className="gap-xl flex flex-col">
      <Checkbox checked={isReadOnly} onClick={() => setIsReadOnly(isReadOnly => !isReadOnly)}>
        Read Only
      </Checkbox>

      <div>
        <Tag className="mb-md flex">Standalone input</Tag>

        <Input
          className="max-w-sz-320"
          aria-label="Website"
          readOnly={isReadOnly}
          defaultValue="Hello world"
        />
      </div>

      <div>
        <Tag className="mb-md flex">Addons - solid</Tag>

        <InputGroup className="max-w-sz-320" readOnly={isReadOnly}>
          <InputGroup.LeadingAddon
            render={<IconButton intent="main" design="filled" aria-label="Search" />}
          >
            <Icon>
              <EyeOutline />
            </Icon>
          </InputGroup.LeadingAddon>

          <InputGroup.ClearButton aria-label="clear" />

          <InputGroup.LeadingIcon>
            <PenOutline />
          </InputGroup.LeadingIcon>

          <Input aria-label="Website" defaultValue="Hello world" />

          <InputGroup.TrailingAddon
            render={<IconButton intent="neutral" design="ghost" aria-label="Search" />}
          >
            <Icon>
              <EyeOutline />
            </Icon>
          </InputGroup.TrailingAddon>
        </InputGroup>
      </div>

      <div>
        <Tag className="mb-md flex">Addons - text</Tag>
        <InputGroup className="max-w-sz-320" readOnly={isReadOnly}>
          <InputGroup.LeadingAddon>https://</InputGroup.LeadingAddon>

          <InputGroup.LeadingIcon>
            <PenOutline />
          </InputGroup.LeadingIcon>

          <Input aria-label="Website" defaultValue="Hello world" />

          <InputGroup.TrailingAddon>.com</InputGroup.TrailingAddon>
        </InputGroup>
      </div>

      <div>
        <Tag className="mb-md flex">Addons - inline</Tag>
        <InputGroup className="max-w-sz-320" readOnly={isReadOnly}>
          <InputGroup.LeadingIcon>
            <PenOutline />
          </InputGroup.LeadingIcon>

          <Input aria-label="Website" defaultValue="Hello world" />

          <InputGroup.TrailingAddon>
            <Button size="sm">Button</Button>
          </InputGroup.TrailingAddon>
        </InputGroup>
      </div>

      <div>
        <Tag className="mb-md flex">With FormField label</Tag>

        <FormField readOnly={isReadOnly}>
          <FormField.Label>My label</FormField.Label>

          <Input
            className="max-w-sz-320"
            aria-label="Website"
            readOnly={isReadOnly}
            defaultValue="Hello world"
          />
        </FormField>
      </div>
    </div>
  )
}

export const Addons: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      <div className="gap-sm flex flex-col">
        <Tag className="flex">Solid</Tag>
        <InputGroup className="max-w-sz-320">
          <InputGroup.LeadingAddon render={<Button design="ghost" intent="neutral" />}>
            Click
          </InputGroup.LeadingAddon>
          <Input aria-label="Website" />
          <InputGroup.TrailingAddon
            render={<IconButton intent="neutral" design="ghost" aria-label="Search" />}
          >
            <Icon>
              <Search />
            </Icon>
          </InputGroup.TrailingAddon>
        </InputGroup>
      </div>

      <div className="gap-sm flex flex-col">
        <Tag className="flex">Inline</Tag>
        <InputGroup className="max-w-sz-320">
          <InputGroup.LeadingAddon className="px-lg">
            <Button size="sm">Click</Button>
          </InputGroup.LeadingAddon>
          <Input aria-label="Website" />
          <InputGroup.TrailingAddon className="px-lg">
            <IconButton size="sm" aria-label="Search">
              <Icon size="sm">
                <Search />
              </Icon>
            </IconButton>
          </InputGroup.TrailingAddon>
        </InputGroup>
      </div>

      <div className="gap-sm flex flex-col">
        <Tag className="flex">Raw text</Tag>
        <InputGroup className="max-w-sz-320">
          <InputGroup.LeadingAddon className="px-lg">https://</InputGroup.LeadingAddon>
          <Input aria-label="Website" />
          <InputGroup.TrailingAddon className="px-lg">.com</InputGroup.TrailingAddon>
        </InputGroup>
      </div>
    </div>
  )
}

export const Icons: StoryFn = () => {
  return (
    <div className="gap-lg flex flex-col items-start">
      <InputGroup className="max-w-sz-320">
        <InputGroup.LeadingIcon>
          <PenOutline />
        </InputGroup.LeadingIcon>

        <Input placeholder="Type here..." />

        <InputGroup.TrailingIcon>
          <Check />
        </InputGroup.TrailingIcon>
      </InputGroup>
    </div>
  )
}

export const PasswordExample: StoryFn = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    setIsVisible(isVisible => !isVisible)
  }

  return (
    <InputGroup className="max-w-sz-320">
      <Input type={isVisible ? 'text' : 'password'} aria-label="Password" />

      <InputGroup.TrailingAddon
        render={
          <IconButton
            intent="neutral"
            design="ghost"
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            onClick={handleToggle}
          />
        }
      >
        <Icon>{isVisible ? <EyeOffOutline /> : <EyeOutline />}</Icon>
      </InputGroup.TrailingAddon>
    </InputGroup>
  )
}

export const SearchExample: StoryFn = _args => {
  return (
    <InputGroup className="max-w-sz-320">
      <InputGroup.LeadingIcon>
        <Search />
      </InputGroup.LeadingIcon>

      <Input aria-label="Searcher" />

      <InputGroup.ClearButton aria-label="Clear value" />

      <InputGroup.TrailingAddon render={<Button design="contrast" />}>
        Search
      </InputGroup.TrailingAddon>
    </InputGroup>
  )
}

export const State: StoryFn = _args => {
  return (
    <div className="gap-xl grid grid-cols-2 md:grid-cols-3">
      {states.map(state => (
        <div key={state}>
          <Tag className="mb-md flex">{state}</Tag>
          <InputGroup className="max-w-sz-320" state={state}>
            <InputGroup.LeadingAddon>https://</InputGroup.LeadingAddon>
            <Input aria-label={`${state} state`} />
            <InputGroup.TrailingAddon>.com</InputGroup.TrailingAddon>
          </InputGroup>
        </div>
      ))}
    </div>
  )
}

export const FieldLabel: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>Title</FormField.Label>

      <Input />
    </FormField>
  )
}

export const FieldHiddenLabel: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>
        <VisuallyHidden>Title</VisuallyHidden>
      </FormField.Label>

      <Input />
    </FormField>
  )
}

export const FieldRequired: StoryFn = _args => {
  return (
    <div>
      <p className="mb-xl">* Required fields</p>
      <FormField name="title" isRequired>
        <FormField.Label>Title</FormField.Label>

        <Input />
      </FormField>
    </div>
  )
}

export const FieldHelperMessage: StoryFn = _args => {
  return (
    <FormField name="title">
      <FormField.Label>Title</FormField.Label>

      <Input />

      <FormField.HelperMessage>
        An effective title significantly increases your chances of making a sale
      </FormField.HelperMessage>
    </FormField>
  )
}

export const FieldCharactersCount: StoryFn = _args => {
  const MAX_LENGTH = 90
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <FormField name="input-with-a-characters-count">
      <FormField.Label>Input with a characters count</FormField.Label>

      <Input value={value} onChange={handleChange} maxLength={MAX_LENGTH} />

      <div className="gap-md flex justify-between">
        <FormField.CharactersCount
          value={value}
          maxLength={MAX_LENGTH}
          description={`You can enter up to ${MAX_LENGTH} characters`}
          liveAnnouncement={({ remainingChars }) =>
            `You have ${remainingChars} characters remaining`
          }
        />
      </div>
    </FormField>
  )
}

export const FieldInvalid: StoryFn = _args => {
  return (
    <FormField name="title" state="error">
      <FormField.Label>Title</FormField.Label>

      <InputGroup>
        <Input defaultValue="leboncoin.fr" />
      </InputGroup>

      <FormField.ErrorMessage>The URL is invalid</FormField.ErrorMessage>
    </FormField>
  )
}
