import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../button'
import { ScrollingList } from '.'

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

describe('ScrollingList', () => {
  /**
   * Because JSDOM is not a real DOM, it can't emulate scroll behavior/overflow.
   * For this reason, this component is mostly tested through playwright instead.
   *
   * Things that can't be tested here:
   * - control buttons (hidden because overflowing content can't be detected in JSDOM)
   * - scrolling behavior (snapping, scroll padding, etc.).
   * - loop behavior.
   */
  it('should render component anatomy', () => {
    render(
      <div>
        <h3 id="popular-products">Popular products</h3>
        <ScrollingList>
          <ScrollingList.SkipButton>Ignore the list</ScrollingList.SkipButton>

          <ScrollingList.Items aria-labelledby="popular-products">
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
      </div>
    )

    const scrollingList = screen.getByRole('list', { name: 'Popular products' })

    expect(scrollingList).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ignore the list' })).toBeInTheDocument()
    expect(within(scrollingList).getAllByRole('listitem')).toHaveLength(11)
    expect(within(scrollingList).getAllByRole('button', { name: 'Learn more' })).toHaveLength(11)
  })
})
