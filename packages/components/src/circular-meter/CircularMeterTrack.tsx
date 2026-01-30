import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cva, cx } from 'class-variance-authority'
import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react'

import { useCircularMeter } from './CircularMeterContext'
import { useIntersectionAnimation } from './useIntersectionAnimation'

const CircularMeterTrackContext = createContext<boolean>(false)

export const useCircularMeterTrack = () => {
  return useContext(CircularMeterTrackContext)
}

export type CircularMeterTrackProps = Omit<ComponentProps<typeof BaseMeter.Track>, 'render'> &
  PropsWithChildren

const circularMeterTrackStyles = cva([], {
  variants: {
    intent: {
      main: ['text-main/dim-4'],
      support: ['text-support/dim-4'],
      success: ['text-success/dim-4'],
      alert: ['text-alert/dim-4'],
      danger: ['text-error/dim-4'],
      info: ['text-info/dim-4'],
    },
  },
})

const circularMeterIndicatorStyles = cva([], {
  variants: {
    intent: {
      main: ['text-main'],
      support: ['text-support'],
      success: ['text-success'],
      alert: ['text-alert'],
      danger: ['text-error'],
      info: ['text-info'],
    },
  },
})

export const CircularMeterTrack = ({ className, children, ...others }: CircularMeterTrackProps) => {
  const { value, max, min, intent, size, radius, circumference, strokeWidth } = useCircularMeter()
  const percentage = ((value - min) / (max - min)) * 100
  const offset = circumference - (percentage / 100) * circumference

  const intentClasses = circularMeterIndicatorStyles({ intent })
  const svgRef = useRef<SVGSVGElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Trigger animation when component enters viewport
  useIntersectionAnimation(svgRef, () => {
    setHasAnimated(true)
  })

  return (
    <BaseMeter.Track data-spark-component="circular-meter-track" className={className} {...others}>
      <CircularMeterTrackContext.Provider value={true}>
        <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className={circularMeterTrackStyles({ intent })}
            />
            <circle
              data-spark-component="circular-meter-indicator"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className={cx(
                intentClasses,
                'ease-standard transition-[stroke-dashoffset] duration-700',
                'motion-reduce:transition-none'
              )}
              style={
                {
                  strokeDasharray: circumference,
                  // Start at circumference (0% filled) for initial animation, then use offset for subsequent changes
                  strokeDashoffset: hasAnimated ? offset : circumference,
                } as React.CSSProperties
              }
            />
          </g>
          {children && (
            <foreignObject x={8} y={8} width={size - 16} height={size - 16}>
              <div
                className="p-md flex h-full w-full flex-col items-center justify-center rounded-full text-center"
                style={{ width: size - 16, height: size - 16 }}
              >
                {children}
              </div>
            </foreignObject>
          )}
        </svg>
      </CircularMeterTrackContext.Provider>
    </BaseMeter.Track>
  )
}

CircularMeterTrack.displayName = 'CircularMeter.Track'
