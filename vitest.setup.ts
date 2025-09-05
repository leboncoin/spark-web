import '@testing-library/jest-dom'
import { vitest } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'

global.ResizeObserver = ResizeObserver

Element.prototype.scrollIntoView = vitest.fn()

globalThis.requestAnimationFrame = cb => {
  setTimeout(() => cb(0), 0)
  return 0
}
