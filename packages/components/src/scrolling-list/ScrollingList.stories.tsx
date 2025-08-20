/* eslint-disable max-lines */
import { Button } from '@spark-ui/components/button'
import { FormField } from '@spark-ui/components/form-field'
import { Icon } from '@spark-ui/components/icon'
import { IconButton } from '@spark-ui/components/icon-button'
import { Select } from '@spark-ui/components/select'
import { Stepper } from '@spark-ui/components/stepper'
import { Close } from '@spark-ui/icons/Close'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { ScrollingList } from '.'

const meta: Meta<typeof ScrollingList> = {
  title: 'Components/ScrollingList',
  component: ScrollingList,
}

export default meta

const products = [
  {
    name: 'EcoSoothe Skincare Serum',
    description:
      'A hydrating serum formulated with hyaluronic acid to replenish and rejuvenate the skin, leaving it soft and smooth.',
    image: 'https://example.com/images/ecoSootheSerum.jpg',
  },
  {
    name: 'QuantumFlex Yoga Mat',
    description:
      'A non-slip, eco-friendly yoga mat providing optimal cushioning and support for all your yoga and fitness routines.',
    image: 'https://example.com/images/quantumFlexMat.jpg',
  },
  {
    name: 'LumaGlow LED Desk Lamp',
    description:
      'An adjustable LED desk lamp with multiple brightness levels and color temperatures, perfect for reading and working.',
    image: 'https://example.com/images/lumaGlowLamp.jpg',
  },
  {
    name: 'AquaPulse Water Bottle',
    description:
      'A durable, BPA-free water bottle with a built-in filter, ensuring fresh and clean hydration on the go.',
    image: 'https://example.com/images/aquaPulseBottle.jpg',
  },
  {
    name: 'ZenithWave Bluetooth Speaker',
    description:
      'A portable Bluetooth speaker delivering high-quality sound with a sleek, modern design.',
    image: 'https://example.com/images/zenithWaveSpeaker.jpg',
  },
  {
    name: 'VivaCore Resistance Bands',
    description:
      'A set of premium resistance bands suitable for strength training, rehabilitation, and flexibility exercises.',
    image: 'https://example.com/images/vivaCoreBands.jpg',
  },
  {
    name: 'NovaSphere Smartwatch',
    description:
      'A stylish smartwatch offering fitness tracking, notifications, and customizable watch faces.',
    image: 'https://example.com/images/novaSphereWatch.jpg',
  },
  {
    name: 'PureEssence Essential Oils',
    description:
      'A collection of 100% pure essential oils for aromatherapy, relaxation, and wellness.',
    image: 'https://example.com/images/pureEssenceOils.jpg',
  },
  {
    name: 'OptiMax Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation and long battery life.',
    image: 'https://example.com/images/optiMaxEarbuds.jpg',
  },
  {
    name: 'FusionXcel Fitness Tracker',
    description:
      'A comprehensive fitness tracker monitoring steps, heart rate, and sleep patterns.',
    image: 'https://example.com/images/fusionXcelTracker.jpg',
  },
  {
    name: 'SereniTech White Noise Machine',
    description: 'A white noise machine with multiple sound options to aid sleep and relaxation.',
    image: 'https://example.com/images/sereniTechMachine.jpg',
  },
]

export const Default: StoryFn = () => {
  return (
    <div>
      <h3 id="popular-products-list" className="text-headline-1 mb-md">
        Popular products
      </h3>
      <ScrollingList>
        <ScrollingList.SkipButton aria-describedby="popular-products-list">
          Ignore the list
        </ScrollingList.SkipButton>

        <ScrollingList.Items aria-labelledby="popular-products-list">
          {products.map((product, index) => {
            return (
              <ScrollingList.Item
                key={product.name}
                className="gap-xl max-w-sz-256 bg-main-container text-on-main-container p-lg flex flex-col justify-between rounded-xl"
              >
                <div>
                  <p className="text-headline-2" id={`product-${index}-title`}>
                    {product.name}
                  </p>
                  <hr className="my-lg border-outline" />
                  <p>{product.description}</p>
                </div>

                <Button aria-describedby={`product-${index}-title`}>Learn more</Button>
              </ScrollingList.Item>
            )
          })}
        </ScrollingList.Items>
        <ScrollingList.Controls>
          <ScrollingList.PrevButton
            aria-label="Previous items"
            aria-describedby="popular-products-list"
          />
          <ScrollingList.NextButton
            aria-label="Next items"
            aria-describedby="popular-products-list"
          />
        </ScrollingList.Controls>
      </ScrollingList>
    </div>
  )
}

