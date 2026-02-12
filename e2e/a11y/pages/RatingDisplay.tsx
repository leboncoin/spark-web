import { RatingDisplay } from '@spark-ui/components/rating-display'
import React from 'react'

export const A11yRatingDisplay = () => (
  <section>
    <RatingDisplay value={3.5} count={128} aria-label="Rating: 3.5 out of 5, based on 128 reviews">
      <RatingDisplay.Stars />
      <RatingDisplay.Value />
      <RatingDisplay.Count />
    </RatingDisplay>

    <RatingDisplay value={4} aria-label="Rating: 4 out of 5">
      <RatingDisplay.Stars />
      <RatingDisplay.Value />
    </RatingDisplay>

    <RatingDisplay value={2.3} aria-label="Rating: 2.3 out of 5">
      <RatingDisplay.Stars variant="single-star" />
      <RatingDisplay.Value />
    </RatingDisplay>
  </section>
)
