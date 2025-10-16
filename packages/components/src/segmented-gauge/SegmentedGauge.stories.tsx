import { Meta, StoryFn } from '@storybook/react-vite'

import { SegmentedGauge } from '.'

const meta: Meta<typeof SegmentedGauge> = {
  title: 'Experimental/SegmentedGauge',
  component: SegmentedGauge,
  tags: ['data-display'],
  parameters: {},
}

export default meta

export const Default: StoryFn = () => {
  const colorPerScore = {
    0: '#fb3332',
    1: '#f87b34',
    2: '#fed937',
    3: '#69ca3d',
    4: '#1ea546',
  }

  return (
    <div className="space-y-lg">
      <SegmentedGauge
        value={0}
        intent={colorPerScore[0]}
        segmentLabels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
        aria-label="Quality rating"
      />
      <SegmentedGauge
        value={1}
        intent={colorPerScore[1]}
        segmentLabels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
        aria-label="Quality rating"
      />
      <SegmentedGauge
        value={2}
        intent={colorPerScore[2]}
        segmentLabels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
        aria-label="Quality rating"
      />
      <SegmentedGauge
        value={3}
        intent={colorPerScore[3]}
        segmentLabels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
        aria-label="Quality rating"
      />
      <SegmentedGauge
        value={4}
        intent={colorPerScore[4]}
        segmentLabels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
        aria-label="Quality rating"
      />
    </div>
  )
}

export const WithRenderProp: StoryFn = () => {
  return (
    <SegmentedGauge
      value={2}
      segmentLabels={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
      aria-label="Skill level"
    >
      {({ segments, activeLabel }) => (
        <div className="gap-lg flex flex-col items-center">
          <SegmentedGauge.Track className="from-main-container to-accent-container p-md h-4 bg-gradient-to-r">
            {segments.map(segment => (
              <SegmentedGauge.Segment
                key={segment.index}
                index={segment.index}
                isActive={segment.isActive}
                isCurrent={segment.isCurrent}
                aria-label={segment.label}
                className="rounded-lg"
              />
            ))}
          </SegmentedGauge.Track>

          <SegmentedGauge.Label className="text-lg font-bold">{activeLabel}</SegmentedGauge.Label>
        </div>
      )}
    </SegmentedGauge>
  )
}

export const SizeVariants: StoryFn = () => {
  const segmentLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

  return (
    <div className="space-y-lg">
      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Small (sm) - Default</h4>
        <SegmentedGauge
          value={2}
          size="sm"
          segmentLabels={segmentLabels}
          aria-label="Small gauge"
        />
      </div>

      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Medium (md)</h4>
        <SegmentedGauge
          value={2}
          size="md"
          segmentLabels={segmentLabels}
          aria-label="Medium gauge"
        />
      </div>
    </div>
  )
}

export const IntentVariants: StoryFn = () => {
  const segmentLabels = ['Low', 'Medium', 'High']

  return (
    <div className="space-y-lg">
      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Basic (default)</h4>
        <SegmentedGauge
          value={1}
          intent="basic"
          segmentLabels={segmentLabels}
          aria-label="Basic gauge"
        />
      </div>

      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Success</h4>
        <SegmentedGauge
          value={1}
          intent="success"
          segmentLabels={segmentLabels}
          aria-label="Success gauge"
        />
      </div>

      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Alert</h4>
        <SegmentedGauge
          value={1}
          intent="alert"
          segmentLabels={segmentLabels}
          aria-label="Alert gauge"
        />
      </div>

      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Danger</h4>
        <SegmentedGauge
          value={1}
          intent="danger"
          segmentLabels={segmentLabels}
          aria-label="Danger gauge"
        />
      </div>

      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Info</h4>
        <SegmentedGauge
          value={1}
          intent="info"
          segmentLabels={segmentLabels}
          aria-label="Info gauge"
        />
      </div>

      <div className="space-y-sm">
        <h4 className="text-sm font-medium">Custom color</h4>

        <SegmentedGauge
          value={1}
          intent="#8B5CF6"
          segmentLabels={segmentLabels}
          aria-label="Purple gauge"
        />
      </div>
    </div>
  )
}
