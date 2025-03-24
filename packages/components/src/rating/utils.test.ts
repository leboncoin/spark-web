import { describe, expect, it } from 'vitest'

import { getNearestHalfDecimal, getStarValue, splitAt } from './utils'

describe('getNearestHalfDecimal', () => {
  it.each([
    { value: 0, expected: 0 },
    { value: 0.4, expected: 0.5 },
    { value: 0.49, expected: 0.5 },
    { value: 0.5, expected: 0.5 },
    { value: 0.74, expected: 0.5 },
    { value: 0.75, expected: 1 },
  ])('should return the expected half decimal for: $value', ({ value, expected }) => {
    expect(getNearestHalfDecimal(value)).toEqual(expected)
  })
})

describe('getStarValue', () => {
  it.each([
    { value: 0, index: 0, expected: 0 },

    // Stars with indices less than the value should be filled
    { value: 3, index: 0, expected: 1 },
    { value: 3, index: 1, expected: 1 },
    { value: 3, index: 2, expected: 1 },

    // Stars with indices greater than or equal to the value should be empty
    { value: 3, index: 3, expected: 0 },
    { value: 3, index: 4, expected: 0 },

    // Rounding cases for fractional values
    { value: 0.1, index: 0, expected: 0 },
    { value: 0.24, index: 0, expected: 0 },
    { value: 0.25, index: 0, expected: 0.5 },
    { value: 0.5, index: 0, expected: 0.5 },
    { value: 0.74, index: 0, expected: 0.5 },
    { value: 0.75, index: 0, expected: 1 },
    { value: 0.9, index: 0, expected: 1 },
    { value: 1, index: 0, expected: 1 },

    // Edge cases: When value is undefined
    { value: undefined, index: 4, expected: 0 },

    // Edge cases: When value is out of range (below)
    { value: -1, index: 4, expected: 0 },

    // Edge cases: When value is out of range (above)
    { value: 1000, index: 4, expected: 1 },
  ])('should return the expected star value for: $value', ({ value, index, expected }) => {
    expect(getStarValue({ value, index })).toEqual(expected)
  })
})

describe('splitAt', () => {
  const letters = ['a', 'b', 'c', 'd', 'e']

  it('should split an array at the given index into two parts', () => {
    expect(splitAt(letters, 2)).toStrictEqual([
      ['a', 'b'],
      ['c', 'd', 'e'],
    ])
  })
})