export const ControlsVisibility: StoryFn = _args => {
  return (
    <ScrollingList>
      <ScrollingList.SkipButton>Ignore the list</ScrollingList.SkipButton>

      <ScrollingList.Items>
        {products.map(product => {
          return (
            <ScrollingList.Item
              key={product.name}
              className="gap-xl max-w-sz-256 bg-main-container text-on-main-container p-lg flex flex-col justify-between rounded-xl"
            >
              <div>
                <p className="text-headline-2">{product.name}</p>
                <hr className="my-lg border-outline" />
                <p>{product.description}</p>
              </div>

              <Button>Learn more</Button>
            </ScrollingList.Item>
          )
        })}
      </ScrollingList.Items>
      <ScrollingList.Controls visibility="hover">
        <ScrollingList.PrevButton aria-label="Previous items" />
        <ScrollingList.NextButton aria-label="Next items" />
      </ScrollingList.Controls>
    </ScrollingList>
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

      <ScrollingList gap={gap}>
        <ScrollingList.SkipButton>Ignore the list</ScrollingList.SkipButton>
        <ScrollingList.Items>
          {products.map(product => {
            return (
              <ScrollingList.Item
                key={product.name}
                className="max-w-sz-256 gap-xl bg-main-container text-on-main-container p-lg flex flex-col justify-between rounded-md"
              >
                <div>
                  <p className="text-headline-2">{product.name}</p>
                  <hr className="my-lg border-outline" />
                  <p>{product.description}</p>
                </div>

                <Button>Learn more</Button>
              </ScrollingList.Item>
            )
          })}
        </ScrollingList.Items>
        <ScrollingList.Controls>
          <ScrollingList.PrevButton aria-label="Previous items" />
          <ScrollingList.NextButton aria-label="Next items" />
        </ScrollingList.Controls>
      </ScrollingList>
    </div>
  )
}

export const Fade: StoryFn = _args => {
  return (
    <ScrollingList withFade>
      <ScrollingList.SkipButton>Ignore the list</ScrollingList.SkipButton>

      <ScrollingList.Items>
        {products.map(product => {
          return (
            <ScrollingList.Item
              key={product.name}
              className="gap-xl max-w-sz-256 bg-main-container text-on-main-container p-lg flex flex-col justify-between rounded-xl"
            >
              <div>
                <p className="text-headline-2">{product.name}</p>
                <hr className="my-lg border-outline" />
                <p>{product.description}</p>
              </div>

              <Button>Learn more</Button>
            </ScrollingList.Item>
          )
        })}
      </ScrollingList.Items>
      <ScrollingList.Controls>
        <ScrollingList.PrevButton aria-label="Previous items" />
        <ScrollingList.NextButton aria-label="Next items" />
      </ScrollingList.Controls>
    </ScrollingList>
  )
}

export const Loop: StoryFn = _args => {
  return (
    <ScrollingList loop>
      <ScrollingList.SkipButton>Ignore the list</ScrollingList.SkipButton>
      <ScrollingList.Items>
        {products.map(product => {
          return (
            <ScrollingList.Item
              key={product.name}
              className="max-w-sz-256 gap-xl bg-main-container text-on-main-container p-lg flex flex-col justify-between rounded-md"
            >
              <div>
                <p className="text-headline-2">{product.name}</p>
                <hr className="my-lg border-outline" />
                <p>{product.description}</p>
              </div>

              <Button>Learn more</Button>
            </ScrollingList.Item>
          )
        })}
      </ScrollingList.Items>
      <ScrollingList.Controls>
        <ScrollingList.PrevButton aria-label="Previous items" />
        <ScrollingList.NextButton aria-label="Next items" />
      </ScrollingList.Controls>
    </ScrollingList>
  )
}

export const ScrollBehavior: StoryFn = _args => {
  const [snapType, setSnapType] = useState<'mandatory' | 'proximity' | 'none'>('none')

  const [snapStop, setSnapStop] = useState<'normal' | 'always'>('normal')

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
              <Select.Item value="none">None</Select.Item>
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
            <Select.Trigger aria-label="ScrollingList scroll behavior">
              <Select.Value placeholder="Pick a scroll behavior" />
            </Select.Trigger>

            <Select.Items>
              <Select.Item value="instant">Instant</Select.Item>
              <Select.Item value="smooth">Smooth</Select.Item>
            </Select.Items>
          </Select>
        </FormField>
      </div>

      <ScrollingList
        snapType={snapType}
        snapStop={snapStop}
        scrollBehavior={scrollBehavior}
        loop={false}
      >
        <ScrollingList.SkipButton>Ignore the list</ScrollingList.SkipButton>
        <ScrollingList.Items>
          {Array.from({ length: 11 }).map((_, i) => (
            <ScrollingList.Item
              key={i}
              className="bg-main-container text-on-main-container p-lg rounded-md"
            >
              <div>card {i + 1}</div>
              <Button>Learn more</Button>
            </ScrollingList.Item>
          ))}
        </ScrollingList.Items>
        <ScrollingList.Controls>
          <ScrollingList.PrevButton aria-label="Previous items" />
          <ScrollingList.NextButton aria-label="Next items" />
        </ScrollingList.Controls>
      </ScrollingList>
    </div>
  )
}

