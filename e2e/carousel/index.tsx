import { Carousel } from '@spark-ui/components/carousel'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const DefaultCarousel = () => {
  return (
    <Carousel scrollBehavior="instant">
      <Carousel.Viewport>
        <Carousel.Slides>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 1</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 2</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 3</button>
          </Carousel.Slide>
        </Carousel.Slides>
        <Carousel.Controls>
          <Carousel.PrevButton aria-label="Previous group of items" />
          <Carousel.NextButton aria-label="Next group of items" />
        </Carousel.Controls>
      </Carousel.Viewport>

      <Carousel.PagePicker>
        {({ pages }) =>
          pages.map(page => (
            <Carousel.PageIndicator key={page} index={page} aria-label={`Go to page ${page + 1}`} />
          ))
        }
      </Carousel.PagePicker>
    </Carousel>
  )
}

const ControlledCarousel = () => {
  const [activePage, setActivePage] = useState<number>(0)

  const handlePageChange = (page: number) => {
    setActivePage(page)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setActivePage(2)
        }}
      >
        Go directly to last page
      </button>
      <p>The current selected page is {activePage + 1}.</p>
      <Carousel scrollBehavior="instant" page={activePage} onPageChange={handlePageChange}>
        <Carousel.Viewport>
          <Carousel.Slides>
            <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
              <button type="button">Read article 1</button>
            </Carousel.Slide>
            <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
              <button type="button">Read article 2</button>
            </Carousel.Slide>
            <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
              <button type="button">Read article 3</button>
            </Carousel.Slide>
          </Carousel.Slides>
          <Carousel.Controls>
            <Carousel.PrevButton aria-label="Previous group of items" />
            <Carousel.NextButton aria-label="Next group of items" />
          </Carousel.Controls>
        </Carousel.Viewport>

        <Carousel.PagePicker>
          {({ pages }) =>
            pages.map(page => (
              <Carousel.PageIndicator
                key={page}
                index={page}
                aria-label={`Go to page ${page + 1}`}
              />
            ))
          }
        </Carousel.PagePicker>
      </Carousel>
    </div>
  )
}

const LoopCarousel = () => {
  return (
    <Carousel scrollBehavior="instant" loop>
      <Carousel.Viewport>
        <Carousel.Slides>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 1</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 2</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 3</button>
          </Carousel.Slide>
        </Carousel.Slides>
        <Carousel.Controls>
          <Carousel.PrevButton aria-label="Previous group of items" />
          <Carousel.NextButton aria-label="Next group of items" />
        </Carousel.Controls>
      </Carousel.Viewport>

      <Carousel.PagePicker>
        {({ pages }) =>
          pages.map(page => (
            <Carousel.PageIndicator key={page} index={page} aria-label={`Go to page ${page + 1}`} />
          ))
        }
      </Carousel.PagePicker>
    </Carousel>
  )
}

const DefaultPageCarousel = () => {
  return (
    <Carousel scrollBehavior="instant" defaultPage={1}>
      <Carousel.Viewport>
        <Carousel.Slides>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 1</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 2</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 3</button>
          </Carousel.Slide>
        </Carousel.Slides>
        <Carousel.Controls>
          <Carousel.PrevButton aria-label="Previous group of items" />
          <Carousel.NextButton aria-label="Next group of items" />
        </Carousel.Controls>
      </Carousel.Viewport>

      <Carousel.PagePicker>
        {({ pages }) =>
          pages.map(page => (
            <Carousel.PageIndicator key={page} index={page} aria-label={`Go to page ${page + 1}`} />
          ))
        }
      </Carousel.PagePicker>
    </Carousel>
  )
}

export const TwoSlidesPerPage = () => {
  return (
    <Carousel scrollBehavior="instant" slidesPerPage={2}>
      <Carousel.Viewport>
        <Carousel.Slides>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 1</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 2</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 3</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 4</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 5</button>
          </Carousel.Slide>
        </Carousel.Slides>
        <Carousel.Controls>
          <Carousel.PrevButton aria-label="Previous group of items" />
          <Carousel.NextButton aria-label="Next group of items" />
        </Carousel.Controls>
      </Carousel.Viewport>

      <Carousel.PagePicker>
        {({ pages }) =>
          pages.map(page => (
            <Carousel.PageIndicator key={page} index={page} aria-label={`Go to page ${page + 1}`} />
          ))
        }
      </Carousel.PagePicker>
    </Carousel>
  )
}

export const OneSlidePerMove = () => {
  return (
    <Carousel scrollBehavior="instant" slidesPerPage={2} slidesPerMove={1}>
      <Carousel.Viewport>
        <Carousel.Slides>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 1</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 2</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 3</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 4</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 5</button>
          </Carousel.Slide>
        </Carousel.Slides>
        <Carousel.Controls>
          <Carousel.PrevButton aria-label="Previous group of items" />
          <Carousel.NextButton aria-label="Next group of items" />
        </Carousel.Controls>
      </Carousel.Viewport>

      <Carousel.PagePicker>
        {({ pages }) =>
          pages.map(page => (
            <Carousel.PageIndicator key={page} index={page} aria-label={`Go to page ${page + 1}`} />
          ))
        }
      </Carousel.PagePicker>
    </Carousel>
  )
}

const SinglePageCarousel = () => {
  return (
    <Carousel scrollBehavior="instant" slidesPerPage={3}>
      <Carousel.Viewport>
        <Carousel.Slides>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 1</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 2</button>
          </Carousel.Slide>
          <Carousel.Slide className="bg-support-container! text-on-support-container p-xl flex items-center">
            <button type="button">Read article 3</button>
          </Carousel.Slide>
        </Carousel.Slides>
        <Carousel.Controls>
          <Carousel.PrevButton aria-label="Previous group of items" />
          <Carousel.NextButton aria-label="Next group of items" />
        </Carousel.Controls>
      </Carousel.Viewport>

      <Carousel.PagePicker>
        {({ pages }) =>
          pages.map(page => (
            <Carousel.PageIndicator key={page} index={page} aria-label={`Go to page ${page + 1}`} />
          ))
        }
      </Carousel.PagePicker>
    </Carousel>
  )
}

export const CarouselImplementation = () => {
  const variants = {
    default: DefaultCarousel,
    loop: LoopCarousel,
    defaultPage: DefaultPageCarousel,
    controlled: ControlledCarousel,
    twoSlidesPerPage: TwoSlidesPerPage,
    oneSlidePerMove: OneSlidePerMove,
    singlePage: SinglePageCarousel,
  } as const

  const [searchParams] = useSearchParams()
  const variant = (searchParams.get('variant') ?? 'default') as keyof typeof variants
  const Component = variants[variant]

  return <Component />
}
