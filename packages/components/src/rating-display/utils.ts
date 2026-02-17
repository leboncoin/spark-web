import { type StarValue } from './types'

function getNearestHalfDecimal(num: number): number {
  return Math.round(num / 0.5) * 0.5
}

function formatRatingValue(value: number): string {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)
}

function getStarValue({ value, index }: { value?: number; index: number }): StarValue {
  if (value === undefined) return 0

  const starPosition = index + 1
  const formattedValue = getNearestHalfDecimal(value)

  if (Math.ceil(formattedValue) < starPosition) return 0

  return formattedValue >= starPosition ? 1 : 0.5
}

function getSingleStarValue(value?: number): StarValue {
  if (value === undefined) return 0
  if (value < 1) return 0
  if (value < 4) return 0.5
  return 1
}

function splitAt<T>(arr: T[], index: number): [T[], T[]] {
  const prev = arr.slice(0, index)
  const next = arr.slice(index)

  return [prev, next]
}

export { formatRatingValue, getNearestHalfDecimal, getSingleStarValue, getStarValue, splitAt }
