import { render } from '@testing-library/react'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { Combobox } from '..'

describe('Combobox', () => {
  describe('context errors', () => {
    beforeEach(() => {
      vi.spyOn(console, 'error').mockImplementation(vi.fn(() => undefined))
    })

    afterAll(() => {
      vi.restoreAllMocks()
    })

    it('should throw when combobox context is missing', () => {
      const renderComponent = () => render(<Combobox.Item value="1">My item</Combobox.Item>)

      expect(renderComponent).toThrowError()
    })

    it('should throw when combobox item context is missing', () => {
      const renderComponent = () => render(<Combobox.ItemIndicator />)

      expect(renderComponent).toThrowError()
    })

    it('should throw when combobox items group context is missing', () => {
      const renderComponent = () => render(<Combobox.Label>Group label</Combobox.Label>)

      expect(renderComponent).toThrowError()
    })
  })
})
