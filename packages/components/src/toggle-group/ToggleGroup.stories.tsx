import { BookmarkFill } from '@spark-ui/icons/BookmarkFill'
import { EyeFill } from '@spark-ui/icons/EyeFill'
import { HomeFill } from '@spark-ui/icons/HomeFill'
import { LikeFill } from '@spark-ui/icons/LikeFill'
import { MailFill } from '@spark-ui/icons/MailFill'
import { StarFill } from '@spark-ui/icons/StarFill'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { ToggleGroup } from '.'
import { Button } from '../button'
import { FormField } from '../form-field'
import { Icon } from '../icon'
import { ToggleGroupToggle } from './ToggleGroupToggle'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  subcomponents: {
    'ToggleGroup.Toggle': ToggleGroupToggle,
  },
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  const toggleStyles =
    'bg-neutral-container px-lg py-md data-[pressed]:bg-main data-[pressed]:text-on-main first:rounded-l-md last:rounded-r-md'

  return (
    <ToggleGroup className="gap-px" defaultValue={['star']} aria-label="Favorite options">
      <ToggleGroup.Toggle value="star" aria-label="Star" className={toggleStyles}>
        <Icon size="sm">
          <StarFill />
        </Icon>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="like" aria-label="Like" className={toggleStyles}>
        <Icon size="sm">
          <LikeFill />
        </Icon>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="bookmark" aria-label="Bookmark" className={toggleStyles}>
        <Icon size="sm">
          <BookmarkFill />
        </Icon>
      </ToggleGroup.Toggle>
    </ToggleGroup>
  )
}

export const Multiple: StoryFn = () => {
  const toggleStyles =
    'bg-neutral-container px-lg py-md data-[pressed]:bg-main data-[pressed]:text-on-main first:rounded-l-md last:rounded-r-md'

  return (
    <ToggleGroup
      className="gap-px"
      multiple
      defaultValue={['star', 'like']}
      aria-label="Favorite options"
    >
      <ToggleGroup.Toggle value="star" aria-label="Star" className={toggleStyles}>
        <Icon size="sm">
          <StarFill />
        </Icon>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="like" aria-label="Like" className={toggleStyles}>
        <Icon size="sm">
          <LikeFill />
        </Icon>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="bookmark" aria-label="Bookmark" className={toggleStyles}>
        <Icon size="sm">
          <BookmarkFill />
        </Icon>
      </ToggleGroup.Toggle>
    </ToggleGroup>
  )
}

export const WithExistingSparkComponents: StoryFn = () => {
  const [buttonValues, setButtonValues] = useState<string[]>(['star'])

  return (
    <ToggleGroup
      value={buttonValues}
      onValueChange={v => setButtonValues(v as string[])}
      aria-label="Favorite options"
      className="gap-md flex"
    >
      <ToggleGroup.Toggle value="star" aria-label="Star" asChild>
        <Button
          design={buttonValues.includes('star') ? 'filled' : 'outlined'}
          intent="support"
          size="md"
        >
          <Icon size="sm">
            <StarFill />
          </Icon>
          Favorite
        </Button>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="like" aria-label="Like" asChild>
        <Button
          design={buttonValues.includes('like') ? 'filled' : 'outlined'}
          intent="support"
          size="md"
        >
          <Icon size="sm">
            <LikeFill />
          </Icon>
          Like
        </Button>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="bookmark" aria-label="Bookmark" asChild>
        <Button
          design={buttonValues.includes('bookmark') ? 'filled' : 'outlined'}
          intent="support"
          size="md"
        >
          <Icon size="sm">
            <BookmarkFill />
          </Icon>
          Bookmark
        </Button>
      </ToggleGroup.Toggle>
    </ToggleGroup>
  )
}

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState<any>(['home'])

  const toggleStyles =
    'bg-neutral-container px-lg py-md data-[pressed]:bg-main data-[pressed]:text-on-main first:rounded-l-md last:rounded-r-md'

  return (
    <ToggleGroup value={value} onValueChange={v => setValue(v)} aria-label="Navigation">
      <ToggleGroup.Toggle value="home" aria-label="Home" className={toggleStyles}>
        <Icon size="sm">
          <HomeFill />
        </Icon>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="mail" aria-label="Mail" className={toggleStyles}>
        <Icon size="sm">
          <MailFill />
        </Icon>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="eye" aria-label="View" className={toggleStyles}>
        <Icon size="sm">
          <EyeFill />
        </Icon>
      </ToggleGroup.Toggle>
    </ToggleGroup>
  )
}

export const Disabled: StoryFn = () => {
  const toggleStyles =
    'bg-neutral-container px-lg py-md data-[pressed]:bg-main data-[pressed]:text-on-main first:rounded-l-md last:rounded-r-md'

  return (
    <ToggleGroup defaultValue={['star']} aria-label="Favorite options">
      <ToggleGroup.Toggle value="star" aria-label="Star" className={toggleStyles}>
        <Icon size="sm">
          <StarFill />
        </Icon>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="like" aria-label="Like" disabled className={toggleStyles}>
        <Icon size="sm">
          <LikeFill />
        </Icon>
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="bookmark" aria-label="Bookmark" className={toggleStyles}>
        <Icon size="sm">
          <BookmarkFill />
        </Icon>
      </ToggleGroup.Toggle>
    </ToggleGroup>
  )
}

export const WithFormField: StoryFn = () => {
  const [view, setView] = useState<any>(['home'])

  const toggleStyles =
    'bg-neutral-container px-lg py-md data-[pressed]:bg-main data-[pressed]:text-on-main first:rounded-l-md last:rounded-r-md'

  return (
    <FormField name="navigation-view">
      <FormField.Label>Navigation View</FormField.Label>
      <FormField.Control>
        {({ labelId, description }) => {
          return (
            <ToggleGroup
              value={view}
              onValueChange={v => setView(v)}
              aria-labelledby={labelId}
              aria-describedby={description}
            >
              <ToggleGroup.Toggle value="home" aria-label="Home" className={toggleStyles}>
                <Icon size="sm">
                  <HomeFill />
                </Icon>
              </ToggleGroup.Toggle>
              <ToggleGroup.Toggle value="mail" aria-label="Mail" className={toggleStyles}>
                <Icon size="sm">
                  <MailFill />
                </Icon>
              </ToggleGroup.Toggle>
              <ToggleGroup.Toggle value="eye" aria-label="View" className={toggleStyles}>
                <Icon size="sm">
                  <EyeFill />
                </Icon>
              </ToggleGroup.Toggle>
            </ToggleGroup>
          )
        }}
      </FormField.Control>
      <FormField.HelperMessage>Choose your preferred navigation view</FormField.HelperMessage>
    </FormField>
  )
}
