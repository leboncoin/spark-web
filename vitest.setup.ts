import '@testing-library/jest-dom'

import ResizeObserver from 'resize-observer-polyfill'
import { vitest } from 'vitest'

global.ResizeObserver = ResizeObserver

Element.prototype.scrollIntoView = vitest.fn()

// jsdom does not implement IntersectionObserver by default; mock it for components
// that rely on viewport visibility (e.g. CircularMeterTrack animations).
if (!('IntersectionObserver' in globalThis)) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin: string = ''
    readonly thresholds: readonly number[] = []

    constructor(
      public callback: IntersectionObserverCallback,
      _options?: IntersectionObserverInit
    ) {}

    observe(target: Element): void {
      // Immediately invoke the callback as if the element is visible.
      this.callback(
        [
          {
            isIntersecting: true,
            target,
          } as IntersectionObserverEntry,
        ],
        this
      )
    }

    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }

  globalThis.IntersectionObserver = MockIntersectionObserver as typeof IntersectionObserver
}
