import { Button } from '@spark-ui/components/button'
import { ScrollingList } from '@spark-ui/components/scrolling-list'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

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
]

const DefaultScrollingList = () => {
  return (
    <div className="w-[500px]">
      <h3 id="popular-products-list" className="text-headline-1 mb-md">
        Popular products
      </h3>
      <ScrollingList gap={0} scrollBehavior="instant">
        <ScrollingList.SkipButton aria-describedby="popular-products-list">
          Ignore the list
        </ScrollingList.SkipButton>

        <ScrollingList.Items aria-labelledby="popular-products-list">
          {products.map(product => {
            return (
              <ScrollingList.Item
                key={product.name}
                className="gap-xl bg-main-container text-on-main-conbg-main-container p-lg flex w-[200px] flex-col justify-between rounded-xl"
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

const LoopScrollingList = () => {
  return (
    <div className="w-[500px]">
      <h3 id="popular-products-list" className="text-headline-1 mb-md">
        Popular products
      </h3>
      <ScrollingList gap={0} scrollBehavior="instant" loop>
        <ScrollingList.SkipButton aria-describedby="popular-products-list">
          Ignore the list
        </ScrollingList.SkipButton>

        <ScrollingList.Items aria-labelledby="popular-products-list">
          {products.map(product => {
            return (
              <ScrollingList.Item
                key={product.name}
                className="gap-xl bg-main-container text-on-main-conbg-main-container p-lg flex w-[200px] flex-col justify-between rounded-xl"
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

const SinglePageScrollingList = () => {
  return (
    <div className="w-[500px]">
      <h3 id="popular-products-list" className="text-headline-1 mb-md">
        Popular products
      </h3>
      <ScrollingList gap={0} scrollBehavior="instant" loop>
        <ScrollingList.SkipButton aria-describedby="popular-products-list">
          Ignore the list
        </ScrollingList.SkipButton>

        <ScrollingList.Items aria-labelledby="popular-products-list">
          {products.slice(0, 2).map(product => {
            return (
              <ScrollingList.Item
                key={product.name}
                className="gap-xl bg-main-container text-on-main-conbg-main-container p-lg flex w-[200px] flex-col justify-between rounded-xl"
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

export const ScrollingListImplementation = () => {
  const variants = {
    default: DefaultScrollingList,
    loop: LoopScrollingList,
    singlePage: SinglePageScrollingList,
  } as const

  const [searchParams] = useSearchParams()
  const variant = (searchParams.get('variant') ?? 'default') as keyof typeof variants
  const Component = variants[variant]

  return <Component />
}
