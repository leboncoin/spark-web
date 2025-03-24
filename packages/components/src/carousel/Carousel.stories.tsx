/* eslint-disable max-lines */
import { Meta, StoryFn } from '@storybook/react'
import { cx } from 'class-variance-authority'
import { memo, useState } from 'react'

import { Button } from '../button'
import { FormField } from '../form-field'
import { Select } from '../select'
import { Slider } from '../slider'
import { Stepper } from '../stepper'
import { Carousel } from '.'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['layout'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=55718-50111&t=BBIndEY6dnQTRa1G-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const RandomImage = memo(
  ({
    imgWidth = 200,
    imgHeight = 300,
    className,
  }: {
    imgWidth?: number | string
    imgHeight?: number | string
    className?: string
  }) => {
    const randomSeed = Math.random().toString(36).substring(2, 10) // Génère un seed aléatoire

    return (
      <img
        className={cx(className)}
        width="100%"
        height="100%"
        src={`https://picsum.photos/seed/${randomSeed}/${imgWidth}/${imgHeight}`}
        alt={`Random image with seed ${randomSeed}`}
      />
    )
  }
)

export const Default: StoryFn = _args => {
  return (
    <Carousel>
      <Carousel.Viewport>
        <Carousel.Slides>
          {Array.from({ length: 11 }).map((_, i) => {
            return (
              <Carousel.Slide key={i} className="flex items-center" aria-label={`Slide ${i}`}>
                <RandomImage imgHeight={256} imgWidth={512} className="h-sz-256 object-contain" />

                <Button className="bottom-lg right-lg absolute">Read article</Button>
              </Carousel.Slide>
            )
          })}
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

export const Controlled: StoryFn = _args => {
  type ProductsData = {
    name: string
    description: string
    image: string
  }[]

  const [activePage, setActivePage] = useState<number>(0)
  const [productsData] = useState<ProductsData>([
    {
      name: 'EcoSoothe Skincare Serum',
      description:
        'A hydrating serum formulated with hyaluronic acid to replenish and rejuvenate the skin, leaving it soft and smooth.',
      image: 'https://picsum.photos/id/45/4592/2576',
    },
    {
      name: 'QuantumFlex Yoga Mat',
      description:
        'A non-slip, eco-friendly yoga mat providing optimal cushioning and support for all your yoga and fitness routines.',
      image: 'https://picsum.photos/id/46/3264/2448',
    },
    {
      name: 'LumaGlow LED Desk Lamp',
      description:
        'An adjustable LED desk lamp with multiple brightness levels and color temperatures, perfect for reading and working.',
      image: 'https://picsum.photos/id/47/4272/2848',
    },
    {
      name: 'AquaPulse Water Bottle',
      description:
        'A durable, BPA-free water bottle with a built-in filter, ensuring fresh and clean hydration on the go.',
      image: 'https://picsum.photos/id/48/5000/3333',
    },
    {
      name: 'ZenithWave Bluetooth Speaker',
      description:
        'A portable Bluetooth speaker delivering high-quality sound with a sleek, modern design.',
      image: 'https://picsum.photos/id/49/1280/792',
    },
  ])

  const handlePageChange = (page: number) => {
    console.log('onPageChange: ', page)
    setActivePage(page)
  }

  return (
    <div className="gap-md flex">
      <ul className="h-sz-256 w-sz-80 gap-sm grid grid-rows-5">
        {productsData.map((product, i) => {
          return (
            <li key={product.name} className="min-w-sz-56 flex-1">
              <button
                type="button"
                aria-label={product.name}
                onClick={() => setActivePage(+i)}
                className={cx(
                  'bg-neutral-container box-border size-full overflow-hidden rounded-sm transition-opacity duration-250',
                  'hover:opacity-none',
                  'focus-visible:u-outline',
                  i === activePage ? 'cursor-default' : 'opacity-dim-3'
                )}
              >
                <img
                  className="size-full object-cover"
                  width="100%"
                  height="100%"
                  src={product.image}
                  alt={product.description}
                />
              </button>
            </li>
          )
        })}
      </ul>

      <Carousel page={activePage} onPageChange={handlePageChange} className="w-sz-448">
        <Carousel.Viewport>
          <Carousel.Slides>
            {productsData.map(product => {
              return (
                <Carousel.Slide
                  key={product.name}
                  aria-label={product.name}
                  className="flex items-center"
                >
                  <img
                    className="h-sz-256 object-cover"
                    width="100%"
                    height="100%"
                    src={product.image}
                    alt={product.description}
                  />

                  <p className="bg-overlay/dim-1 p-md text-body-1 text-on-overlay absolute top-0 w-full font-bold">
                    {product.name}
                  </p>
                  <Button asChild>
                    <a href="#" className="bottom-lg right-lg absolute">
                      See article
                    </a>
                  </Button>
                </Carousel.Slide>
              )
            })}
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

export const Gap: StoryFn = _args => {
  const [gap, setGap] = useState<number>(16)

  return (
    <div className="gap-xl flex flex-col">
      <div className="gap-md grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        <FormField name="carousel-gap" className="max-w-sz-192">
          <FormField.Label>Gap</FormField.Label>

          <Stepper
            aria-label="Stepper with min/max values"
            step={8}
            maxValue={64}
            minValue={0}
            value={gap}
            onValueChange={setGap}
          >
            <Stepper.DecrementButton aria-label="Decrement" />
            <Stepper.Input />
            <Stepper.IncrementButton aria-label="Increment" />
          </Stepper>
        </FormField>
      </div>

      <Carousel gap={gap} slidesPerPage={3}>
        <Carousel.Viewport>
          <Carousel.Slides>
            {Array.from({ length: 11 }).map((_, i) => (
              <Carousel.Slide key={i} aria-label={`Slide ${i}`} className="flex items-center">
                <RandomImage imgHeight={600} imgWidth={600} className="h-sz-256 object-cover" />

                <Button className="bottom-lg right-lg absolute">Read article</Button>
              </Carousel.Slide>
            ))}
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

export const DefaultPage: StoryFn = _args => {
  return (
    <Carousel defaultPage={2}>
      <Carousel.Viewport>
        <Carousel.Slides>
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <Carousel.Slide key={i} aria-label={`Slide ${i}`} className="flex items-center">
                <RandomImage imgHeight={256} imgWidth={256} className="h-sz-256 object-contain" />

                <Button className="bottom-lg right-lg absolute">Read article</Button>
              </Carousel.Slide>
            )
          })}
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

export const Loop: StoryFn = _args => {
  return (
    <Carousel loop>
      <Carousel.Viewport>
        <Carousel.Slides>
          {Array.from({ length: 3 }).map((_, i) => {
            return (
              <Carousel.Slide key={i} aria-label={`Slide ${i}`} className="flex items-center">
                <RandomImage imgHeight={256} imgWidth={256} className="h-sz-256 object-contain" />

                <Button className="bottom-lg right-lg absolute">Read article</Button>
              </Carousel.Slide>
            )
          })}
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

export const ScrollBehavior: StoryFn = _args => {
  const [snapType, setSnapType] = useState<'mandatory' | 'proximity'>('mandatory')

  const [snapStop, setSnapStop] = useState<'normal' | 'always'>('always')

  const [scrollBehavior, setScrollBehavior] = useState<'smooth' | 'instant'>('smooth')

  const handleSnapTypeChange = (value: string) => setSnapType(value as typeof snapType)

  const handleSnapStopChange = (value: string) => setSnapStop(value as typeof snapStop)

  const handleScrollBehaviorChange = (value: string) =>
    setScrollBehavior(value as typeof scrollBehavior)

  return (
    <div className="gap-xl flex flex-col">
      <div className="gap-md grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        <FormField name="snapType">
          <FormField.Label>Snap type</FormField.Label>

          <Select value={snapType} onValueChange={handleSnapTypeChange}>
            <Select.Trigger aria-label="Snap type">
              <Select.Value placeholder="Pick a snap type" />
            </Select.Trigger>

            <Select.Items>
              <Select.Item value="mandatory">Mandatory</Select.Item>
              <Select.Item value="proximity">Proximity</Select.Item>
            </Select.Items>
          </Select>
        </FormField>

        <FormField name="snapStop">
          <FormField.Label>Snap stop</FormField.Label>
          <Select value={snapStop} onValueChange={handleSnapStopChange}>
            <Select.Trigger aria-label="Snap stop">
              <Select.Value placeholder="Pick a snap stop" />
            </Select.Trigger>

            <Select.Items>
              <Select.Item value="normal">Normal</Select.Item>
              <Select.Item value="always">Always</Select.Item>
            </Select.Items>
          </Select>
        </FormField>

        <FormField name="scrollBehavior">
          <FormField.Label>Scroll behavior</FormField.Label>
          <Select value={scrollBehavior} onValueChange={handleScrollBehaviorChange}>
            <Select.Trigger aria-label="Carousel scroll behavior">
              <Select.Value placeholder="Pick a scroll behavior" />
            </Select.Trigger>

            <Select.Items>
              <Select.Item value="instant">Instant</Select.Item>
              <Select.Item value="smooth">Smooth</Select.Item>
            </Select.Items>
          </Select>
        </FormField>
      </div>

      <Carousel
        snapType={snapType}
        snapStop={snapStop}
        scrollBehavior={scrollBehavior}
        slidesPerPage={2}
        loop={false}
      >
        <Carousel.Viewport>
          <Carousel.Slides>
            {Array.from({ length: 11 }).map((_, i) => (
              <Carousel.Slide key={i} aria-label={`Slide ${i}`} className="flex items-center">
                <RandomImage imgHeight={600} imgWidth={600} className="h-sz-256 object-cover" />

                <Button className="bottom-lg right-lg absolute">Read article</Button>
              </Carousel.Slide>
            ))}
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

export const SlidesPerPage: StoryFn = _args => {
  const [slidesPerPage, setSlidesPerPage] = useState<number>(3)

  return (
    <div className="gap-xl flex flex-col">
      <div className="gap-md grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        <fieldset>
          <legend>Slides per page: {slidesPerPage}</legend>

          <Slider
            value={[slidesPerPage]}
            name="items-per-page"
            min={1}
            max={5}
            onValueChange={([value]) => {
              if (value) {
                setSlidesPerPage(value)
              }
            }}
          >
            <Slider.Track />
            <Slider.Thumb aria-label="Slides per page" />
          </Slider>
        </fieldset>
      </div>

      <Carousel slidesPerPage={slidesPerPage}>
        <Carousel.Viewport>
          <Carousel.Slides>
            {Array.from({ length: 11 }).map((_, i) => (
              <Carousel.Slide key={i} aria-label={`Slide ${i}`} className="flex items-center">
                <RandomImage imgHeight={600} imgWidth={600} className="h-sz-256 object-cover" />

                <Button className="bottom-lg right-lg absolute">Read article</Button>
              </Carousel.Slide>
            ))}
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

export const SlidesPerMove: StoryFn = _args => {
  return (
    <div className="gap-xl flex flex-col">
      <Carousel slidesPerPage={3} slidesPerMove={1}>
        <Carousel.Viewport>
          <Carousel.Slides>
            {Array.from({ length: 11 }).map((_, i) => (
              <Carousel.Slide key={i} aria-label={`Slide ${i}`} className="flex items-center">
                <RandomImage imgHeight={600} imgWidth={600} className="h-sz-256 object-cover" />

                <Button className="bottom-lg right-lg absolute">Read article</Button>
              </Carousel.Slide>
            ))}
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

export const CustomPageIndicators: StoryFn = () => {
  type ProductsData = {
    name: string
    description: string
    image: string
  }[]

  const [productsData] = useState<ProductsData>([
    {
      name: 'EcoSoothe Skincare Serum',
      description:
        'A hydrating serum formulated with hyaluronic acid to replenish and rejuvenate the skin, leaving it soft and smooth.',
      image: 'https://picsum.photos/id/45/4592/2576',
    },
    {
      name: 'QuantumFlex Yoga Mat',
      description:
        'A non-slip, eco-friendly yoga mat providing optimal cushioning and support for all your yoga and fitness routines.',
      image: 'https://picsum.photos/id/46/3264/2448',
    },
    {
      name: 'LumaGlow LED Desk Lamp',
      description:
        'An adjustable LED desk lamp with multiple brightness levels and color temperatures, perfect for reading and working.',
      image: 'https://picsum.photos/id/47/4272/2848',
    },
    {
      name: 'AquaPulse Water Bottle',
      description:
        'A durable, BPA-free water bottle with a built-in filter, ensuring fresh and clean hydration on the go.',
      image: 'https://picsum.photos/id/48/5000/3333',
    },
    {
      name: 'ZenithWave Bluetooth Speaker',
      description:
        'A portable Bluetooth speaker delivering high-quality sound with a sleek, modern design.',
      image: 'https://picsum.photos/id/49/1280/792',
    },
  ])

  return (
    <div className="gap-md flex">
      <Carousel className="w-sz-448" loop>
        <Carousel.Viewport>
          <Carousel.Slides>
            {productsData.map(product => {
              return (
                <Carousel.Slide
                  key={product.name}
                  aria-label={product.name}
                  className="flex items-center"
                >
                  <img
                    className="h-sz-256 object-cover"
                    width="100%"
                    height="100%"
                    src={product.image}
                    alt={product.description}
                  />

                  <p className="bg-overlay/dim-1 p-md text-body-1 text-on-overlay absolute top-0 w-full font-bold">
                    {product.name}
                  </p>
                  <Button asChild>
                    <a href="#" className="bottom-lg right-lg absolute">
                      See article
                    </a>
                  </Button>
                </Carousel.Slide>
              )
            })}
          </Carousel.Slides>
          <Carousel.Controls>
            <Carousel.PrevButton aria-label="Previous group of items" />
            <Carousel.NextButton aria-label="Next group of items" />
          </Carousel.Controls>
        </Carousel.Viewport>

        <Carousel.PagePicker className="gap-md">
          {({ pages }) =>
            pages.map(page => {
              const product = productsData[page]

              if (!product) return null

              return (
                <Carousel.PageIndicator
                  key={page}
                  index={page}
                  aria-label={`Go to page ${page + 1}`}
                  unstyled
                  className={cx(
                    'flex-1 list-none',
                    'bg-neutral-container size-full overflow-hidden rounded-sm transition-all duration-250',
                    'hover:opacity-none focus-visible:u-outline',
                    'data-[state=active]:cursor-default data-[state=active]:shadow-md',
                    'data-[state=inactive]:opacity-dim-3 data-[state=inactive]:cursor-pointer'
                  )}
                >
                  <img
                    className="size-full object-cover"
                    width="100%"
                    height="100%"
                    src={product.image}
                    alt={product.description}
                  />
                </Carousel.PageIndicator>
              )
            })
          }
        </Carousel.PagePicker>
      </Carousel>
    </div>
  )
}