export const ScrollPadding: StoryFn = _args => {
  const [scrollPadding, setScrollPadding] = useState<number>(44)

  return (
    <div className="gap-xl flex flex-col">
      <div className="gap-md grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        <FormField name="carousel-gap" className="max-w-sz-192">
          <FormField.Label>ScrollPadding</FormField.Label>

          <Stepper
            aria-label="Stepper with min/max values"
            step={4}
            maxValue={44}
            minValue={0}
            value={scrollPadding}
            onValueChange={setScrollPadding}
          >
            <Stepper.DecrementButton aria-label="Decrement" />
            <Stepper.Input />
            <Stepper.IncrementButton aria-label="Increment" />
          </Stepper>
        </FormField>
      </div>

      <ScrollingList scrollPadding={scrollPadding}>
        <ScrollingList.SkipButton>Ignore the list</ScrollingList.SkipButton>
        <ScrollingList.Items>
          {products.map(product => {
            return (
              <ScrollingList.Item
                key={product.name}
                className="max-w-sz-256 gap-xl bg-main-container text-on-main-container p-lg flex flex-col justify-between rounded-md"
              >
                <div>
                  <p className="text-headline-2">{product.name}</p>
                  <hr className="my-lg border-outline" />
                  <p>{product.description}</p>
                </div>

                <Button>Learn more</Button>
              </ScrollingList.Item>
            )
          })}
        </ScrollingList.Items>
        <ScrollingList.Controls>
          <ScrollingList.PrevButton aria-label="Previous items" />
          <ScrollingList.NextButton aria-label="Next items" />
        </ScrollingList.Controls>
      </ScrollingList>
    </div>
  )
}

export const FixedSizeItems: StoryFn = _args => {
  const getRandomWidth = () => {
    return Math.floor(Math.random() * (400 - 100 + 1)) + 100
  }

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9)
  }

  function makeProduct() {
    const id = generateRandomId()

    return { id, name: `Product ${id}`, width: getRandomWidth() }
  }

  const [simpleProducts, setSimpleProducts] = useState(() => {
    return Array.from({ length: 5 }).map(makeProduct)
  })

  const addProduct = () => {
    setSimpleProducts([...simpleProducts, makeProduct()])
  }

  const removeProduct = (id: string) => {
    setSimpleProducts(simpleProducts.filter(product => product.id !== id))
  }

  return (
    <div>
      <h3 id="fixed-size-products-list" className="text-headline-1 mb-md">
        Fixed Size Products
      </h3>
      <ScrollingList>
        <ScrollingList.SkipButton aria-describedby="fixed-size-products-list">
          Ignore the list
        </ScrollingList.SkipButton>

        <ScrollingList.Items aria-labelledby="fixed-size-products-list" className="w-[500px]">
          {simpleProducts.map(product => {
            return (
              <ScrollingList.Item
                key={product.id}
                style={{ width: product.width }}
                className="bg-main-container text-on-main-container p-lg border-outline relative flex h-[200px] items-center justify-center rounded-xl border"
              >
                <p className="text-headline-2 text-center">{product.name}</p>
                <IconButton
                  aria-label="Delete"
                  size="sm"
                  className="top-md right-md absolute"
                  onClick={() => removeProduct(product.id)}
                >
                  <Icon>
                    <Close />
                  </Icon>
                </IconButton>
              </ScrollingList.Item>
            )
          })}
          <ScrollingList.Item
            key="add-product"
            className="flex cursor-pointer items-center justify-center"
            onClick={addProduct}
          >
            <Button>Add a product</Button>
          </ScrollingList.Item>
        </ScrollingList.Items>
        <ScrollingList.Controls>
          <ScrollingList.PrevButton
            aria-label="Previous items"
            aria-describedby="fixed-size-products-list"
          />
          <ScrollingList.NextButton
            aria-label="Next items"
            aria-describedby="fixed-size-products-list"
          />
        </ScrollingList.Controls>
      </ScrollingList>
    </div>
  )
}
