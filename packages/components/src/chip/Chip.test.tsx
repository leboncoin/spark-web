import { InfoFill } from '@spark-ui/icons/InfoFill'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Icon } from '../icon'
import { Chip } from './Chip'
import { ChipClearButton } from './ChipClearButton'
import { ChipContent } from './ChipContent'
import { ChipLeadingIcon } from './ChipLeadingIcon'

describe('Chip', () => {
  it('should render', () => {
    // Given
    const props = { children: 'Hello World!' }

    render(<Chip {...props} />)

    expect(screen.getByText(props.children)).toBeInTheDocument()
  })

  it('should be visible', () => {
    // Given
    const props = { children: 'Hello World!' }

    render(<Chip {...props} />)

    expect(screen.getByText(props.children)).toBeVisible()
  })

  it('should render all the elements', () => {
    // Given
    const props = { onClear: vi.fn(), onClick: vi.fn() }
    const contentProps = { children: 'Hello World!' }
    const clearProps = { label: 'label' }
    const leadingIconProps = {
      children: (
        <Icon label="info">
          <InfoFill />
        </Icon>
      ),
    }

    render(
      <Chip {...props}>
        <ChipLeadingIcon {...leadingIconProps} />
        <ChipContent {...contentProps} />
        <ChipClearButton {...clearProps} />
      </Chip>
    )

    expect(screen.getByText(contentProps.children)).toBeInTheDocument()
    expect(screen.getByLabelText(clearProps.label, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('info')).toBeInTheDocument()
  })

  describe('role', () => {
    it('should be a div by default', async () => {
      // Given
      const props = { children: 'Hello World!' }

      // When
      render(<Chip {...props} />)
      const chipElement = document.querySelector('[data-spark-component="chip"]')

      // Then
      expect(chipElement?.nodeName).toBe('DIV')
    })

    it('should be a button when it has an action declared', async () => {
      // Given
      const props = { children: 'Hello World!', onClick: vi.fn() }

      // When
      render(<Chip {...props} />)
      const chipElement = document.querySelector('[data-spark-component="chip"]')

      // Then
      expect(chipElement?.nodeName).toBe('BUTTON')
    })

    it('should be a button when it has a pressed state', async () => {
      // Given
      const props = { children: 'Hello World!', defaultPressed: true, value: 'value' }

      // When
      render(<Chip {...props} />)
      const chipElement = document.querySelector('[data-spark-component="chip"]')

      // Then
      expect(chipElement?.nodeName).toBe('BUTTON')
      expect(chipElement?.getAttribute('aria-pressed')).toBe(`${props.defaultPressed}`)
    })
  })

  it('should trigger click event', async () => {
    // Given
    const user = userEvent.setup()
    const props = { children: 'Hello World!', onClick: vi.fn() }

    // When
    render(<Chip {...props} />)
    await user.click(screen.getByText('Hello World!'))

    // Then
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  it('should toggle click event when chips is a toggle button', async () => {
    // Given
    const user = userEvent.setup()
    const props = {
      children: 'Hello World!',
      onClick: vi.fn(),
      defaultPressed: false,
      value: 'value',
    }

    // When
    render(<Chip {...props} />)
    await user.click(screen.getByText('Hello World!'))

    // Then
    expect(props.onClick).toHaveBeenCalledTimes(1)
    expect(props.onClick).toHaveBeenCalledWith(expect.anything(), {
      pressed: props.defaultPressed,
      value: props.value,
    })
  })

  describe('onClear', () => {
    it('should NOT  fire onClear event when chips has an onClear but no clear button action and user press Del key', async () => {
      // Given
      const props = {
        children: 'Hello World!',
        onClick: vi.fn(),
        onClear: vi.fn(),
        value: 'value',
      }

      // When
      render(<Chip {...props} />)
      fireEvent.keyDown(screen.getByText('Hello World!'), { key: 'Del' })

      // Then
      expect(props.onClear).toHaveBeenCalledTimes(0)
      expect(props.onClick).toHaveBeenCalledTimes(0)
    })

    it('should fire onClear event when chips has an onClear and also clear button action and user press Del key', async () => {
      // Given
      const props = {
        onClick: vi.fn(),
        onClear: vi.fn(),
        value: 'value',
      }
      const contentProps = { children: 'Hello World!' }
      const clearButtonProps = { label: 'clear' }

      // When
      render(
        <>
          <button>leading button</button>
          <Chip {...props}>
            <ChipContent {...contentProps} />
            <ChipClearButton {...clearButtonProps} />
          </Chip>
          <button>trailing button</button>
        </>
      )
      fireEvent.keyDown(screen.getByText('Hello World!'), { key: 'Del' })

      // Then
      expect(props.onClear).toHaveBeenCalledTimes(1)
      expect(props.onClick).toHaveBeenCalledTimes(0)
      expect(screen.getByText('leading button')).toHaveFocus()
    })

    it('should fire onClear event when chips has an onClear and also clear button action and user press Backspace key', async () => {
      // Given
      const props = {
        onClick: vi.fn(),
        onClear: vi.fn(),
        value: 'value',
      }
      const contentProps = { children: 'Hello World!' }
      const clearButtonProps = { label: 'clear' }

      // When
      render(
        <>
          <button>leading button</button>
          <Chip {...props}>
            <ChipContent {...contentProps} />
            <ChipClearButton {...clearButtonProps} />
          </Chip>
          <button>trailing button</button>
        </>
      )
      fireEvent.keyDown(screen.getByText('Hello World!'), { key: 'Backspace' })

      // Then
      expect(props.onClear).toHaveBeenCalledTimes(1)
      expect(props.onClick).toHaveBeenCalledTimes(0)
      expect(screen.getByText('trailing button')).toHaveFocus()
    })

    it('should fire onClear event when chips has an onClear and also clear button action and user click on the clear button', async () => {
      // Given
      const user = userEvent.setup()
      const props = {
        onClick: vi.fn(),
        onClear: vi.fn(),
        value: 'value',
      }
      const clearButtonProps = { label: 'clear' }

      // When
      render(
        <Chip {...props}>
          <ChipContent>Hello World!</ChipContent>
          <ChipClearButton {...clearButtonProps} />
        </Chip>
      )
      await user.click(screen.getByLabelText(clearButtonProps.label, { selector: 'button' }))

      // Then
      expect(props.onClear).toHaveBeenCalledTimes(1)
      expect(props.onClick).toHaveBeenCalledTimes(0)
    })
  })
})
