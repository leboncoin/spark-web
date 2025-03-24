import { Carousel as Root } from './Carousel'
import { CarouselControls as Controls } from './CarouselControls'
import { CarouselNextButton as NextButton } from './CarouselNextButton'
import { CarouselPageIndicator as PageIndicator } from './CarouselPageIndicator'
import { CarouselPagePicker as PagePicker } from './CarouselPagePicker'
import { CarouselPrevButton as PrevButton } from './CarouselPrevButton'
import { CarouselSlide as Slide } from './CarouselSlide'
import { CarouselSlides as Slides } from './CarouselSlides'
import { CarouselViewport as Viewport } from './CarouselViewport'

export const Carousel: typeof Root & {
  Controls: typeof Controls
  NextButton: typeof NextButton
  PrevButton: typeof PrevButton
  Slide: typeof Slide
  Slides: typeof Slides
  Viewport: typeof Viewport
  PagePicker: typeof PagePicker
  PageIndicator: typeof PageIndicator
} = Object.assign(Root, {
  Controls,
  NextButton,
  PrevButton,
  Slide,
  Slides,
  Viewport,
  PagePicker,
  PageIndicator,
})

Carousel.displayName = 'Carousel'
