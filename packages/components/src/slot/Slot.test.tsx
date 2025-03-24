import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RefCallback } from 'react'
import { describe, expect, it, vitest } from 'vitest'

import { Slot } from './Slot'

describe('Slot', () => {
  it('should render wrapped component', () => {
    // Given
    const props = {}

    // When
    render(
      <Slot {...props}>
        <button>Button</button>
      </Slot>
    )

    // Then
    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
  })

  it('should pass props to child component', async () => {
    // Given
    const slotProps = { 'data-slot': 'slot', 'data-collide': 'slot' }
    const childProps = { 'data-child': 'child', 'data-collide': 'child' }

    // When
    render(
      <Slot {...slotProps}>
        <button {...childProps}>Button</button>
      </Slot>
    )
    const element = screen.getByRole('button', { name: 'Button' })
    const {
      'data-slot': dataSlot,
      'data-child': dataChild,
      'data-collide': dataCollide,
    } = Object.fromEntries(
      [].slice.call(element.attributes).map(function (attr: HTMLElement) {
        return [attr.nodeName, element.getAttribute(attr.nodeName)]
      })
    )

    // Then
    expect(dataSlot).toBe(slotProps['data-slot'])
    expect(dataCollide).not.toBe(slotProps['data-collide'])
    expect(dataChild).toBe(childProps['data-child'])
    expect(dataCollide).toBe(childProps['data-collide'])
  })

  it('should fire both prop colliding handlers between Slot and child component', async () => {
    // Given
    const slotProps = { onClick: vitest.fn(() => array.push('slot')) }
    const childProps = { onClick: vitest.fn(() => array.push('child')) }
    const array: string[] = []

    // When
    render(
      <Slot {...slotProps}>
        <button {...childProps}>Button</button>
      </Slot>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Button' }))

    // Then
    await waitFor(() => expect(slotProps.onClick).toBeCalled())
    await waitFor(() => expect(childProps.onClick).toBeCalled())

    expect(array[0]).toBe('child')
    expect(array[1]).toBe('slot')
  })

  it('should concat classNames', async () => {
    // Given
    const slotProps = { className: 'slot' }
    const childProps = { className: 'child' }

    // When
    render(
      <Slot {...slotProps}>
        <button {...childProps}>Button</button>
      </Slot>
    )
    const element = screen.getByRole('button', { name: 'Button' })
    const classList = element.classList
    const className = element.getAttribute('class')

    // Then
    expect(classList.contains(slotProps.className)).toBeTruthy()
    expect(classList.contains(childProps.className)).toBeTruthy()
    expect(className).toBe(`${slotProps.className} ${childProps.className}`)
  })

  it('should join styles', async () => {
    // Given
    const slotProps = { style: { background: 'red', display: 'block' } }
    const childProps = { style: { background: 'green', opacity: '0' } }

    // When
    render(
      <Slot {...slotProps}>
        <button {...childProps}>Button</button>
      </Slot>
    )
    const element = screen.getByRole('button', { name: 'Button' })
    const styles = Object.fromEntries(
      Array.from(element.style).map(styleRule => [
        styleRule,
        element.style[styleRule as unknown as number],
      ])
    )

    // Then
    expect(styles.background).toBe(childProps.style.background)
    expect(styles.opacity).toBe(childProps.style.opacity)
    expect(styles.display).toBe(slotProps.style.display)
    expect(styles.background).not.toBe(slotProps.style.background)
  })

  it('should handle both refs', async () => {
    // Given
    const refs = new Set()
    const slotRef: RefCallback<null> = () => {
      refs.add('slot')
    }
    const childRef: RefCallback<null> = () => {
      refs.add('child')
    }

    // When
    render(
      <Slot ref={slotRef}>
        <button ref={childRef}>Button</button>
      </Slot>
    )

    // Then
    expect(refs.has('slot')).toBeTruthy()
    expect(refs.has('child')).toBeTruthy()
  })
})
