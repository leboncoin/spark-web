import { CvOutline } from '@spark-ui/icons/CvOutline'
import { FilePdfOutline } from '@spark-ui/icons/FilePdfOutline'
import { ImageOutline } from '@spark-ui/icons/ImageOutline'
import { PlayOutline } from '@spark-ui/icons/PlayOutline'
import { createElement, ReactElement } from 'react'

/**
 * Validates if a file matches the accept patterns
 * Supports MIME types (e.g., "image/*", "image/png", "application/pdf")
 * and file extensions (e.g., ".pdf", ".doc", ".jpg")
 */
export function validateFileAccept(file: File, accept: string): boolean {
  if (!accept) {
    return true
  }

  const patterns = accept.split(',').map(pattern => pattern.trim())

  return patterns.some(pattern => {
    // Handle MIME type patterns (e.g., "image/*", "image/png")
    if (pattern.includes('/')) {
      if (pattern.endsWith('/*')) {
        // Wildcard MIME type (e.g., "image/*")
        const baseType = pattern.slice(0, -2)

        return file.type.startsWith(baseType + '/')
      }
      // Exact MIME type (e.g., "image/png")

      return file.type === pattern
    }

    // Handle file extension patterns (e.g., ".pdf", ".doc")
    if (pattern.startsWith('.')) {
      const extension = pattern.toLowerCase()
      const fileName = file.name.toLowerCase()

      return fileName.endsWith(extension)
    }

    // Handle extension without dot (e.g., "pdf", "doc")
    const extension = '.' + pattern.toLowerCase()
    const fileName = file.name.toLowerCase()

    return fileName.endsWith(extension)
  })
}

/**
 * Validates if a file size is within the allowed range
 * @param file - The file to validate
 * @param minFileSize - Minimum file size in bytes
 * @param maxFileSize - Maximum file size in bytes
 * @param locale - Locale code for error messages. Defaults to browser locale or 'en'
 * @returns Object with validation result and error message if invalid
 */
export function validateFileSize(
  file: File,
  minFileSize?: number,
  maxFileSize?: number,
  locale?: string
): { valid: boolean; error?: string } {
  const defaultLocale = locale || getDefaultLocale()
  if (minFileSize !== undefined && file.size < minFileSize) {
    const errorMessage = `File "${file.name}" is too small. Minimum size is ${formatFileSize(minFileSize, defaultLocale)}.`

    return {
      valid: false,
      error: errorMessage,
    }
  }

  if (maxFileSize !== undefined && file.size > maxFileSize) {
    const errorMessage = `File "${file.name}" is too large. Maximum size is ${formatFileSize(maxFileSize, defaultLocale)}.`

    return {
      valid: false,
      error: errorMessage,
    }
  }

  return { valid: true }
}

/**
 * Gets the default locale from the browser or falls back to 'en'
 * @returns The browser's locale or 'en' as fallback
 */
function getDefaultLocale(): string {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language
  }

  return 'en'
}

/**
 * Formats file size in bytes to human-readable format
 * @param bytes - File size in bytes
 * @param locale - Locale code (e.g., 'en', 'fr'). Defaults to browser locale or 'en'
 * @returns Formatted file size string with appropriate unit
 */
export function formatFileSize(bytes: number, locale?: string): string {
  const defaultLocale = locale || getDefaultLocale()
  // Normalize locale (e.g., 'fr' -> 'fr-FR', 'en' -> 'en-US')
  let normalizedLocale = defaultLocale
  if (defaultLocale.length === 2) {
    normalizedLocale = defaultLocale === 'fr' ? 'fr-FR' : 'en-US'
  }

  if (bytes === 0) {
    const formatter = new Intl.NumberFormat(normalizedLocale, {
      style: 'unit',
      unit: 'byte',
      unitDisplay: 'long',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return formatter.format(0)
  }

  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  // Map to Intl.NumberFormat supported units
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte'] as const
  const unit = units[i] || 'byte'

  const size = bytes / Math.pow(k, i)

  // Use 'long' display for bytes to get proper pluralization (bytes/octets)
  // Use 'short' display for other units (KB/MB/GB, Ko/Mo/Go)
  const unitDisplay = i === 0 ? 'long' : 'short'

  // Use Intl.NumberFormat with unit style to format number and unit according to locale
  const formatter = new Intl.NumberFormat(normalizedLocale, {
    style: 'unit',
    unit,
    unitDisplay,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return formatter.format(size)
}

/**
 * Returns the appropriate icon component based on the file type
 * @param file - The file to get the icon for
 * @returns React element representing the icon component
 */
export function getFileIcon(file: File): ReactElement {
  const fileType = file.type.toLowerCase()
  const fileName = file.name.toLowerCase()

  // Check for images
  if (fileType.startsWith('image/') || /\.(jpg|jpeg|png|gif|bmp|webp|svg|ico)$/i.test(fileName)) {
    return createElement(ImageOutline)
  }

  // Check for PDFs
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return createElement(FilePdfOutline)
  }

  // Check for videos
  if (fileType.startsWith('video/') || /\.(mp4|avi|mov|wmv|flv|webm|mkv)$/i.test(fileName)) {
    return createElement(PlayOutline)
  }

  // Default icon for other file types
  return createElement(CvOutline)
}
