import { Button } from '@spark-ui/components/button'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useEffect, useRef, useState } from 'react'

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
    }, 500)
  }

  return (
    <div className="gap-lg flex flex-col">
      <Progress max={max} value={value} aria-label="Loading" ref={progressRef} />

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

export const Value: StoryFn = () => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const step = 10

      setValue(value => (value + step) % (100 + step))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Progress value={value}>
      <Progress.Bar />

      <Progress.Label>Loading</Progress.Label>
    </Progress>
  )
}

export const Max: StoryFn = _args => {
  return (
    <Progress value={1} max={4}>
      <Progress.Bar />

      <Progress.Label>Reward</Progress.Label>
    </Progress>
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
    <div className="gap-xl flex flex-col">
      {intents.map(intent => (
        <Progress key={intent} aria-label="Loading" value={60} intent={intent} />
      ))}
    </div>
  )
}

const shapes: ProgressProps['shape'][] = ['square', 'rounded']

export const Shape: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      {shapes.map(shape => (
        <Progress key={shape} aria-label="Loading" value={60} shape={shape} />
      ))}
    </div>
  )
}

export const ValueLabel: StoryFn = () => {
  return (
    <Progress
      value={3}
      max={4}
      getValueLabel={(value, max) => `${value} out of ${max} actions made to earn the reward`}
    >
      <Progress.Bar />

      <Progress.Label>Reward</Progress.Label>
    </Progress>
  )
}

export const Label: StoryFn = _args => {
  return (
    <div className="gap-lg flex flex-col">
      <Progress className="items-start" value={20} max={100}>
        <Progress.Bar />
        <Progress.Label>Loading</Progress.Label>
      </Progress>

      <Progress className="items-center" value={40} max={100}>
        <Progress.Bar />
        <Progress.Label>Loading</Progress.Label>
      </Progress>

      <Progress className="items-end" value={60} max={100}>
        <Progress.Bar />
        <Progress.Label>Loading</Progress.Label>
      </Progress>
    </div>
  )
}

export const Indeterminate: StoryFn = _args => {
  return (
    <Progress isIndeterminate>
      <Progress.Bar />
      <Progress.Label>Loading</Progress.Label>
    </Progress>
  )
}

export const VisibleValue: StoryFn = () => {
  const value = 50

  return (
    <Progress value={value}>
      <Progress.Bar />

      <div className="flex justify-between">
        <Progress.Label>Loading</Progress.Label>

        <span className="text-body-2 text-on-surface">{value}%</span>
      </div>
    </Progress>
  )
}
