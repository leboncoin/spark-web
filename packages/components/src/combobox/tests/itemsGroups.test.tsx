import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Combobox } from '..'
import { getItemsGroup } from './test-utils'

describe('Combobox', () => {
  describe('Combobox.Group', () => {
    it('should link items groups with their label', () => {
      // Given a combobox with items groups and group labels
      render(
        <Combobox>
          <Combobox.Trigger>
            <Combobox.Input aria-label="Book" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Group>
                <Combobox.Label>Best-sellers</Combobox.Label>
                <Combobox.Item value="book-1">War and Peace</Combobox.Item>
                <Combobox.Item value="book-2">1984</Combobox.Item>
              </Combobox.Group>
              <Combobox.Group>
                <Combobox.Label>Novelties</Combobox.Label>
                <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
                <Combobox.Item value="book-4">Pride and Prejudice</Combobox.Item>
              </Combobox.Group>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      // Then each group have an accessible label
      expect(getItemsGroup('Best-sellers')).toBeInTheDocument()
      expect(getItemsGroup('Novelties')).toBeInTheDocument()
    })
  })
})
