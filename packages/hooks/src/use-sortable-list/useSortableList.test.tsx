import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useSortableList } from './useSortableList'

describe('useSortableList', () => {
  interface TestItem {
    id: string
    name: string
  }

  const createTestItems = (count: number): TestItem[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `item-${i}`,
      name: `Item ${i}`,
    }))

  it('should be defined', () => {
    expect(useSortableList).toBeDefined()
  })

  it('should return getItemProps function', () => {
    // Given
    const items = createTestItems(3)
    const onReorder = vi.fn()
    const getItemKey = (item: TestItem) => item.id

    // When
    const { result } = renderHook(() =>
      useSortableList({
        items,
        onReorder,
        getItemKey,
      })
    )

    // Then
    expect(result.current.getItemProps).toBeDefined()
    expect(typeof result.current.getItemProps).toBe('function')
  })

  it('should return props with correct structure', () => {
    // Given
    const items = createTestItems(3)
    const onReorder = vi.fn()
    const getItemKey = (item: TestItem) => item.id

    // When
    const { result } = renderHook(() =>
      useSortableList({
        items,
        onReorder,
        getItemKey,
      })
    )

    const props = result.current.getItemProps(items[0]!, 0)

    // Then
    expect(props).toHaveProperty('draggable', true)
    expect(props).toHaveProperty('onDragStart')
    expect(props).toHaveProperty('onDragEnter')
    expect(props).toHaveProperty('onDragOver')
    expect(props).toHaveProperty('onDragLeave')
    expect(props).toHaveProperty('onDragEnd')
    expect(props).toHaveProperty('onDrop')
    expect(props).toHaveProperty('onKeyDown')
    expect(props).toHaveProperty('tabIndex', 0)
    expect(props).toHaveProperty('ref')
  })

  describe('drag and drop', () => {
    it('should handle drag start', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const mockElement = document.createElement('div')
      const dragEvent = {
        dataTransfer: {
          effectAllowed: '',
          setData: vi.fn(),
        },
        currentTarget: mockElement,
        preventDefault: vi.fn(),
      } as unknown as React.DragEvent

      // When
      act(() => {
        props.onDragStart(dragEvent)
      })

      // Then
      expect(dragEvent.dataTransfer.effectAllowed).toBe('move')
      expect(dragEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '0')
      expect(mockElement.style.opacity).toBe('var(--opacity-dim-3)')
    })

    it('should handle drag enter and add data-drag-over attribute', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const mockElement = document.createElement('div')
      const dragEvent = {
        preventDefault: vi.fn(),
        currentTarget: mockElement,
      } as unknown as React.DragEvent

      // When
      act(() => {
        props.onDragEnter(dragEvent)
      })

      // Then
      expect(dragEvent.preventDefault).toHaveBeenCalled()
      expect(mockElement.getAttribute('data-drag-over')).toBe('true')
    })

    it('should handle drag over', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const dragEvent = {
        dataTransfer: {
          dropEffect: '',
        },
        preventDefault: vi.fn(),
      } as unknown as React.DragEvent

      // When
      act(() => {
        props.onDragOver(dragEvent)
      })

      // Then
      expect(dragEvent.preventDefault).toHaveBeenCalled()
      expect(dragEvent.dataTransfer.dropEffect).toBe('move')
    })

    it('should handle drag leave and remove data-drag-over attribute', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const mockElement = document.createElement('div')
      mockElement.setAttribute('data-drag-over', 'true')
      const dragEvent = {
        currentTarget: mockElement,
        relatedTarget: document.createElement('div'), // Different element
      } as unknown as React.DragEvent

      // When
      act(() => {
        props.onDragLeave(dragEvent)
      })

      // Then
      expect(mockElement.getAttribute('data-drag-over')).toBeNull()
    })

    it('should not remove data-drag-over attribute when moving to a child element', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const mockElement = document.createElement('div')
      const childElement = document.createElement('span')
      mockElement.appendChild(childElement)
      mockElement.setAttribute('data-drag-over', 'true')
      const dragEvent = {
        currentTarget: mockElement,
        relatedTarget: childElement, // Child element
      } as unknown as React.DragEvent

      // When
      act(() => {
        props.onDragLeave(dragEvent)
      })

      // Then
      expect(mockElement.getAttribute('data-drag-over')).toBe('true')
    })

    it('should handle drag end and clean up attributes', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const mockElement = document.createElement('div')
      mockElement.style.opacity = '0.3'
      mockElement.setAttribute('data-drag-over', 'true')
      const dragEvent = {
        currentTarget: mockElement,
      } as unknown as React.DragEvent

      // When
      act(() => {
        props.onDragEnd(dragEvent)
      })

      // Then
      expect(mockElement.style.opacity).toBe('')
      expect(mockElement.getAttribute('data-drag-over')).toBeNull()
    })

    it('should handle drop and reorder items', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      // Start drag from index 0
      const dragStartProps = result.current.getItemProps(items[0]!, 0)
      const dragStartEvent = {
        dataTransfer: {
          effectAllowed: '',
          setData: vi.fn(),
        },
        currentTarget: document.createElement('div'),
        preventDefault: vi.fn(),
      } as unknown as React.DragEvent

      act(() => {
        dragStartProps.onDragStart(dragStartEvent)
      })

      // Drop on index 2
      const dropProps = result.current.getItemProps(items[2]!, 2)
      const mockDropElement = document.createElement('div')
      mockDropElement.setAttribute('data-drag-over', 'true')
      const dropEvent = {
        dataTransfer: {
          getData: vi.fn(() => '0'),
        },
        preventDefault: vi.fn(),
        currentTarget: mockDropElement,
      } as unknown as React.DragEvent

      // When
      act(() => {
        dropProps.onDrop(dropEvent)
      })

      // Then
      expect(dropEvent.preventDefault).toHaveBeenCalled()
      expect(mockDropElement.getAttribute('data-drag-over')).toBeNull()
      expect(onReorder).toHaveBeenCalledWith([items[1], items[2], items[0]])
    })

    it('should not reorder if dragIndex equals dropIndex', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      // Start drag from index 0
      const dragStartProps = result.current.getItemProps(items[0]!, 0)
      const dragStartEvent = {
        dataTransfer: {
          effectAllowed: '',
          setData: vi.fn(),
        },
        currentTarget: document.createElement('div'),
        preventDefault: vi.fn(),
      } as unknown as React.DragEvent

      act(() => {
        dragStartProps.onDragStart(dragStartEvent)
      })

      // Drop on same index
      const dropProps = result.current.getItemProps(items[0]!, 0)
      const mockDropElement = document.createElement('div')
      const dropEvent = {
        dataTransfer: {
          getData: vi.fn(() => '0'),
        },
        preventDefault: vi.fn(),
        currentTarget: mockDropElement,
      } as unknown as React.DragEvent

      // When
      act(() => {
        dropProps.onDrop(dropEvent)
      })

      // Then
      expect(onReorder).not.toHaveBeenCalled()
    })

    it('should not reorder if dragIndex is invalid', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const dropProps = result.current.getItemProps(items[0]!, 0)
      const mockDropElement = document.createElement('div')
      const dropEvent = {
        dataTransfer: {
          getData: vi.fn(() => 'invalid'),
        },
        preventDefault: vi.fn(),
        currentTarget: mockDropElement,
      } as unknown as React.DragEvent

      // When
      act(() => {
        dropProps.onDrop(dropEvent)
      })

      // Then
      expect(onReorder).not.toHaveBeenCalled()
    })
  })

  describe('keyboard navigation', () => {
    it('should move item up with ArrowUp key', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[1]!, 1)
      const keyEvent = {
        key: 'ArrowUp',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      // When
      act(() => {
        props.onKeyDown(keyEvent)
      })

      // Then
      expect(keyEvent.preventDefault).toHaveBeenCalled()
      expect(onReorder).toHaveBeenCalledWith([items[1], items[0], items[2]])
    })

    it('should move item down with ArrowDown key', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const keyEvent = {
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      // When
      act(() => {
        props.onKeyDown(keyEvent)
      })

      // Then
      expect(keyEvent.preventDefault).toHaveBeenCalled()
      expect(onReorder).toHaveBeenCalledWith([items[1], items[0], items[2]])
    })

    it('should not move first item up', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const keyEvent = {
        key: 'ArrowUp',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      // When
      act(() => {
        props.onKeyDown(keyEvent)
      })

      // Then
      expect(onReorder).not.toHaveBeenCalled()
    })

    it('should not move last item down', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[2]!, 2)
      const keyEvent = {
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      // When
      act(() => {
        props.onKeyDown(keyEvent)
      })

      // Then
      expect(onReorder).not.toHaveBeenCalled()
    })

    it('should ignore other keys', () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[1]!, 1)
      const keyEvent = {
        key: 'Enter',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      // When
      act(() => {
        props.onKeyDown(keyEvent)
      })

      // Then
      expect(keyEvent.preventDefault).not.toHaveBeenCalled()
      expect(onReorder).not.toHaveBeenCalled()
    })
  })

  describe('ref management', () => {
    it('should store ref when element is mounted', () => {
      // Given
      const items = createTestItems(2)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const mockElement = document.createElement('div')

      // When
      act(() => {
        if (typeof props.ref === 'function') {
          props.ref(mockElement as HTMLElement)
        }
      })

      // Then
      expect(props.ref).toBeDefined()
    })

    it('should remove ref when element is unmounted', () => {
      // Given
      const items = createTestItems(2)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[0]!, 0)
      const mockElement = document.createElement('div')

      // When
      act(() => {
        if (typeof props.ref === 'function') {
          props.ref(mockElement as HTMLElement)
          props.ref(null)
        }
      })

      // Then
      // Ref should be cleaned up (no error thrown)
      expect(props.ref).toBeDefined()
    })
  })

  describe('focus management', () => {
    it('should maintain focus after moving item up', async () => {
      // Given
      const items = createTestItems(3)
      const onReorder = vi.fn()
      const getItemKey = (item: TestItem) => item.id

      const { result } = renderHook(() =>
        useSortableList({
          items,
          onReorder,
          getItemKey,
        })
      )

      const props = result.current.getItemProps(items[1]!, 1)
      const mockElement = document.createElement('div')
      mockElement.focus = vi.fn()

      // Set up ref
      act(() => {
        if (typeof props.ref === 'function') {
          props.ref(mockElement as HTMLElement)
        }
      })

      const keyEvent = {
        key: 'ArrowUp',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      // When
      act(() => {
        props.onKeyDown(keyEvent)
      })

      // Wait for requestAnimationFrame
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        })
      })

      // Then
      expect(onReorder).toHaveBeenCalled()
      // Focus should be maintained on the moved item
      expect(mockElement.focus).toHaveBeenCalled()
    })
  })
})
