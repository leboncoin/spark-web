/* eslint-disable max-lines-per-function */
import * as d3 from 'd3'
import React, { useEffect, useRef, useState } from 'react'

interface EaseCurvePreviewProps {
  bezier: string
  color: string
  width?: number
  height?: number
  animationDuration?: number
  pauseDuration?: number
}

export const EaseCurvePreview: React.FC<EaseCurvePreviewProps> = ({
  bezier,
  color,
  width = 300,
  height = 150,
  animationDuration = 1000,
  pauseDuration = 1000,
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

  // Define margins once to ensure consistency
  const margin = { top: 20, right: 20, bottom: 30, left: 20 }

  useEffect(() => {
    if (!svgRef.current) return

    // Import d3 dynamically

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove() // Clear previous content

    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    // Create the main chart group
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Add background rectangle
    g.append('rect')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('fill', 'var(--color-info-container)')

    // Parse the cubic-bezier values
    const bezierMatch = bezier.match(/cubic-bezier\(([^)]+)\)/)
    if (!bezierMatch) return

    const values = bezierMatch[1]?.split(',').map(v => parseFloat(v.trim()))
    const [x1, y1, x2, y2] = values as [number, number, number, number]

    // For cubic-bezier(x1, y1, x2, y2):
    // - Start point is always (0, 0)
    // - End point is always (1, 1)
    // - Control points are at (x1, y1) and (x2, y2)

    // Create scales
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, chartWidth])

    const yScale = d3.scaleLinear().domain([0, 1]).range([chartHeight, 0])

    // Add axes without ticks and labels
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickFormat(() => '')
    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(0)
      .tickFormat(() => '')

    g.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis)
      .style('font-size', '10px')

    g.append('g').call(yAxis).style('font-size', '10px')

    // Add axis labels
    g.append('text')
      .attr('x', chartWidth - 10)
      .attr('y', chartHeight - 10)
      .attr('text-anchor', 'end')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('fill', '#6b7280')
      .text('Time')

    g.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('text-anchor', 'start')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('fill', '#6b7280')
      .text('X')

    // Draw the cubic-bezier curve
    const line = d3
      .line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))

    // Generate points along the curve using proper cubic-bezier formula
    const curvePoints: [number, number][] = []

    // Special case for linear curve: cubic-bezier(0, 0, 1, 1)
    if (x1 === 0 && y1 === 0 && x2 === 1 && y2 === 1) {
      // Perfect straight line from (0,0) to (1,1)
      for (let t = 0; t <= 1; t += 0.01) {
        curvePoints.push([t, t])
      }
      // Ensure the curve ends exactly at (1,1)
      curvePoints.push([1, 1])
    } else {
      // Regular cubic-bezier calculation
      for (let t = 0; t <= 1; t += 0.01) {
        // For cubic-bezier(x1, y1, x2, y2), the curve goes from (0,0) to (1,1)
        // with control points at (x1, y1) and (x2, y2)
        const x = t // Time goes from 0 to 1
        const y =
          Math.pow(1 - t, 3) * 0 + // Start point (0,0)
          3 * Math.pow(1 - t, 2) * t * y1 + // First control point
          3 * (1 - t) * Math.pow(t, 2) * y2 + // Second control point
          Math.pow(t, 3) * 1 // End point (1,1)
        curvePoints.push([x, y])
      }

      // Ensure the curve ends exactly at (1,1)
      curvePoints.push([1, 1])
    }

    // Draw the curve
    g.append('path')
      .datum(curvePoints)
      .attr('fill', 'none')
      .attr('stroke', '#094171')
      .attr('stroke-width', 3)
      .attr('d', line(curvePoints))

    // Draw control points at (x1, y1) and (x2, y2)

    // Add start and end points at (0,0) and (1,1)
    g.append('circle')
      .attr('cx', xScale(0))
      .attr('cy', yScale(0))
      .attr('r', 4)
      .attr('fill', '#094171')

    g.append('circle')
      .attr('cx', xScale(1))
      .attr('cy', yScale(1))
      .attr('r', 4)
      .attr('fill', '#094171')
  }, [bezier, color, width, height])

  // Animate the dot along the curve
  useEffect(() => {
    let direction = 1 // 1 for forward, -1 for backward
    let isPaused = false
    let pauseTimeout: NodeJS.Timeout | null = null

    const interval = setInterval(() => {
      if (isPaused) return

      setAnimationProgress(prev => {
        const newProgress = prev + 0.01 * direction

        // Change direction when reaching boundaries
        if (newProgress >= 1) {
          direction = -1
          isPaused = true
          // Pause before starting return journey
          pauseTimeout = setTimeout(() => {
            isPaused = false
          }, pauseDuration)

          return 1
        } else if (newProgress <= 0) {
          direction = 1
          isPaused = true
          // Pause before starting forward journey
          pauseTimeout = setTimeout(() => {
            isPaused = false
          }, pauseDuration)

          return 0
        }

        return newProgress
      })
    }, animationDuration / 100)

    return () => {
      clearInterval(interval)
      if (pauseTimeout) clearTimeout(pauseTimeout)
    }
  }, [animationDuration, pauseDuration])

  // Calculate the current position of the animated dot using the same scales as D3
  const getAnimatedDotPosition = () => {
    if (!bezier) return { x: 0, y: 0 }

    const bezierMatch = bezier.match(/cubic-bezier\(([^)]+)\)/)
    if (!bezierMatch) return { x: 0, y: 0 }

    const values = bezierMatch?.[1]?.split(',').map(v => parseFloat(v.trim())) as [
      number,
      number,
      number,
      number,
    ]
    const [x1, y1, x2, y2] = values

    const t = animationProgress

    // Special case for linear curve
    if (x1 === 0 && y1 === 0 && x2 === 1 && y2 === 1) {
      return { x: t, y: t }
    }

    // Regular cubic-bezier calculation
    const x = t
    const y =
      Math.pow(1 - t, 3) * 0 +
      3 * Math.pow(1 - t, 2) * t * y1 +
      3 * (1 - t) * Math.pow(t, 2) * y2 +
      Math.pow(t, 3) * 1

    return { x, y }
  }

  const dotPosition = getAnimatedDotPosition()

  // Calculate pixel positions using the same logic as D3
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const xScale = (value: number) => margin.left + value * chartWidth
  const yScale = (value: number) => margin.top + (1 - value) * chartHeight

  return (
    <div className="relative">
      <svg ref={svgRef} width={width} height={height} className="w-full max-w-[320px]" />

      {/* Animated dot overlay */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: `${xScale(dotPosition.x)}px`,
          top: `${yScale(dotPosition.y)}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="size-lg bg-main z-raised rounded-full shadow-lg" />
      </div>

      {/* Vertical bar behind the second animated dot */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: `${xScale(1) + 15}px`,
          top: `${margin.top}px`,
          width: '16px',
          height: `${chartHeight}px`,
          backgroundColor: 'var(--color-info-container)',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Second animated dot - vertical movement only */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: `${xScale(1) + 15}px`, // Position to the right of the graph
          top: `${yScale(dotPosition.y)}px`, // Same Y position as the main dot
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="size-lg bg-support z-raised rounded-full shadow-lg" />
      </div>

      {/* Dashed line connecting the two dots */}
      <svg
        className="pointer-events-none absolute inset-0"
        width={width}
        height={height}
        style={{ zIndex: 1 }}
      >
        <line
          x1={xScale(1) + 15}
          y1={yScale(dotPosition.y)}
          x2={xScale(dotPosition.x)}
          y2={yScale(dotPosition.y)}
          stroke="#6b7280"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}
