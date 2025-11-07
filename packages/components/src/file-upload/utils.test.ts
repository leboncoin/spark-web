/* eslint-disable max-lines */
import { describe, expect, it } from 'vitest'

import { formatFileSize, validateFileAccept, validateFileSize } from './utils'

describe('validateFileAccept', () => {
  it('should return true when accept is empty', () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
    expect(validateFileAccept(file, '')).toBe(true)
  })

  it('should return true when accept is not provided', () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
    expect(validateFileAccept(file, '')).toBe(true)
  })

  describe('MIME type patterns', () => {
    it('should accept file with wildcard MIME type (image/*)', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      expect(validateFileAccept(file, 'image/*')).toBe(true)
    })

    it('should accept file with wildcard MIME type (application/*)', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      expect(validateFileAccept(file, 'application/*')).toBe(true)
    })

    it('should reject file that does not match wildcard MIME type', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      expect(validateFileAccept(file, 'image/*')).toBe(false)
    })

    it('should accept file with exact MIME type', () => {
      const file = new File(['content'], 'test.png', { type: 'image/png' })
      expect(validateFileAccept(file, 'image/png')).toBe(true)
    })

    it('should reject file that does not match exact MIME type', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      expect(validateFileAccept(file, 'image/png')).toBe(false)
    })

    it('should handle multiple MIME types', () => {
      const imageFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      const pdfFile = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const textFile = new File(['content'], 'test.txt', { type: 'text/plain' })

      expect(validateFileAccept(imageFile, 'image/*,application/pdf')).toBe(true)
      expect(validateFileAccept(pdfFile, 'image/*,application/pdf')).toBe(true)
      expect(validateFileAccept(textFile, 'image/*,application/pdf')).toBe(false)
    })
  })

  describe('File extension patterns', () => {
    it('should accept file with extension starting with dot', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      expect(validateFileAccept(file, '.pdf')).toBe(true)
    })

    it('should reject file that does not match extension', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      expect(validateFileAccept(file, '.pdf')).toBe(false)
    })

    it('should handle case-insensitive extension matching', () => {
      const file1 = new File(['content'], 'test.PDF', { type: 'application/pdf' })
      const file2 = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const file3 = new File(['content'], 'test.Pdf', { type: 'application/pdf' })

      expect(validateFileAccept(file1, '.pdf')).toBe(true)
      expect(validateFileAccept(file2, '.PDF')).toBe(true)
      expect(validateFileAccept(file3, '.PDF')).toBe(true)
    })

    it('should accept file with extension without dot', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      expect(validateFileAccept(file, 'pdf')).toBe(true)
    })

    it('should handle multiple extensions', () => {
      const pdfFile = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const docFile = new File(['content'], 'test.doc', { type: 'application/msword' })
      const jpgFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      const txtFile = new File(['content'], 'test.txt', { type: 'text/plain' })

      expect(validateFileAccept(pdfFile, '.pdf,.doc,.jpg')).toBe(true)
      expect(validateFileAccept(docFile, '.pdf,.doc,.jpg')).toBe(true)
      expect(validateFileAccept(jpgFile, '.pdf,.doc,.jpg')).toBe(true)
      expect(validateFileAccept(txtFile, '.pdf,.doc,.jpg')).toBe(false)
    })

    it('should handle mixed extensions with and without dots', () => {
      const pdfFile = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const docFile = new File(['content'], 'test.doc', { type: 'application/msword' })

      expect(validateFileAccept(pdfFile, 'pdf,.doc')).toBe(true)
      expect(validateFileAccept(docFile, 'pdf,.doc')).toBe(true)
    })
  })

  describe('Mixed patterns', () => {
    it('should handle mixed MIME types and extensions', () => {
      const imageFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      const pdfFile = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const docFile = new File(['content'], 'test.doc', { type: 'application/msword' })
      const txtFile = new File(['content'], 'test.txt', { type: 'text/plain' })

      expect(validateFileAccept(imageFile, 'image/*,.pdf,.doc')).toBe(true)
      expect(validateFileAccept(pdfFile, 'image/*,.pdf,.doc')).toBe(true)
      expect(validateFileAccept(docFile, 'image/*,.pdf,.doc')).toBe(true)
      expect(validateFileAccept(txtFile, 'image/*,.pdf,.doc')).toBe(false)
    })

    it('should handle patterns with spaces', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      expect(validateFileAccept(file, ' .pdf , .doc ')).toBe(true)
    })
  })
})

