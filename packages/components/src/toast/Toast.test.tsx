import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ToastProvider, ToastTrigger, useToastManager } from '.'

const DEFAULT_TIMEOUT = 5000

const advanceTimers = (duration: number) => {
  act(() => {
    vi.advanceTimersByTime(duration)
  })
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('ToastTrigger', () => {
    it('should render a toast and close it after the timeout', async () => {
      // Given a basic toast
      render(
        <ToastProvider>
          <ToastTrigger
            asChild
            title="Success"
            description="You are now subscribed to our newsletter"
          >
            <button type="button">Show me a toast</button>
          </ToastTrigger>
        </ToastProvider>
      )

      expect(screen.queryByRole('dialog', { name: 'Success' })).not.toBeInTheDocument()

      // When the user opens the toast
      fireEvent.click(screen.getByText('Show me a toast'))

      const toast = screen.getByRole('dialog', { name: 'Success' })

      // Then the toast is opened and accessible
      expect(toast).toBeInTheDocument()
      expect(toast).toHaveAccessibleDescription('You are now subscribed to our newsletter')

      // Given we wait 4999 milliseconds
      advanceTimers(DEFAULT_TIMEOUT - 1)

      // Then the toast should be opened still
      expect(toast).toBeInTheDocument()

      // Given we wait 1 millisecond
      advanceTimers(1)

      // Then the toast should be closed
      expect(toast).not.toBeInTheDocument()
    })
  })

  describe('useToastManager', () => {
    describe('add', () => {
      it('should render a toast programmatically and close it after the timeout', async () => {
        const Implementation = () => {
          const toastManager = useToastManager()

          return (
            <button
              type="button"
              onClick={() =>
                toastManager.add({
                  title: 'Success',
                  description: 'You are now subscribed to our newsletter',
                })
              }
            >
              Show me a toast
            </button>
          )
        }
        // Given a basic toast
        render(
          <ToastProvider>
            <Implementation />
          </ToastProvider>
        )

        expect(screen.queryByRole('dialog', { name: 'Success' })).not.toBeInTheDocument()

        // When the user opens the toast
        fireEvent.click(screen.getByText('Show me a toast'))

        const toast = screen.getByRole('dialog', { name: 'Success' })

        // Then the toast is opened and accessible
        expect(toast).toBeInTheDocument()
        expect(toast).toHaveAccessibleDescription('You are now subscribed to our newsletter')

        // Given we wait 4999 milliseconds
        advanceTimers(DEFAULT_TIMEOUT - 1)

        // Then the toast should be opened still
        expect(toast).toBeInTheDocument()

        advanceTimers(1)

        // Then the toast should be closed
        expect(toast).not.toBeInTheDocument()
      })

      it('should render a toast with JSX in title', () => {
        const Implementation = () => {
          const toastManager = useToastManager()

          return (
            <button
              type="button"
              onClick={() =>
                toastManager.add({
                  title: (
                    <span>
                      <strong>File uploaded</strong> successfully
                    </span>
                  ),
                  description: 'Your document has been processed.',
                  timeout: 0,
                })
              }
            >
              Show me a toast
            </button>
          )
        }

        render(
          <ToastProvider>
            <Implementation />
          </ToastProvider>
        )

        fireEvent.click(screen.getByText('Show me a toast'))

        const toast = screen.getByRole('dialog')
        expect(toast).toBeInTheDocument()
        expect(screen.getByText('File uploaded')).toBeInTheDocument()
        expect(screen.getByText('successfully')).toBeInTheDocument()
      })

      it('should render a toast with JSX in description', () => {
        const Implementation = () => {
          const toastManager = useToastManager()

          return (
            <button
              type="button"
              onClick={() =>
                toastManager.add({
                  title: 'Upload complete',
                  description: (
                    <span>
                      Your file has been uploaded. <a href="/files">View it here</a>
                    </span>
                  ),
                  timeout: 0,
                })
              }
            >
              Show me a toast
            </button>
          )
        }

        render(
          <ToastProvider>
            <Implementation />
          </ToastProvider>
        )

        fireEvent.click(screen.getByText('Show me a toast'))

        const toast = screen.getByRole('dialog', { name: 'Upload complete' })
        expect(toast).toBeInTheDocument()
        expect(screen.getByText('Your file has been uploaded.')).toBeInTheDocument()
        expect(screen.getByText('View it here')).toBeInTheDocument()
      })
    })
  })
})
