import { type StarValue } from './types'

function getStarValue({ value, index }: { value?: number; index: number }): StarValue {
  if (value === undefined) return 0

  const starPosition = index + 1

  return value >= starPosition ? 1 : 0
}

function splitAt<T>(arr: T[], index: number): [T[], T[]] {
  const prev = arr.slice(0, index)
  const next = arr.slice(index)

  return [prev, next]
}

export { getStarValue, splitAt }
