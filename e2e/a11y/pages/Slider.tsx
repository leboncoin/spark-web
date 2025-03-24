import { Slider } from '@spark-ui/components/slider'
import React from 'react'

export const A11ySlider = () => (
  <section>
    <form>
      <Slider defaultValue={[50]} name="default-slider" intent="main">
        <Slider.Track />
        <Slider.Thumb aria-label="Power" />
      </Slider>
    </form>

    <div>
      <Slider defaultValue={[25, 75]}>
        <Slider.Track />

        <Slider.Thumb aria-label="Power min" />
        <Slider.Thumb aria-label="Power max" />
      </Slider>
    </div>
  </section>
)
