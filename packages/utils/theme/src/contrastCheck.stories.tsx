import { Icon } from '@spark-ui/components/icon'
import { Tag } from '@spark-ui/components/tag'
import { Block } from '@spark-ui/icons/Block'
import { Check } from '@spark-ui/icons/Check'
import { Meta, StoryFn } from '@storybook/react-vite'
import { cx } from 'class-variance-authority'
import { ReactNode, useEffect, useRef, useState } from 'react'

import { ColorReport, getSmallAndLargeCompliance, getThemeContrastReport } from './contrastCheck'

const meta: Meta = {
  title: 'Utils/theme-utils/contrast check',
}

export default meta

const ScoreTag = ({ score }: { score: string }) => {
  const isSuccess = score.includes('AA')

  return (
    <Tag design="filled" intent={isSuccess ? 'success' : 'danger'}>
      {score}
      <Icon>{isSuccess ? <Check /> : <Block />}</Icon>
    </Tag>
  )
}

const ColorContrastCell = ({ className, ...rest }: { className?: string }) => {
  const cellRef = useRef<HTMLTableCellElement>(null)
  const [colorReport, setColorReport] = useState<ColorReport | null>(null)

  useEffect(() => {
    if (cellRef.current) {
      const computedStyle = window.getComputedStyle(cellRef.current)
      const backgroundColor = computedStyle.backgroundColor || 'rgb(0, 0, 0)'
      const textColor = computedStyle.color || 'rgb(0, 0, 0)'

      // Convert RGB to HEX
      const rgbToHex = (rgb: string): string => {
        const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/) as unknown as [
          string,
          string,
          string,
          string,
        ]

        if (!match) return '#000000'

        const r = parseInt(match[1], 10)
        const g = parseInt(match[2], 10)
        const b = parseInt(match[3], 10)

        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
      }

      const bgHex = rgbToHex(backgroundColor)
      const textHex = rgbToHex(textColor)

      const report = getSmallAndLargeCompliance(bgHex, textHex)

      setColorReport(report)

      console.log('Contrast compliance:', report)
    }
  }, [className])

  return (
    <td ref={cellRef} className={cx('border-sm border-outline p-md', className)} {...rest}>
      {/* <p>Foreground: {colorReport?.small.colors[0]}</p>
      <p>Background: {colorReport?.small.colors[1]}</p> */}
      <p>Ratio: {colorReport?.small.contrastRatio}</p>
      <p>
        Small: <ScoreTag score={colorReport?.small.score || ''} />
      </p>
      <p>
        Large: <ScoreTag score={colorReport?.large.score || ''} />
      </p>
    </td>
  )
}

const Cell = ({ className, children, ...rest }: { className?: string; children: ReactNode }) => {
  return (
    <td className={cx('border-sm border-outline p-md', className)} {...rest}>
      {children}
    </td>
  )
}

const ThemeReport = ({ ...rest }) => {
  const report = getThemeContrastReport()

  return (
    <table className="bg-surface text-on-surface table-auto" {...rest}>
      <thead className="sticky">
        <tr>
          <th className="p-sm text-left">Color</th>
          <th className="p-sm text-left">Light</th>
          <th className="p-sm text-left">Light (more contrast)</th>
          <th className="p-sm text-left">Dark</th>
          <th className="p-sm text-left">Dark (more contrast)</th>
          {/* <th className="p-sm text-left">Ratio</th>
          <th className="p-sm text-left">Score (small text)</th>
          <th className="p-sm text-left">Score (large text)</th> */}
        </tr>
      </thead>
      <tbody>
        {Object.entries(report).map(([color, styles]) => {
          return (
            <tr>
              <Cell>{color}</Cell>
              <ColorContrastCell
                data-theme="light"
                className={cx('px-lg border-current', styles)}
              />
              <ColorContrastCell
                data-theme="light-more-contrast"
                className={cx('px-lg border-current', styles)}
              />
              <ColorContrastCell data-theme="dark" className={cx('px-lg border-current', styles)} />
              <ColorContrastCell
                data-theme="dark-more-contrast"
                className={cx('px-lg border-current', styles)}
              />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export const Default: StoryFn = _args => (
  <div className="flex">
    <ThemeReport />
  </div>
)
