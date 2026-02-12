import { Tag } from '@spark-ui/components/tag'
import { Meta, StoryFn } from '@storybook/react-vite'

import { RatingDisplay } from '.'
import type { StarValue } from './types'

const meta: Meta<typeof RatingDisplay> = {
  title: 'Components/RatingDisplay',
  component: RatingDisplay,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=11013-788&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <RatingDisplay value={3.43} count={42} aria-label="Rating: 3.43 out of 5, based on 42 reviews">
    <RatingDisplay.Stars />
    <RatingDisplay.Value />
    <RatingDisplay.Count />
  </RatingDisplay>
)

export const Size: StoryFn = _args => {
  const sizes = ['sm', 'md', 'lg'] as const

  return (
    <div className="gap-xl flex flex-row flex-wrap">
      {sizes.map(size => (
        <div key={size} className="">
          <Tag className="mb-md flex">{`${size}${size === 'md' ? ' (default)' : ''}`}</Tag>
          <RatingDisplay
            value={3}
            size={size}
            count={42}
            aria-label={`Score: 3 out of 5, based on 42 reviews, size ${size}`}
          >
            <RatingDisplay.Stars />
            <RatingDisplay.Value />
            <RatingDisplay.Count />
          </RatingDisplay>
        </div>
      ))}
    </div>
  )
}

export const Rounded: StoryFn = _args => {
  const ratingValues = [1.1, 2.24, 3.75, 4.74]

  return (
    <div className="gap-xl flex flex-row flex-wrap">
      {ratingValues.map(val => (
        <div key={val} className="">
          <Tag className="mb-md flex">{val}</Tag>
          <RatingDisplay
            value={val}
            count={128}
            aria-label={`Score: ${val} out of 5, displayed as ${val.toFixed(1)}, based on 128 reviews`}
          >
            <RatingDisplay.Stars />
            <RatingDisplay.Value />
            <RatingDisplay.Count />
          </RatingDisplay>
        </div>
      ))}
    </div>
  )
}

export const RoundedToInteger: StoryFn = () => {
  const ratingValues = [1.1, 2.24, 3.75, 4.74]

  const getFillModeRoundedInteger = ({
    value,
    index,
  }: {
    value?: number
    index: number
  }): StarValue => {
    if (value === undefined) return 0

    return Math.round(value) > index ? 1 : 0
  }

  return (
    <div className="gap-xl flex flex-row flex-wrap">
      {ratingValues.map(val => (
        <div key={val} className="">
          <Tag className="mb-md flex">{val}</Tag>
          <RatingDisplay value={val} aria-label={`Score: ${val} out of 5 rounded to an integer`}>
            <RatingDisplay.Stars getFillMode={getFillModeRoundedInteger} />
            <RatingDisplay.Value />
          </RatingDisplay>
        </div>
      ))}
    </div>
  )
}

export const RoundedHalfUp: StoryFn = () => {
  const ratingValues = [1.1, 2.24, 3.75, 4.74]

  const getFillModeRoundedHalfUp = ({
    value,
    index,
  }: {
    value?: number
    index: number
  }): StarValue => {
    if (value === undefined) return 0

    const roundedUpToHalf = Math.ceil(value * 2) / 2
    const starPosition = index + 1

    if (roundedUpToHalf >= starPosition) return 1
    if (roundedUpToHalf + 0.5 === starPosition) return 0.5

    return 0
  }

  return (
    <div className="gap-xl flex flex-row flex-wrap">
      {ratingValues.map(val => (
        <div key={val} className="">
          <Tag className="mb-md flex">{val}</Tag>
          <RatingDisplay
            value={val}
            aria-label={`Score: ${val} out of 5 rounded up to nearest half`}
          >
            <RatingDisplay.Stars getFillMode={getFillModeRoundedHalfUp} />
            <RatingDisplay.Value />
          </RatingDisplay>
        </div>
      ))}
    </div>
  )
}

export const CustomFormatting: StoryFn = () => (
  <RatingDisplay value={4.74} count={128} aria-label="Rating: 4.74 out of 5, based on 128 reviews">
    <RatingDisplay.Stars />
    <RatingDisplay.Value>
      {(formattedValue, _rawValue) => `${formattedValue}/5`}
    </RatingDisplay.Value>
    <RatingDisplay.Count>{count => `${count} reviews`}</RatingDisplay.Count>
  </RatingDisplay>
)

export const SingleStar: StoryFn = _args => (
  <div className="gap-xl flex flex-row flex-wrap">
    {[0.5, 2.3, 4.2].map(val => (
      <div key={val}>
        <Tag className="mb-md flex">{val}</Tag>
        <RatingDisplay value={val} aria-label={`Score: ${val} out of 5`}>
          <RatingDisplay.Stars variant="single-star" />
          <RatingDisplay.Value />
        </RatingDisplay>
      </div>
    ))}
  </div>
)
