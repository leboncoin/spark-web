import { createContext, useContext } from 'react'

import { MeterIndicatorStylesProps } from '../meter/MeterTrack.styles'
import { CircularMeterSize } from './CircularMeter'

export interface CircularMeterContextValue {
  value: number
  max: number
  min: number
  intent: MeterIndicatorStylesProps['intent']
  onLabelId: (id?: string) => void
  /**
   * Size variant of the circular meter.
   */
  sizeProp: CircularMeterSize
  /**
   * Orientation of the circular meter.
   */
  orientation: 'vertical' | 'horizontal'
  /**
   * Diameter of the SVG circle in pixels.
   */
  size: number
  /**
   * Radius of the SVG circle in pixels.
   */
  radius: number
  /**
   * Circumference of the SVG circle in pixels.
   */
  circumference: number
  /**
   * Stroke width of the SVG circle in pixels.
   */
  strokeWidth: number
}

export const CircularMeterContext = createContext<CircularMeterContextValue | null>(null)

export const ID_PREFIX = ':circular-meter'

export const useCircularMeter = () => {
  const context = useContext(CircularMeterContext)

  if (!context) {
    throw new Error('useCircularMeter must be used within a CircularMeter provider')
  }

  return context
}