describe('validateFileSize', () => {
  it('should return valid when no size constraints are provided', () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
    const result = validateFileSize(file)
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  describe('maxFileSize validation', () => {
    it('should return valid when file size is within maxFileSize', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, undefined, 1024 * 1024) // 1 MB
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should return invalid when file size exceeds maxFileSize', () => {
      const file = new File(['x'.repeat(2000)], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, undefined, 1024) // 1 KB
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
      expect(result.error).toContain('too large')
      expect(result.error).toContain('Maximum size is')
    })

    it('should return error message in English by default', () => {
      const file = new File(['x'.repeat(2000)], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, undefined, 1024, 'en')
      expect(result.error).toContain('File "test.jpg" is too large')
      expect(result.error).toContain('Maximum size is')
    })

    it('should return error message in English even when locale is fr', () => {
      const file = new File(['x'.repeat(2000)], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, undefined, 1024, 'fr')
      expect(result.error).toContain('File "test.jpg" is too large')
      expect(result.error).toContain('Maximum size is')
    })
  })

  describe('minFileSize validation', () => {
    it('should return valid when file size is above minFileSize', () => {
      const file = new File(['x'.repeat(200)], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, 100, undefined) // 100 bytes
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should return invalid when file size is below minFileSize', () => {
      const file = new File(['x'], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, 100, undefined) // 100 bytes
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
      expect(result.error).toContain('too small')
      expect(result.error).toContain('Minimum size is')
    })

    it('should return error message in English by default', () => {
      const file = new File(['x'], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, 100, undefined, 'en')
      expect(result.error).toContain('File "test.jpg" is too small')
      expect(result.error).toContain('Minimum size is')
    })

    it('should return error message in English even when locale is fr', () => {
      const file = new File(['x'], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, 100, undefined, 'fr')
      expect(result.error).toContain('File "test.jpg" is too small')
      expect(result.error).toContain('Minimum size is')
    })
  })

  describe('Both minFileSize and maxFileSize validation', () => {
    it('should return valid when file size is within both constraints', () => {
      const file = new File(['x'.repeat(200)], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, 100, 1024) // 100 bytes - 1 KB
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should return invalid when file size is below minFileSize', () => {
      const file = new File(['x'], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, 100, 1024)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('too small')
    })

    it('should return invalid when file size exceeds maxFileSize', () => {
      const file = new File(['x'.repeat(2000)], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileSize(file, 100, 1024)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('too large')
    })
  })
})

