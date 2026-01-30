import { Button } from '@spark-ui/components/button'
import { Tag } from '@spark-ui/components/tag'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useRef, useState } from 'react'

import { Progress, ProgressProps } from '.'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['indicators'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=54401-18032&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  const [value, setValue] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const loadedSectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)
  const max = 100
  const step = 10
  const onLoadStart = () => {
    intervalRef.current && clearInterval(intervalRef.current)
    setValue(0)
    progressRef.current?.focus()
  }
  const onLoadComplete = () => {
    intervalRef.current && clearInterval(intervalRef.current)
    loadedSectionRef.current?.focus()
  }
  const startLoading = () => {
    onLoadStart()
    intervalRef.current = setInterval(() => {
      setValue(v => {
        const newValue = v + step
        if (newValue === max) onLoadComplete()

        return newValue
      })
    }, 1000)
  }

  return (
    <div className="gap-lg flex flex-col">
      <Progress
        max={max}
        value={value}
        aria-label="Loading"
        ref={progressRef}
        tabIndex={-1}
        onComplete={() => {
          console.log('animation complete')
        }}
      />

      {value !== 0 && (
        <div
          ref={loadedSectionRef}
          tabIndex={-1}
          className="p-lg bg-surface text-on-surface border-sm border-outline gap-md flex rounded-md"
        >
          <span>{value < max ? 'Loading...' : 'Section loaded !'}</span>
        </div>
      )}

      <Button onClick={startLoading} className="self-start">
        {value === 0 ? 'Load section' : 'Reload section'}
      </Button>
    </div>
  )
}

const intents: ProgressProps['intent'][] = [
  'main',
  'support',
  'accent',
  'basic',
  'success',
  'alert',
  'danger',
  'info',
  'neutral',
]

export const Intent: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-wrap">
      {intents.map(intent => (
        <div className="gap-md flex basis-[200px] flex-col">
          <Tag className="flex">{intent}</Tag>
          <Progress
            key={intent}
            aria-label="Loading"
            value={60}
            intent={intent}
            className="grid w-48 grid-cols-2 gap-y-2"
          >
            <Progress.Label>Export data</Progress.Label>
            <Progress.Value />
            <Progress.Track />
          </Progress>
        </div>
      ))}
    </div>
  )
}

const shapes: ProgressProps['shape'][] = ['square', 'rounded']

export const Shape: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      {shapes.map(shape => (
        <Progress
          key={shape}
          aria-label="Loading"
          value={60}
          shape={shape}
          className="grid w-48 grid-cols-2 gap-y-2"
        >
          <Progress.Label>Export data</Progress.Label>
          <Progress.Value />
          <Progress.Track />
        </Progress>
      ))}
    </div>
  )
}

export const ValueLabel: StoryFn = () => {
  return (
    <Progress
      value={30}
      getAriaValueText={(formattedValue, value) => {
        return value ? `${value} out of 4 actions made to earn the reward` : (formattedValue ?? '')
      }}
      className="grid w-48 grid-cols-2 gap-y-2"
    >
      <Progress.Label>Export data</Progress.Label>
      <Progress.Value />
      <Progress.Track />
    </Progress>
  )
}

export const Indeterminate: StoryFn = _args => {
  return (
    <Progress value={null}>
      <Progress.Label>Loading...</Progress.Label>
      <Progress.Track />
    </Progress>
  )
}
