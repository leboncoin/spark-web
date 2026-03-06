import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useTablePagination } from './useTablePagination'

const itemsWithId = [
  { id: 'a', name: 'Alpha' },
  { id: 'b', name: 'Beta' },
  { id: 'c', name: 'Charlie' },
  { id: 'd', name: 'Delta' },
  { id: 'e', name: 'Echo' },
  { id: 'f', name: 'Foxtrot' },
]

describe('useTablePagination', () => {
  it('should be defined', () => {
    expect(useTablePagination).toBeDefined()
  })

  it('should return initial page 1, correct pageItems and totals', () => {
    const { result } = renderHook(() => useTablePagination(itemsWithId, { pageSize: 2 }))

    expect(result.current.page).toBe(1)
    expect(result.current.pageItems).toHaveLength(2)
    expect(result.current.pageItems[0]).toEqual({ id: 'a', name: 'Alpha' })
    expect(result.current.pageItems[1]).toEqual({ id: 'b', name: 'Beta' })
    expect(result.current.totalItems).toBe(6)
    expect(result.current.totalPages).toBe(3)
    expect(result.current.selectedKeys.size).toBe(0)
  })

  it('should respect initialPage option', () => {
    const { result } = renderHook(() =>
      useTablePagination(itemsWithId, { pageSize: 2, initialPage: 2 })
    )

    expect(result.current.page).toBe(2)
    expect(result.current.pageItems).toHaveLength(2)
    expect(result.current.pageItems[0]?.id).toBe('c')
    expect(result.current.pageItems[1]?.id).toBe('d')
  })

  it('should update page via setPage', () => {
    const { result } = renderHook(() => useTablePagination(itemsWithId, { pageSize: 2 }))

    act(() => {
      result.current.setPage(3)
    })

    expect(result.current.page).toBe(3)
    expect(result.current.pageItems).toHaveLength(2)
    expect(result.current.pageItems[0]?.id).toBe('e')
    expect(result.current.pageItems[1]?.id).toBe('f')
  })

  it('should update page via onPageChange', () => {
    const { result } = renderHook(() => useTablePagination(itemsWithId, { pageSize: 2 }))

    act(() => {
      result.current.onPageChange({ page: 2 })
    })

    expect(result.current.page).toBe(2)
    expect(result.current.pageItems[0]?.id).toBe('c')
  })

  it('should select items on current page via onSelectionChange (Set)', () => {
    const { result } = renderHook(() => useTablePagination(itemsWithId, { pageSize: 3 }))

    act(() => {
      result.current.onSelectionChange(new Set(['a', 'c']))
    })

    expect(result.current.selectedKeys.size).toBe(2)
    expect(result.current.selectedKeys.has('a')).toBe(true)
    expect(result.current.selectedKeys.has('c')).toBe(true)
  })

  it('should select all items on current page when keys is "all"', () => {
    const { result } = renderHook(() => useTablePagination(itemsWithId, { pageSize: 2 }))

    act(() => {
      result.current.onSelectionChange('all')
    })

    expect(result.current.selectedKeys.size).toBe(2)
    expect(result.current.selectedKeys.has('a')).toBe(true)
    expect(result.current.selectedKeys.has('b')).toBe(true)
  })

  it('should keep selection from previous pages when changing page', () => {
    const { result } = renderHook(() => useTablePagination(itemsWithId, { pageSize: 2 }))

    act(() => {
      result.current.onSelectionChange(new Set(['a', 'b']))
    })
    act(() => {
      result.current.setPage(2)
    })
    act(() => {
      result.current.onSelectionChange(new Set(['c']))
    })

    expect(result.current.selectedKeys.size).toBe(3)
    expect(result.current.selectedKeys.has('a')).toBe(true)
    expect(result.current.selectedKeys.has('b')).toBe(true)
    expect(result.current.selectedKeys.has('c')).toBe(true)
  })

  it('should merge "all" on current page with previous page selections', () => {
    const { result } = renderHook(() => useTablePagination(itemsWithId, { pageSize: 2 }))

    act(() => {
      result.current.onSelectionChange(new Set(['a']))
    })
    act(() => {
      result.current.setPage(2)
    })
    act(() => {
      result.current.onSelectionChange('all')
    })

    expect(result.current.selectedKeys.size).toBe(3)
    expect(result.current.selectedKeys.has('a')).toBe(true)
    expect(result.current.selectedKeys.has('c')).toBe(true)
    expect(result.current.selectedKeys.has('d')).toBe(true)
  })

  it('should support getId when items do not have id', () => {
    const items = [
      { key: 'x', label: 'X' },
      { key: 'y', label: 'Y' },
    ]

    const { result } = renderHook(() =>
      useTablePagination(items, {
        pageSize: 1,
        getId: item => item.key,
      })
    )

    expect(result.current.pageItems).toHaveLength(1)
    expect(result.current.pageItems[0]?.key).toBe('x')

    act(() => {
      result.current.onSelectionChange(new Set(['x']))
    })
    expect(result.current.selectedKeys.has('x')).toBe(true)
  })

  it('should have totalPages at least 1 for empty items', () => {
    const { result } = renderHook(() => useTablePagination([], { pageSize: 5 }))

    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPages).toBe(1)
    expect(result.current.page).toBe(1)
    expect(result.current.pageItems).toHaveLength(0)
  })

  it('should clamp page when initialPage exceeds totalPages', () => {
    const { result } = renderHook(() =>
      useTablePagination(itemsWithId, { pageSize: 2, initialPage: 10 })
    )

    expect(result.current.page).toBe(3)
    expect(result.current.pageItems[0]?.id).toBe('e')
  })

  it('should throw when item has no id and getId is not provided', () => {
    const itemsNoId = [{ name: 'Only' }]

    expect(() => renderHook(() => useTablePagination(itemsNoId, { pageSize: 1 }))).toThrow(
      'useTablePagination: item.id is undefined'
    )
  })
})
