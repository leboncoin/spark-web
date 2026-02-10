import { Slider } from '@spark-ui/components/slider'
import React from 'react'

export const A11ySlider = () => (
  <section>
    <form>
      <Slider defaultValue={50} name="default-slider" intent="main">
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="Power" />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </form>
  </section>
)
