import { Tag } from '@spark-ui/components/tag'
import { Check } from '@spark-ui/icons/Check'
import { EyeOffOutline } from '@spark-ui/icons/EyeOffOutline'
import { EyeOutline } from '@spark-ui/icons/EyeOutline'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { Search } from '@spark-ui/icons/Search'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { Input, InputGroup, type InputGroupProps } from '.'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { Icon } from '../icon'
import { IconButton } from '../icon-button'

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  subcomponents: {
    'InputGroup.LeadingAddon': InputGroup.LeadingAddon,
    'InputGroup.TrailingAddon': InputGroup.TrailingAddon,
    'InputGroup.LeadingIcon': InputGroup.LeadingIcon,
    'InputGroup.TrailingIcon': InputGroup.TrailingIcon,
    'InputGroup.ClearButton': InputGroup.ClearButton,
  },
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

export const Addons: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      <div className="gap-sm flex flex-col">
        <Tag className="flex">Solid</Tag>
        <InputGroup className="max-w-sz-320">
          <InputGroup.LeadingAddon asChild>
            <Button design="ghost" intent="neutral">
              Click
            </Button>
          </InputGroup.LeadingAddon>
          <Input aria-label="Website" />
          <InputGroup.TrailingAddon asChild>
            <IconButton intent="neutral" design="ghost" aria-label="Search">
              <Icon>
                <Search />
              </Icon>
            </IconButton>
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

      <InputGroup.TrailingAddon asChild>
        <IconButton
          intent="neutral"
          design="ghost"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          onClick={handleToggle}
        >
          <Icon>{isVisible ? <EyeOffOutline /> : <EyeOutline />}</Icon>
        </IconButton>
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

      <InputGroup.TrailingAddon asChild>
        <Button design="contrast">Search</Button>
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

export const Disabled: StoryFn = _args => {
  const [isDisabled, setIsDisabled] = useState(true)

  return (
    <div className="gap-xl flex flex-col">
      <Checkbox checked={isDisabled} onClick={() => setIsDisabled(isDisabled => !isDisabled)}>
        Disabled
      </Checkbox>

      <div>
        <Tag className="mb-md flex">Addons - solid</Tag>
        <InputGroup className="max-w-sz-320" disabled={isDisabled}>
          <InputGroup.LeadingAddon asChild>
            <IconButton intent="main" design="filled" aria-label="Search">
              <Icon>
                <EyeOutline />
              </Icon>
            </IconButton>
          </InputGroup.LeadingAddon>
          <InputGroup.ClearButton aria-label="clear" />
          <InputGroup.LeadingIcon>
            <PenOutline />
          </InputGroup.LeadingIcon>
          <Input aria-label="Website" defaultValue="Hello world" />
          <InputGroup.TrailingAddon asChild>
            <IconButton intent="neutral" design="ghost" aria-label="Search">
              <Icon>
                <EyeOutline />
              </Icon>
            </IconButton>
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
        <Tag className="mb-md flex">Addons - solid</Tag>

        <InputGroup className="max-w-sz-320" readOnly={isReadOnly}>
          <InputGroup.LeadingAddon asChild>
            <IconButton intent="main" design="filled" aria-label="Search">
              <Icon>
                <EyeOutline />
              </Icon>
            </IconButton>
          </InputGroup.LeadingAddon>

          <InputGroup.ClearButton aria-label="clear" />

          <InputGroup.LeadingIcon>
            <PenOutline />
          </InputGroup.LeadingIcon>

          <Input aria-label="Website" defaultValue="Hello world" />

          <InputGroup.TrailingAddon asChild>
            <IconButton intent="neutral" design="ghost" aria-label="Search">
              <Icon>
                <EyeOutline />
              </Icon>
            </IconButton>
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
    </div>
  )
}
