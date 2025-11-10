import { fireEvent } from '@testing-library/react'

/**
 * Helper function to simulate file upload in tests.
 * Use this instead of userEvent.upload for file inputs, as userEvent.upload
 * doesn't work correctly in this test environment.
 *
 * @param input - The file input element
 * @param files - Single file or array of files to upload
 */
export const uploadFiles = (input: HTMLInputElement, files: File | File[]): void => {
  const fileArray = Array.isArray(files) ? files : [files]

  Object.defineProperty(input, 'files', {
    value: fileArray,
    writable: false,
    configurable: true,
  })

  Object.defineProperty(input, 'value', {
    value: fileArray.map(f => f.name).join(', '),
    writable: true,
    configurable: true,
  })

  fireEvent.change(input)
}
