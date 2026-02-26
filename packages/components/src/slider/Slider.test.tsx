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
     * within Base UI component.
     */
    mockResizeObserver()

    Object.defineProperty(HTMLDivElement.prototype, 'setPointerCapture', {
      value: vi.fn(),
    })
  })

  beforeEach(() => vi.clearAllMocks())

  describe('Basic rendering and interaction', () => {
    it('should render correctly with accessible roles', () => {
      const { container } = render(
        <Slider defaultValue={50}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      expect(container.firstChild).toHaveAttribute('data-spark-component', 'slider')
      expect(screen.getByRole('slider', { hidden: true })).toBeInTheDocument()
    })

    it('should handle keyboard navigation and value changes', async () => {
      const user = userEvent.setup()
      const change = vi.fn()
      const commit = vi.fn()

      render(
        <form>
          <Slider
            name="form-slider"
            defaultValue={25}
            step={5}
            onValueChange={change}
            onValueCommit={commit}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider>
        </form>
      )

      const thumb = screen.getByRole('slider', { hidden: true })
      thumb.focus()

      await user.keyboard('{ArrowRight}')
      expect(thumb).toHaveAttribute('aria-valuenow', '30')
      expect(change).toHaveBeenCalledTimes(1)

      await user.keyboard('{ArrowLeft>2/}')
      expect(thumb).toHaveAttribute('aria-valuenow', '20')
      expect(change).toHaveBeenCalledTimes(3)

      /**
       * Due to JSDOM limitations (no layout), the onValueCommit prop and behaviour
       * cannot be completely tested. At least we ensure the callback is properly called, but for
       * more accuracy we'll need to add some integration tests (Cypress...).
       */
      expect(commit).toHaveBeenCalledWith(20)
    })
  })

  describe('FormField integration', () => {
    it('should inherit FormField properties (name, disabled, label association, error state)', () => {
      render(
        <form>
          <FormField name="volume" disabled state="error">
            <FormField.Label>Volume</FormField.Label>
            <Slider defaultValue={50}>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Indicator />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider.Control>
            </Slider>
            <FormField.ErrorMessage>Volume must be between 30 and 70</FormField.ErrorMessage>
          </FormField>
        </form>
      )

      const label = screen.getByText('Volume')
      const labelId = label.getAttribute('id')
      const slider = screen.getByRole('slider', { hidden: true })
      const sliderRoot = slider.closest('[data-spark-component="slider"]')
      const hiddenInput = screen.getByDisplayValue('50')

      // Label association
      expect(slider).toHaveAttribute('aria-labelledby', labelId)

      // Disabled state
      expect(sliderRoot).toHaveAttribute('aria-disabled', 'true')

      // Name inheritance
      expect(hiddenInput).toHaveAttribute('name', 'volume')

      // Error state
      expect(sliderRoot).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByText('Volume must be between 30 and 70')).toBeInTheDocument()
    })
  })

  describe('Slider.Label', () => {
    it('should render and associate label with slider via aria-labelledby', () => {
      render(
        <Slider defaultValue={50}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      const label = screen.getByText('Volume')
      const slider = screen.getByRole('slider', { hidden: true })
      const labelId = label.getAttribute('id')

      expect(label).toHaveAttribute('data-spark-component', 'slider-label')
      expect(slider).toHaveAttribute('aria-labelledby', labelId)
    })
  })

  describe('Slider.Value', () => {
    it('should render default and custom formatted values', () => {
      const { rerender } = render(
        <Slider defaultValue={50}>
          <Slider.Value />
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      let valueElement = screen.getByText('50')
      expect(valueElement).toBeInTheDocument()
      expect(valueElement).toHaveAttribute('data-spark-component', 'slider-value')

      rerender(
        <Slider defaultValue={50}>
          <Slider.Value>{(_, value) => `${value ?? 0}%`}</Slider.Value>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      valueElement = screen.getByText('50%')
      expect(valueElement).toBeInTheDocument()
    })

    it('should update value when slider changes', async () => {
      const user = userEvent.setup()

      render(
        <Slider defaultValue={25} step={5}>
          <Slider.Value />
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      expect(screen.getByText('25')).toBeInTheDocument()

      const thumb = screen.getByRole('slider', { hidden: true })
      thumb.focus()

      await user.keyboard('{ArrowRight}')
      expect(screen.getByText('30')).toBeInTheDocument()
    })

    it('should render Slider.Value inside Slider.Thumb as popover (position absolute)', () => {
      render(
        <Slider defaultValue={50}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb aria-label="Volume" getAriaValueText={v => `${v}%`}>
                <Slider.Value>{(_, value) => `${value}%`}</Slider.Value>
              </Slider.Thumb>
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      const valueOutput = screen.getByText('50%')
      expect(valueOutput).toHaveAttribute('data-spark-component', 'slider-value')
      expect(valueOutput.closest('[data-spark-component="slider-thumb"]')).toBeInTheDocument()
      expect(valueOutput).toHaveClass('absolute')
    })
  })

  describe('Slider.MinValue and Slider.MaxValue', () => {
    it('should render default values, custom formatters, and respect min/max props', () => {
      const { rerender } = render(
        <Slider defaultValue={50} min={0} max={100}>
          <Slider.MinValue />
          <Slider.MaxValue />
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      // Default values
      let minValue = screen.getByText('0')
      let maxValue = screen.getByText('100')
      expect(minValue).toHaveAttribute('data-spark-component', 'slider-min-value')
      expect(maxValue).toHaveAttribute('data-spark-component', 'slider-max-value')

      // Custom formatters
      rerender(
        <Slider defaultValue={50} min={0} max={100}>
          <Slider.MinValue>{value => `${value}%`}</Slider.MinValue>
          <Slider.MaxValue>{value => `${value}%`}</Slider.MaxValue>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      minValue = screen.getByText('0%')
      maxValue = screen.getByText('100%')
      expect(minValue).toBeInTheDocument()
      expect(maxValue).toBeInTheDocument()

      // Custom min/max props
      rerender(
        <Slider defaultValue={50} min={10} max={200}>
          <Slider.MinValue />
          <Slider.MaxValue />
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('200')).toBeInTheDocument()
    })
  })

  describe('getAriaValueText', () => {
    it('should set and update aria-valuetext on slider input', async () => {
      const user = userEvent.setup()

      render(
        <Slider defaultValue={25} step={5}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb getAriaValueText={value => `${value}%`} />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      )

      const slider = screen.getByRole('slider', { hidden: true })
      expect(slider).toHaveAttribute('aria-valuetext', '25%')

      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(slider).toHaveAttribute('aria-valuetext', '30%')
    })
  })
})