describe('formatFileSize', () => {
  describe('Zero bytes', () => {
    it('should format 0 bytes in English', () => {
      // Intl.NumberFormat uses lowercase "bytes" in long form
      expect(formatFileSize(0, 'en')).toBe('0 bytes')
    })

    it('should format 0 bytes in French', () => {
      // Intl.NumberFormat uses singular "octet" in long form with non-breaking space (U+00A0)
      expect(formatFileSize(0, 'fr')).toBe('0\u00A0octet')
    })
  })

  describe('Bytes', () => {
    it('should format bytes in English', () => {
      // Intl.NumberFormat uses long form with proper pluralization
      expect(formatFileSize(1, 'en')).toBe('1 byte')
      expect(formatFileSize(100, 'en')).toBe('100 bytes')
      expect(formatFileSize(500, 'en')).toBe('500 bytes')
    })

    it('should format bytes in French', () => {
      // Intl.NumberFormat uses long form with proper pluralization
      expect(formatFileSize(1, 'fr')).toBe('1\u00A0octet')
      expect(formatFileSize(100, 'fr')).toBe('100\u00A0octets')
      expect(formatFileSize(500, 'fr')).toBe('500\u00A0octets')
    })
  })

  describe('Kilobytes', () => {
    it('should format kilobytes in English', () => {
      // Intl.NumberFormat uses lowercase "kB" for short form
      expect(formatFileSize(1024, 'en')).toBe('1 kB')
      expect(formatFileSize(2048, 'en')).toBe('2 kB')
      expect(formatFileSize(1536, 'en')).toBe('1.5 kB')
      expect(formatFileSize(1024 * 10, 'en')).toBe('10 kB')
    })

    it('should format kilobytes in French', () => {
      // Intl.NumberFormat uses lowercase "ko" for short form in French
      expect(formatFileSize(1024, 'fr')).toBe('1\u202fko')
      expect(formatFileSize(2048, 'fr')).toBe('2\u202fko')
      // French locale uses comma as decimal separator
      expect(formatFileSize(1536, 'fr')).toBe('1,5\u202fko')
      expect(formatFileSize(1024 * 10, 'fr')).toBe('10\u202fko')
    })
  })

  describe('Megabytes', () => {
    it('should format megabytes in English', () => {
      // Intl.NumberFormat uses uppercase "MB" for short form
      expect(formatFileSize(1024 * 1024, 'en')).toBe('1 MB')
      expect(formatFileSize(1024 * 1024 * 2, 'en')).toBe('2 MB')
      expect(formatFileSize(1024 * 1024 * 1.5, 'en')).toBe('1.5 MB')
      expect(formatFileSize(1024 * 1024 * 10, 'en')).toBe('10 MB')
    })

    it('should format megabytes in French', () => {
      // Intl.NumberFormat uses uppercase "Mo" for short form in French with non-breaking space
      expect(formatFileSize(1024 * 1024, 'fr')).toBe('1\u202fMo')
      expect(formatFileSize(1024 * 1024 * 2, 'fr')).toBe('2\u202fMo')
      // French locale uses comma as decimal separator
      expect(formatFileSize(1024 * 1024 * 1.5, 'fr')).toBe('1,5\u202fMo')
      expect(formatFileSize(1024 * 1024 * 10, 'fr')).toBe('10\u202fMo')
    })
  })

  describe('Gigabytes', () => {
    it('should format gigabytes in English', () => {
      // Intl.NumberFormat uses uppercase "GB" for short form
      expect(formatFileSize(1024 * 1024 * 1024, 'en')).toBe('1 GB')
      expect(formatFileSize(1024 * 1024 * 1024 * 2, 'en')).toBe('2 GB')
      expect(formatFileSize(1024 * 1024 * 1024 * 1.5, 'en')).toBe('1.5 GB')
    })

    it('should format gigabytes in French', () => {
      // Intl.NumberFormat uses uppercase "Go" for short form in French with non-breaking space
      expect(formatFileSize(1024 * 1024 * 1024, 'fr')).toBe('1\u202fGo')
      expect(formatFileSize(1024 * 1024 * 1024 * 2, 'fr')).toBe('2\u202fGo')
      // French locale uses comma as decimal separator
      expect(formatFileSize(1024 * 1024 * 1024 * 1.5, 'fr')).toBe('1,5\u202fGo')
    })
  })

  describe('Default locale', () => {
    it('should default to English when locale is not provided', () => {
      // Intl.NumberFormat uses lowercase "kB" for short form
      expect(formatFileSize(1024)).toBe('1 kB')
      expect(formatFileSize(1024 * 1024)).toBe('1 MB')
    })

    it('should use system locale when locale is unknown', () => {
      // Intl.NumberFormat falls back to system locale when given an invalid locale
      // This is the expected behavior of the Intl API
      const result = formatFileSize(1024, 'unknown' as any)
      // Accept either English or system locale format (with or without non-breaking space \u202f)
      expect(['1 kB', '1\u202fkB', '1 ko', '1\u202fko']).toContain(result)

      const resultMB = formatFileSize(1024 * 1024, 'unknown' as any)
      // Accept either English or system locale format (with or without non-breaking space \u202f)
      expect(['1 MB', '1\u202fMB', '1 Mo', '1\u202fMo']).toContain(resultMB)
    })
  })

  describe('Rounding', () => {
    it('should round to 2 decimal places', () => {
      // Intl.NumberFormat uses lowercase "kB" for short form
      expect(formatFileSize(1024 * 1.234, 'en')).toBe('1.23 kB')
      expect(formatFileSize(1024 * 1.235, 'en')).toBe('1.24 kB')
      expect(formatFileSize(1024 * 1.999, 'en')).toBe('2 kB')
    })

    it('should handle large numbers correctly', () => {
      expect(formatFileSize(1024 * 1024 * 1024 * 1.234, 'en')).toBe('1.23 GB')
      expect(formatFileSize(1024 * 1024 * 1024 * 1.999, 'en')).toBe('2 GB')
    })
  })

  describe('Edge cases', () => {
    it('should handle exactly 1 KB', () => {
      // Intl.NumberFormat uses lowercase "kB" for short form
      expect(formatFileSize(1024, 'en')).toBe('1 kB')
      // Intl.NumberFormat uses lowercase "ko" for short form in French with non-breaking space
      expect(formatFileSize(1024, 'fr')).toBe('1\u202fko')
    })

    it('should handle exactly 1 MB', () => {
      expect(formatFileSize(1024 * 1024, 'en')).toBe('1 MB')
      // Intl.NumberFormat uses uppercase "Mo" for short form in French with non-breaking space
      expect(formatFileSize(1024 * 1024, 'fr')).toBe('1\u202fMo')
    })

    it('should handle exactly 1 GB', () => {
      expect(formatFileSize(1024 * 1024 * 1024, 'en')).toBe('1 GB')
      // Intl.NumberFormat uses uppercase "Go" for short form in French with non-breaking space
      expect(formatFileSize(1024 * 1024 * 1024, 'fr')).toBe('1\u202fGo')
    })

    it('should handle files just below 1 KB', () => {
      // English locale uses comma as thousands separator, Intl uses plural "bytes" in long form
      expect(formatFileSize(1023, 'en')).toBe('1,023 bytes')
      // French locale uses non-breaking space as thousands separator, Intl uses plural "octets" in long form
      expect(formatFileSize(1023, 'fr')).toBe('1\u202f023\u00A0octets')
    })

    it('should handle files just below 1 MB', () => {
      // English locale uses comma as thousands separator, Intl uses lowercase "kB"
      expect(formatFileSize(1024 * 1024 - 1, 'en')).toBe('1,024 kB')
      // French locale uses non-breaking space as thousands separator, Intl uses lowercase "ko"
      expect(formatFileSize(1024 * 1024 - 1, 'fr')).toBe('1\u202f024\u202fko')
    })
  })
})
