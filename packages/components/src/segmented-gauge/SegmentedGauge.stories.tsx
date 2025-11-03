import { Label } from '@spark-ui/components/label'
import { Meta, StoryFn } from '@storybook/react-vite'

import { SegmentedGauge } from '.'

const meta: Meta<typeof SegmentedGauge> = {
  title: 'Components/SegmentedGauge',
  component: SegmentedGauge,
  tags: ['data-display'],
  parameters: {},
}

export default meta

export const Default: StoryFn = () => {
  return (
    <SegmentedGauge value={3} min={0} max={4} description="Very Good" aria-label="Quality rating" />
  )
}

export const WithRenderProp: StoryFn = () => {
  return (
    <SegmentedGauge
      value={2}
      min={0}
      max={3}
      aria-label="Skill level"
      className="gap-lg flex flex-col items-center"
    >
      {({ segments }) => (
        <>
          <SegmentedGauge.Track className="from-main-container to-accent-container p-md h-4 bg-gradient-to-r">
            {segments.map((_, index) => (
              <SegmentedGauge.Segment key={index} index={index} className="rounded-lg" />
            ))}
          </SegmentedGauge.Track>

          <SegmentedGauge.Label className="text-lg font-bold">Advanced</SegmentedGauge.Label>
        </>
      )}
    </SegmentedGauge>
  )
}

export const SizeVariants: StoryFn = () => {
  return (
    <div className="space-y-lg">
      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Small (sm)</h4>
        <SegmentedGauge
          value={2}
          min={0}
          max={4}
          size="sm"
          description="Good"
          aria-label="Small gauge"
        />
      </div>

      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Medium (md) - Default</h4>
        <SegmentedGauge
          value={2}
          min={0}
          max={4}
          size="md"
          description="Good"
          aria-label="Medium gauge"
        />
      </div>
    </div>
  )
}

export const IntentVariants: StoryFn = () => {
  const intents: {
    name: string
    intent:
      | 'main'
      | 'support'
      | 'basic'
      | 'accent'
      | 'success'
      | 'alert'
      | 'danger'
      | 'info'
      | 'neutral'
    ariaLabel: string
  }[] = [
    { name: 'Basic (default)', intent: 'basic', ariaLabel: 'Basic gauge' },
    { name: 'Success', intent: 'success', ariaLabel: 'Success gauge' },
    { name: 'Alert', intent: 'alert', ariaLabel: 'Alert gauge' },
    { name: 'Danger', intent: 'danger', ariaLabel: 'Danger gauge' },
    { name: 'Info', intent: 'info', ariaLabel: 'Info gauge' },
  ]

  return (
    <div className="space-y-lg">
      {intents.map(({ name, intent, ariaLabel }) => (
        <div key={intent} className="space-y-sm">
          <h4 className="text-sm font-medium">{name}</h4>
          <SegmentedGauge
            value={1}
            min={0}
            max={2}
            intent={intent}
            description="Medium"
            aria-label={ariaLabel}
          />
        </div>
      ))}
    </div>
  )
}

export const CustomColors: StoryFn = () => {
  const config = [
    { value: 0, color: 'var(--color-error)', description: 'Poor' },
    { value: 1, color: 'var(--color-alert)', description: 'Fair' },
    { value: 2, color: 'var(--color-info)', description: 'Good' },
    {
      value: 3,
      color: 'color-mix(in srgb, var(--color-success) var(--opacity-dim-1), transparent)',
      description: 'Very Good',
    },
    { value: 4, color: 'var(--color-success)', description: 'Excellent' },
  ]

  return (
    <div className="space-y-lg">
      {config.map(({ value, color, description }) => (
        <SegmentedGauge
          key={value}
          value={value}
          min={0}
          max={4}
          customColor={color}
          description={description}
          aria-label="Quality rating"
        />
      ))}
    </div>
  )
}

export const CustomHexColors: StoryFn = () => {
  const config = [
    { value: 0, color: '#ef4444', description: 'Poor' },
    { value: 1, color: '#f59e0b', description: 'Fair' },
    { value: 2, color: '#3b82f6', description: 'Good' },
    { value: 3, color: '#8b5cf6', description: 'Very Good' },
    { value: 4, color: '#10b981', description: 'Excellent' },
  ]

  return (
    <div className="space-y-lg">
      {config.map(({ value, color, description }) => (
        <SegmentedGauge
          key={value}
          value={value}
          min={0}
          max={4}
          customColor={color}
          description={description}
          aria-label="Quality rating"
        />
      ))}
    </div>
  )
}

export const WithLabel: StoryFn = () => {
  return (
    <div className="space-y-sm">
      <Label
        className="gap-sm flex items-center"
        htmlFor="quality-rating-3"
        id="quality-rating-3-label"
      >
        Quality Rating
      </Label>
      <SegmentedGauge
        id="quality-rating-3"
        value={3}
        min={0}
        max={4}
        intent="success"
        description="Very Good"
      />
    </div>
  )
}

export const WithoutValue: StoryFn = () => {
  return (
    <SegmentedGauge
      value={undefined}
      min={0}
      max={4}
      description="No data available"
      aria-label="Quality rating"
    />
  )
}
