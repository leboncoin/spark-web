import { StoryLabel } from '@docs/helpers/StoryLabel'
import { BookmarkFill } from '@spark-ui/icons/BookmarkFill'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Icon } from '../icon'
import { ProgressTracker, type ProgressTrackerProps } from '.'

const meta: Meta<typeof ProgressTracker> = {
  title: 'Components/ProgressTracker',
  component: ProgressTracker,
  tags: ['indicators'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=41021-14134&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const sizes: ProgressTrackerProps['size'][] = ['sm', 'md', 'lg']
const designs: ProgressTrackerProps['design'][] = ['outline', 'tinted']
const intents: ProgressTrackerProps['intent'][] = [
  'basic',
  'support',
  'main',
  'neutral',
  'info',
  'accent',
  'danger',
  'alert',
  'success',
]
const orientations: ProgressTrackerProps['orientation'][] = ['horizontal', 'vertical']

export const Default: StoryFn = _args => (
  <div className="gap-2xl flex flex-wrap items-center">
    <ProgressTracker aria-label="Default progress tracker" stepIndex={1}>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator />
        <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator />
        <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator />
        <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
    </ProgressTracker>

    <ProgressTracker stepIndex={1} aria-label="Default progress tracker with custom indicators">
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator
          complete={
            <Icon>
              <BookmarkFill />
            </Icon>
          }
          incomplete="A"
        />
        <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator incomplete="B" />
        <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator incomplete="C" />
        <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
    </ProgressTracker>

    <ProgressTracker
      stepIndex={1}
      aria-label="Default progress tracker with empty incomplete indicator"
    >
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator incomplete={null} />
        <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator incomplete={null} />
        <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator incomplete={null} />
        <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
    </ProgressTracker>
  </div>
)

export const Disabled: StoryFn = _args => (
  <ProgressTracker aria-label="Progress tracker with disabled step" stepIndex={1}>
    <ProgressTracker.Step>
      <ProgressTracker.StepIndicator />
      <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
    </ProgressTracker.Step>
    <ProgressTracker.Step>
      <ProgressTracker.StepIndicator />
      <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
    </ProgressTracker.Step>
    <ProgressTracker.Step disabled>
      <ProgressTracker.StepIndicator />
      <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
    </ProgressTracker.Step>
  </ProgressTracker>
)

export const Readonly: StoryFn = _args => (
  <ProgressTracker aria-label="Non interactive progress tracker" stepIndex={1} readOnly>
    <ProgressTracker.Step aria-label="Build" />
    <ProgressTracker.Step aria-label="Deploy" />
    <ProgressTracker.Step aria-label="Iterate" />
  </ProgressTracker>
)

export const Size: StoryFn = _args => (
  <div className="gap-2xl flex flex-wrap items-center">
    {sizes.map(size => (
      <div key={size}>
        <StoryLabel>{`${size}${size === 'lg' ? ' (default)' : ''}`}</StoryLabel>

        <ProgressTracker
          aria-label={`Progress tracker "${size}"`}
          stepIndex={1}
          size={size as ProgressTrackerProps['size']}
        >
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
        </ProgressTracker>
      </div>
    ))}
  </div>
)

export const Design: StoryFn = _args => (
  <div className="gap-2xl flex flex-wrap items-center">
    {designs.map(design => (
      <div key={design}>
        <StoryLabel>{`${design}${design === 'outline' ? ' (default)' : ''}`}</StoryLabel>
        <ProgressTracker
          aria-label={`Progress tracker "${design}"`}
          stepIndex={1}
          design={design as ProgressTrackerProps['design']}
        >
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
        </ProgressTracker>
      </div>
    ))}
  </div>
)

export const Intent: StoryFn = _args => (
  <div className="gap-2xl flex flex-wrap items-center">
    {intents.map(intent => (
      <div key={intent}>
        <StoryLabel>{`${intent}${intent === 'basic' ? ' (default)' : ''}`}</StoryLabel>
        <ProgressTracker
          aria-label={`Progress tracker "${intent}"`}
          stepIndex={1}
          intent={intent as ProgressTrackerProps['intent']}
        >
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step disabled>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Repeat</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
        </ProgressTracker>
      </div>
    ))}
  </div>
)

export const Orientation: StoryFn = _args => (
  <div className="gap-2xl flex flex-wrap">
    {orientations.map(orientation => (
      <div key={orientation}>
        <StoryLabel>{`${orientation}${
          orientation === 'horizontal' ? ' (default)' : ''
        }`}</StoryLabel>

        <ProgressTracker
          stepIndex={1}
          aria-label={`Progress tracker with "${orientation}" orientation`}
          orientation={orientation as ProgressTrackerProps['orientation']}
          {...(orientation === 'vertical' && {
            className: 'w-[120px]',
          })}
        >
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Deploy with confidence</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Iterate again and again</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
          <ProgressTracker.Step>
            <ProgressTracker.StepIndicator />
            <ProgressTracker.StepLabel>Repeat</ProgressTracker.StepLabel>
          </ProgressTracker.Step>
        </ProgressTracker>
      </div>
    ))}
  </div>
)

export const Controlled: StoryFn = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleClick = (index: number) => setCurrentStep(index)

  return (
    <ProgressTracker
      aria-label="Progress tracker controlled"
      stepIndex={currentStep}
      onStepClick={handleClick}
    >
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator />
        <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator />
        <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepIndicator />
        <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
    </ProgressTracker>
  )
}
