import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockResizeObserver } from 'jsdom-testing-mocks'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { FormField } from '../form-field'
import { Slider } from '.'

describe('Slider', () => {
  beforeAll(() => {
    /**
     * Resize Observer needs to be mocked here, due to use of it
     * within Radix bas component.
     * cf. https://github.com/radix-ui/primitives/blob/28bebf2c6992d056244845c898abeff45dec2871/packages/react/slider/src/Slider.tsx#L9C10-L9C17
     */
    mockResizeObserver()

    Object.defineProperty(HTMLSpanElement.prototype, 'setPointerCapture', {
      value: vi.fn(),
    })
  })

  beforeEach(() => vi.clearAllMocks())

  it('should render correctly with accessible roles', () => {
    const { container } = render(
      <Slider defaultValue={[25, 65]}>
        <Slider.Track />
        <Slider.Thumb />
        <Slider.Thumb />
      </Slider>
    )

    expect(container.firstChild).toHaveAttribute('data-spark-component', 'slider')
    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })

  it('should increase or decrease by step value', async () => {
    const user = userEvent.setup()

    render(
      <Slider defaultValue={[25]} step={5}>
        <Slider.Track />
        <Slider.Thumb />
      </Slider>
    )

    const thumb = screen.getByRole('slider')

    thumb.focus()

    await user.keyboard('{ArrowRight}')
    expect(thumb).toHaveAttribute('aria-valuenow', '30')

    await user.keyboard('{ArrowLeft>2/}')
    expect(thumb).toHaveAttribute('aria-valuenow', '20')
  })

  it('should handle callback on value change', async () => {
    const user = userEvent.setup()

    const change = vi.fn()
    const commit = vi.fn()

    render(
      <form>
        <Slider
          name="form-slider"
          defaultValue={[25]}
          step={1}
          onValueChange={change}
          onValueCommit={commit}
        >
          <Slider.Track />
          <Slider.Thumb />
        </Slider>
      </form>
    )

    const thumb = screen.getByRole('slider')
    thumb.focus()

    await user.keyboard('{ArrowRight>7/}')

    expect(change).toHaveBeenCalledTimes(7)
    expect(thumb).toHaveAttribute('aria-valuenow', '32')

    /**
     * Due to JSDOM limitations (no layout), the onValueCommit prop and behaviour
     * cannot be completely tested. At least we ensure the callback is properly called, but for
     * more accuracy we'll need to add some integration tests (Cypress...).
     */
    expect(commit).toHaveBeenCalledWith([32])
  })

  it('should set data attribute based on event type', async () => {
    const user = userEvent.setup()

    render(
      <form>
        <Slider name="form-slider" defaultValue={[25]}>
          <Slider.Track />
          <Slider.Thumb />
        </Slider>
      </form>
    )

    const thumb = screen.getByRole('slider')

    await user.pointer({ keys: '[TouchA>]', target: thumb })
    expect(thumb).toHaveAttribute('data-interaction', 'pointerdown')

    await user.keyboard('{ArrowRight>}')
    expect(thumb).toHaveAttribute('data-interaction', 'keydown')

    thumb.blur()
    expect(thumb).toHaveAttribute('data-interaction', 'blur')
  })

  describe('statuses (combined with FormField)', () => {
    it('should render error message when field is in error', () => {
      render(
        <FormField state="error">
          <FormField.Label>Volume</FormField.Label>
          <Slider defaultValue={[50]}>
            <Slider.Track />
            <Slider.Thumb />
          </Slider>
          <FormField.ErrorMessage>Volume must be between 30 and 70</FormField.ErrorMessage>
        </FormField>
      )

      const slider = screen.getByRole('slider', { name: 'Volume' })
      expect(slider).toBeInTheDocument()
      expect(screen.getByText('Volume must be between 30 and 70')).toBeInTheDocument()
    })

    it('should apply state as intent to slider', () => {
      render(
        <FormField state="error">
          <FormField.Label>Volume</FormField.Label>
          <Slider defaultValue={[50]}>
            <Slider.Track />
            <Slider.Thumb />
          </Slider>
        </FormField>
      )

      const slider = screen.getByRole('slider')
      expect(slider).toHaveClass('bg-error')
    })
  })

  describe('usage with FormField', () => {
    it('should associate label with slider element correctly via aria-labelledby', () => {
      render(
        <FormField>
          <FormField.Label>Volume</FormField.Label>
          <Slider defaultValue={[50]}>
            <Slider.Track />
            <Slider.Thumb />
          </Slider>
        </FormField>
      )

      const slider = screen.getByRole('slider', { name: 'Volume' })
      expect(slider).toBeInTheDocument()
      expect(slider).toHaveAttribute('aria-labelledby')
    })

    it('should inherit disabled state from FormField', () => {
      render(
        <FormField disabled>
          <FormField.Label>Volume</FormField.Label>
          <Slider defaultValue={[50]}>
            <Slider.Track />
            <Slider.Thumb />
          </Slider>
        </FormField>
      )

      const sliderRoot = screen
        .getByRole('slider', { name: 'Volume' })
        .closest('[data-spark-component="slider"]')
      expect(sliderRoot).toHaveAttribute('aria-disabled', 'true')
    })

    it('should inherit name from FormField', () => {
      render(
        <form>
          <FormField name="volume">
            <FormField.Label>Volume</FormField.Label>
            <Slider defaultValue={[50]}>
              <Slider.Track />
              <Slider.Thumb />
            </Slider>
          </FormField>
        </form>
      )

      const hiddenInput = screen.getByDisplayValue('50')
      expect(hiddenInput).toHaveAttribute('name', 'volume')
    })
  })
})
