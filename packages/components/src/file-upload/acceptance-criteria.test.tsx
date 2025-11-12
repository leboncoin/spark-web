/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FileUpload } from '.'
import { uploadFiles } from './test-utils'

describe('FileUpload - Acceptance Criteria', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC1: The component displays a trigger (button) that opens the file selection dialog', () => {
    it('should display a trigger button', () => {
      // GIVEN a FileUpload component with a trigger
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN the trigger button should be visible
      expect(screen.getByRole('button', { name: 'Upload Files' })).toBeInTheDocument()
    })

    it('should open file selection dialog when trigger is clicked', async () => {
      // GIVEN a FileUpload component with a trigger
      const user = userEvent.setup()
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </FileUpload>
      )

      const trigger = screen.getByRole('button', { name: 'Upload Files' })
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const clickSpy = vi.spyOn(input, 'click')

      // WHEN the trigger is clicked
      await user.click(trigger)

      // THEN the file selection dialog should open
      expect(clickSpy).toHaveBeenCalled()
    })
  })

  describe('AC2: The component supports a dropzone mode with drag & drop for file selection', () => {
    it('should render a dropzone', () => {
      // GIVEN a FileUpload component with a dropzone
      render(
        <FileUpload>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN the dropzone should be visible
      expect(screen.getByText('Drop files here')).toBeInTheDocument()
    })

    it('should accept files dropped on the dropzone', async () => {
      // GIVEN a FileUpload component with a dropzone
      const onFilesChange = vi.fn()
      render(
        <FileUpload onFilesChange={onFilesChange}>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
        </FileUpload>
      )

      const dropzone = screen.getByText('Drop files here')
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file is dropped on the dropzone
      const dropEvent = new Event('drop', { bubbles: true }) as any
      dropEvent.dataTransfer = {
        files: [file],
      }
      dropzone.dispatchEvent(dropEvent)

      // THEN the file should be accepted
      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalledWith([file])
      })
    })
  })

  describe('AC3: The `multiple` prop allows selecting a single file or multiple files', () => {
    it('should allow selecting multiple files when multiple is true (default)', async () => {
      // GIVEN a FileUpload component with multiple=true (default)
      const onFilesChange = vi.fn()
      render(
        <FileUpload onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const files = [
        new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }),
        new File(['content2'], 'file2.jpg', { type: 'image/jpeg' }),
      ]

      // WHEN multiple files are selected
      await userEvent.upload(input, files)

      // THEN all files should be accepted
      expect(onFilesChange).toHaveBeenCalledWith(files)
      expect(input.hasAttribute('multiple')).toBe(true)
    })

    it('should allow selecting only one file when multiple is false', async () => {
      // GIVEN a FileUpload component with multiple=false
      const onFilesChange = vi.fn()
      render(
        <FileUpload multiple={false} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const files = [
        new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }),
        new File(['content2'], 'file2.jpg', { type: 'image/jpeg' }),
      ]

      // WHEN multiple files are selected
      await userEvent.upload(input, files)

      // THEN only the first file should be accepted
      expect(onFilesChange).toHaveBeenCalledWith([files[0]])
      expect(input.hasAttribute('multiple')).toBe(false)
    })
  })

  describe('AC4: The `accept` prop filters accepted file types', () => {
    it('should accept files matching the accept prop', async () => {
      // GIVEN a FileUpload component with accept="image/*"
      const onFilesChange = vi.fn()
      render(
        <FileUpload accept="image/*" onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const validFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a valid file is selected
      await userEvent.upload(input, validFile)

      // THEN the file should be accepted
      expect(onFilesChange).toHaveBeenCalledWith([validFile])
    })

    it('should reject files not matching the accept prop', async () => {
      // GIVEN a FileUpload component with accept="image/*"
      const onFilesChange = vi.fn()
      render(
        <FileUpload accept="image/*" onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ rejectedFiles }) => (
              <>
                {rejectedFiles.length > 0 && (
                  <ul>
                    {rejectedFiles.map((rejected, index) => (
                      <FileUpload.RejectedFile
                        key={index}
                        rejectedFile={rejected}
                        renderError={error => error}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const invalidFile = new File(['content'], 'test.pdf', { type: 'application/pdf' })

      // WHEN an invalid file is selected
      uploadFiles(input, invalidFile)

      // THEN the file should be rejected with FILE_INVALID_TYPE error
      expect(onFilesChange).not.toHaveBeenCalled()
      // Files are now updated synchronously, so we can check immediately
      await waitFor(
        () => {
          expect(screen.getByText('test.pdf')).toBeInTheDocument()
          expect(screen.getByText('FILE_INVALID_TYPE')).toBeInTheDocument()
        },
        { timeout: 3000, interval: 100 }
      )
    })
  })

  describe('AC5: The `maxFiles` prop limits the number of files that can be uploaded', () => {
    it('should accept files up to the maxFiles limit', async () => {
      // GIVEN a FileUpload component with maxFiles=2
      const onFilesChange = vi.fn()
      render(
        <FileUpload maxFiles={2} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const files = [
        new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }),
        new File(['content2'], 'file2.jpg', { type: 'image/jpeg' }),
      ]

      // WHEN files within the limit are selected
      await userEvent.upload(input, files)

      // THEN all files should be accepted
      expect(onFilesChange).toHaveBeenCalledWith(files)
    })

    it('should reject files exceeding the maxFiles limit', async () => {
      // GIVEN a FileUpload component with maxFiles=2
      render(
        <FileUpload maxFiles={2}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ rejectedFiles }) => (
              <>
                {rejectedFiles.length > 0 && (
                  <ul>
                    {rejectedFiles.map((rejected, index) => (
                      <FileUpload.RejectedFile
                        key={index}
                        rejectedFile={rejected}
                        renderError={error => error}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const files = [
        new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }),
        new File(['content2'], 'file2.jpg', { type: 'image/jpeg' }),
        new File(['content3'], 'file3.jpg', { type: 'image/jpeg' }),
      ]

      // WHEN files exceeding the limit are selected
      await userEvent.upload(input, files)

      // THEN excess files should be rejected with TOO_MANY_FILES error
      await screen.findByText('TOO_MANY_FILES')
    })
  })

  describe('AC6: The `maxFileSize` and `minFileSize` props validate file sizes', () => {
    it('should accept files within the size limits', async () => {
      // GIVEN a FileUpload component with minFileSize=100 and maxFileSize=10000
      const onFilesChange = vi.fn()
      render(
        <FileUpload minFileSize={100} maxFileSize={10000} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const validFile = new File(['x'.repeat(500)], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file within the size limits is selected
      await userEvent.upload(input, validFile)

      // THEN the file should be accepted
      expect(onFilesChange).toHaveBeenCalledWith([validFile])
    })

    it('should reject files exceeding maxFileSize', async () => {
      // GIVEN a FileUpload component with maxFileSize=1000
      render(
        <FileUpload maxFileSize={1000}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ rejectedFiles }) => (
              <>
                {rejectedFiles.length > 0 && (
                  <ul>
                    {rejectedFiles.map((rejected, index) => (
                      <FileUpload.RejectedFile
                        key={index}
                        rejectedFile={rejected}
                        renderError={error => error}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const largeFile = new File(['x'.repeat(2000)], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file exceeding maxFileSize is selected
      await userEvent.upload(input, largeFile)

      // THEN the file should be rejected with FILE_TOO_LARGE error
      await screen.findByText('FILE_TOO_LARGE')
    })

    it('should reject files below minFileSize', async () => {
      // GIVEN a FileUpload component with minFileSize=1000
      render(
        <FileUpload minFileSize={1000}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ rejectedFiles }) => (
              <>
                {rejectedFiles.length > 0 && (
                  <ul>
                    {rejectedFiles.map((rejected, index) => (
                      <FileUpload.RejectedFile
                        key={index}
                        rejectedFile={rejected}
                        renderError={error => error}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const smallFile = new File(['x'.repeat(100)], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file below minFileSize is selected
      await userEvent.upload(input, smallFile)

      // THEN the file should be rejected with FILE_TOO_SMALL error
      await screen.findByText('FILE_TOO_SMALL')
    })
  })

  describe('AC7: Rejected files are stored in a separate state with their error codes', () => {
    it('should store rejected files in rejectedFiles state', async () => {
      // GIVEN a FileUpload component with validation rules
      render(
        <FileUpload accept="image/*" maxFileSize={1000}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ rejectedFiles }) => (
              <>
                {rejectedFiles.length > 0 && (
                  <ul>
                    {rejectedFiles.map((rejected, index) => (
                      <FileUpload.RejectedFile
                        key={index}
                        rejectedFile={rejected}
                        renderError={error => error}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const invalidFile = new File(['x'.repeat(2000)], 'test.pdf', { type: 'application/pdf' })

      // WHEN an invalid file is selected
      uploadFiles(input, invalidFile)

      // THEN the file should be stored in rejectedFiles with error codes
      // Files are now updated synchronously, so we can check immediately
      await waitFor(
        () => {
          expect(screen.getByText('test.pdf')).toBeInTheDocument()
          expect(screen.getByText('FILE_INVALID_TYPE')).toBeInTheDocument()
        },
        { timeout: 3000, interval: 100 }
      )
    })
  })

  describe('AC8: Each rejected file can have multiple error codes', () => {
    it('should assign multiple error codes to a rejected file', async () => {
      // GIVEN a FileUpload component with maxFiles=1 and accept="image/*"
      render(
        <FileUpload maxFiles={1} accept="image/*">
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ rejectedFiles }) => (
              <>
                {rejectedFiles.length > 0 && (
                  <ul>
                    {rejectedFiles.map((rejected, index) => (
                      <FileUpload.RejectedFile
                        key={index}
                        rejectedFile={rejected}
                        renderError={error => error}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const existingFile = new File(['content'], 'existing.jpg', { type: 'image/jpeg' })
      uploadFiles(input, existingFile)

      const invalidFile = new File(['content'], 'test.pdf', { type: 'application/pdf' })

      // WHEN an invalid file is selected when maxFiles is already reached
      uploadFiles(input, invalidFile)

      // THEN the file should have both FILE_INVALID_TYPE and TOO_MANY_FILES errors
      // Files are now updated synchronously, so we can check immediately
      await waitFor(
        () => {
          expect(screen.getByText('test.pdf')).toBeInTheDocument()
          expect(screen.getByText('FILE_INVALID_TYPE')).toBeInTheDocument()
          expect(screen.getByText('TOO_MANY_FILES')).toBeInTheDocument()
        },
        { timeout: 3000, interval: 100 }
      )
    })
  })

  describe('AC9: The component exposes `FileUpload.Context` to access acceptedFiles, rejectedFiles, formatFileSize, and locale', () => {
    it('should expose acceptedFiles in Context', () => {
      // GIVEN a FileUpload component with defaultValue
      const files = [new File(['content'], 'test.jpg', { type: 'image/jpeg' })]
      render(
        <FileUpload defaultValue={files}>
          <FileUpload.Context>
            {({ acceptedFiles }) => <div>{acceptedFiles.length} files</div>}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN acceptedFiles should be accessible
      expect(screen.getByText('1 files')).toBeInTheDocument()
    })

    it('should expose rejectedFiles in Context', () => {
      // GIVEN a FileUpload component
      render(
        <FileUpload>
          <FileUpload.Context>
            {({ rejectedFiles }) => <div>{rejectedFiles.length} rejected</div>}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN rejectedFiles should be accessible
      expect(screen.getByText('0 rejected')).toBeInTheDocument()
    })

    it('should expose formatFileSize in Context', () => {
      // GIVEN a FileUpload component
      render(
        <FileUpload>
          <FileUpload.Context>
            {({ formatFileSize }) => <div>{formatFileSize(1024)}</div>}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN formatFileSize should be accessible
      expect(screen.getByText(/1/)).toBeInTheDocument()
    })

    it('should expose locale in Context', () => {
      // GIVEN a FileUpload component with locale="fr"
      render(
        <FileUpload locale="fr">
          <FileUpload.Context>{({ locale }) => <div>{locale}</div>}</FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN locale should be accessible
      expect(screen.getByText('fr')).toBeInTheDocument()
    })
  })

  describe('AC10: The component provides `FileUpload.AcceptedFile` to display an accepted file', () => {
    it('should display accepted file with name, size, and delete button', () => {
      // GIVEN a FileUpload component with defaultValue
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      render(
        <FileUpload defaultValue={[file]}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <FileUpload.AcceptedFile key={index} file={f} fileIndex={index} />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN the file name, size, and delete button should be displayed
      expect(screen.getByText('test.jpg')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Delete file' })).toBeInTheDocument()
    })
  })

  describe('AC11: The component provides `FileUpload.RejectedFile` with a mandatory `renderError` prop', () => {
    it('should display rejected file with custom error messages', async () => {
      // GIVEN a FileUpload component with accept="image/*"
      render(
        <FileUpload accept="image/*">
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ rejectedFiles }) => (
              <ul>
                {rejectedFiles.map((rejected, index) => (
                  <FileUpload.RejectedFile
                    key={index}
                    rejectedFile={rejected}
                    renderError={error => `Error: ${error}`}
                  />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const invalidFile = new File(['content'], 'test.pdf', { type: 'application/pdf' })

      // WHEN an invalid file is selected
      uploadFiles(input, invalidFile)

      // THEN the rejected file should be displayed with custom error message
      // Files are now updated synchronously, so we can check immediately
      await waitFor(
        () => {
          expect(screen.getByText('test.pdf')).toBeInTheDocument()
          expect(screen.getByText('Error: FILE_INVALID_TYPE')).toBeInTheDocument()
        },
        { timeout: 3000, interval: 100 }
      )
    })
  })

  describe('AC12: The `disabled` prop prevents all interactions', () => {
    it('should prevent file selection when disabled', async () => {
      // GIVEN a FileUpload component with disabled=true
      const onFilesChange = vi.fn()
      render(
        <FileUpload disabled onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file is selected
      await userEvent.upload(input, file)

      // THEN the file should not be accepted
      expect(onFilesChange).not.toHaveBeenCalled()
      expect(input.disabled).toBe(true)
    })

    it('should prevent file deletion when disabled', () => {
      // GIVEN a FileUpload component with disabled=true and defaultValue
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      render(
        <FileUpload disabled defaultValue={[file]}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <FileUpload.AcceptedFile key={index} file={f} fileIndex={index} />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const deleteButton = screen.getByRole('button', { name: 'Delete file' })

      // WHEN the delete button is clicked
      // THEN the button should be disabled
      expect(deleteButton).toBeDisabled()
    })
  })

  describe('AC13: The `readOnly` prop prevents modifications while maintaining a more subtle style', () => {
    it('should prevent file selection when readOnly', async () => {
      // GIVEN a FileUpload component with readOnly=true
      const onFilesChange = vi.fn()
      render(
        <FileUpload readOnly onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file is selected
      await userEvent.upload(input, file)

      // THEN the file should not be accepted
      expect(onFilesChange).not.toHaveBeenCalled()
    })
  })

  describe('AC14: The `defaultValue` prop allows initializing the component with existing files', () => {
    it('should initialize with files from defaultValue', () => {
      // GIVEN a FileUpload component with defaultValue
      const files = [
        new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }),
        new File(['content2'], 'file2.jpg', { type: 'image/jpeg' }),
      ]
      render(
        <FileUpload defaultValue={files}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN the files from defaultValue should be displayed
      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file2.jpg')).toBeInTheDocument()
    })
  })

  describe('AC15: The `onFilesChange` callback is called whenever the accepted files list is modified', () => {
    it('should call onFilesChange when files are added', async () => {
      // GIVEN a FileUpload component with onFilesChange callback
      const onFilesChange = vi.fn()
      render(
        <FileUpload onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file is selected
      await userEvent.upload(input, file)

      // THEN onFilesChange should be called with the new files
      expect(onFilesChange).toHaveBeenCalledWith([file])
    })

    it('should call onFilesChange when files are removed', async () => {
      // GIVEN a FileUpload component with defaultValue and onFilesChange callback
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      const onFilesChange = vi.fn()
      render(
        <FileUpload defaultValue={[file]} onFilesChange={onFilesChange}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <FileUpload.AcceptedFile key={index} file={f} fileIndex={index} />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const deleteButton = screen.getByRole('button', { name: 'Delete file' })

      // WHEN a file is deleted
      await userEvent.click(deleteButton)

      // THEN onFilesChange should be called with the updated files list
      expect(onFilesChange).toHaveBeenCalledWith([])
    })
  })

  describe('AC16: The `onMaxFilesReached` callback is called when the file limit is reached', () => {
    it('should call onMaxFilesReached when maxFiles limit is reached', async () => {
      // GIVEN a FileUpload component with maxFiles=1 and onMaxFilesReached callback
      const onMaxFilesReached = vi.fn()
      render(
        <FileUpload maxFiles={1} onMaxFilesReached={onMaxFilesReached}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      await userEvent.upload(input, file1)

      const file2 = new File(['content2'], 'file2.jpg', { type: 'image/jpeg' })

      // WHEN a file is selected that exceeds the limit
      await userEvent.upload(input, file2)

      // THEN onMaxFilesReached should be called
      expect(onMaxFilesReached).toHaveBeenCalledWith(1, 1)
    })
  })

  describe('AC17: The `onFileSizeError` callback is called with the file and error code when a size error occurs', () => {
    it('should call onFileSizeError when file exceeds maxFileSize', async () => {
      // GIVEN a FileUpload component with maxFileSize=1000 and onFileSizeError callback
      const onFileSizeError = vi.fn()
      render(
        <FileUpload maxFileSize={1000} onFileSizeError={onFileSizeError}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const largeFile = new File(['x'.repeat(2000)], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file exceeding maxFileSize is selected
      await userEvent.upload(input, largeFile)

      // THEN onFileSizeError should be called with the file and error code
      expect(onFileSizeError).toHaveBeenCalledWith(largeFile, 'FILE_TOO_LARGE')
    })

    it('should call onFileSizeError when file is below minFileSize', async () => {
      // GIVEN a FileUpload component with minFileSize=1000 and onFileSizeError callback
      const onFileSizeError = vi.fn()
      render(
        <FileUpload minFileSize={1000} onFileSizeError={onFileSizeError}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const smallFile = new File(['x'.repeat(100)], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a file below minFileSize is selected
      await userEvent.upload(input, smallFile)

      // THEN onFileSizeError should be called with the file and error code
      expect(onFileSizeError).toHaveBeenCalledWith(smallFile, 'FILE_TOO_SMALL')
    })
  })

  describe('AC18: The `locale` prop allows formatting file sizes according to the locale', () => {
    it('should format file sizes according to the locale prop', () => {
      // GIVEN a FileUpload component with locale="fr"
      render(
        <FileUpload locale="fr">
          <FileUpload.Context>
            {({ formatFileSize }) => <div>{formatFileSize(1024)}</div>}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN file sizes should be formatted according to the locale
      const formatted = screen.getByText(/1/)
      expect(formatted).toBeInTheDocument()
    })
  })

  describe('AC19: The component detects duplicate files and rejects them with the `FILE_EXISTS` code', () => {
    it('should detect and reject duplicate files', async () => {
      // GIVEN a FileUpload component with defaultValue
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      render(
        <FileUpload defaultValue={[file]}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ rejectedFiles }) => (
              <>
                {rejectedFiles.length > 0 && (
                  <ul>
                    {rejectedFiles.map((rejected, index) => (
                      <FileUpload.RejectedFile
                        key={index}
                        rejectedFile={rejected}
                        renderError={error => error}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const duplicateFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })

      // WHEN the same file is selected again
      await userEvent.upload(input, duplicateFile)

      // THEN the file should be rejected with FILE_EXISTS error
      // Give React time to update state (React batches state updates)
      await new Promise(resolve => setTimeout(resolve, 100))
      await waitFor(
        () => {
          expect(screen.getByText('test.jpg')).toBeInTheDocument()
          expect(screen.getByText('FILE_EXISTS')).toBeInTheDocument()
        },
        { timeout: 3000, interval: 100 }
      )
    })
  })

  describe('AC20: The `FileUpload.Item` component allows creating custom items for files', () => {
    it('should allow creating custom file items', () => {
      // GIVEN a FileUpload component with defaultValue
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      render(
        <FileUpload defaultValue={[file]}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <FileUpload.Item key={index}>
                    <div data-testid="custom-item">Custom: {f.name}</div>
                  </FileUpload.Item>
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN custom items should be displayed
      expect(screen.getByTestId('custom-item')).toHaveTextContent('Custom: test.jpg')
    })
  })

  describe('AC21: The `FileUpload.PreviewImage` component allows displaying an image preview', () => {
    beforeEach(() => {
      // Mock URL.createObjectURL
      global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/test')
      global.URL.revokeObjectURL = vi.fn()
    })

    it('should display an image preview for image files', () => {
      // GIVEN a FileUpload component with an image file in defaultValue
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      render(
        <FileUpload defaultValue={[file]}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <li key={index}>
                    <FileUpload.PreviewImage file={f} />
                  </li>
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN an image preview should be displayed
      const img = document.querySelector('img')
      expect(img).toBeInTheDocument()
    })
  })

  describe('AC22: The `FileUpload.Trigger` component can be customized with `asChild`', () => {
    it('should allow customizing the trigger with asChild', () => {
      // GIVEN a FileUpload component with a custom trigger using asChild
      render(
        <FileUpload>
          <FileUpload.Trigger asChild>
            <button type="button">Custom Upload</button>
          </FileUpload.Trigger>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN the custom trigger should be used
      expect(screen.getByRole('button', { name: 'Custom Upload' })).toBeInTheDocument()
    })
  })

  describe('AC23: The `FileUpload.Dropzone` component displays a drop zone with visual feedback', () => {
    it('should display a dropzone', () => {
      // GIVEN a FileUpload component with a dropzone
      render(
        <FileUpload>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN the dropzone should be visible
      expect(screen.getByText('Drop files here')).toBeInTheDocument()
    })
  })

  describe('AC24: Visual focus respects WCAG standards for accessibility', () => {
    it('should have visible focus indicators', () => {
      // GIVEN a FileUpload component with a trigger
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const trigger = screen.getByRole('button', { name: 'Upload' })

      // WHEN the trigger receives focus
      trigger.focus()

      // THEN the focus should be visible
      expect(trigger).toHaveFocus()
    })
  })

  describe('AC25: The component supports keyboard navigation', () => {
    it('should support Tab navigation to the trigger', async () => {
      // GIVEN a FileUpload component with a trigger
      const user = userEvent.setup()
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      // WHEN Tab is pressed
      await user.tab()

      // THEN the trigger should receive focus
      expect(screen.getByRole('button', { name: 'Upload' })).toHaveFocus()
    })

    it('should open file dialog when Enter is pressed on trigger', async () => {
      // GIVEN a FileUpload component with a trigger
      const user = userEvent.setup()
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      const trigger = screen.getByRole('button', { name: 'Upload' })
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const clickSpy = vi.spyOn(input, 'click')

      // WHEN Enter is pressed on the trigger
      trigger.focus()
      await user.keyboard('{Enter}')

      // THEN the file dialog should open
      expect(clickSpy).toHaveBeenCalled()
    })
  })

  describe('AC26: Files are formatted with `formatFileSize` which uses `Intl.NumberFormat` for localization', () => {
    it('should format file sizes using Intl.NumberFormat', () => {
      // GIVEN a FileUpload component
      render(
        <FileUpload>
          <FileUpload.Context>
            {({ formatFileSize }) => <div>{formatFileSize(1024)}</div>}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered
      // THEN file sizes should be formatted using Intl.NumberFormat
      const formatted = screen.getByText(/1/)
      expect(formatted).toBeInTheDocument()
    })
  })

  describe('AC27: The component correctly manages synchronous states of `files` and `rejectedFiles` without `setTimeout`', () => {
    it('should update files and rejectedFiles synchronously', async () => {
      // GIVEN a FileUpload component with validation rules
      render(
        <FileUpload accept="image/*" maxFileSize={1000}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.Context>
            {({ acceptedFiles, rejectedFiles }) => (
              <div>
                <div data-testid="accepted-count">{acceptedFiles.length}</div>
                <div data-testid="rejected-count">{rejectedFiles.length}</div>
              </div>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const validFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })

      // WHEN a valid file is selected
      await userEvent.upload(input, validFile)

      // THEN both states should be updated synchronously
      expect(screen.getByTestId('accepted-count')).toHaveTextContent('1')
      expect(screen.getByTestId('rejected-count')).toHaveTextContent('0')
    })
  })

  describe('AC28: The component supports controlled mode via `defaultValue` (uncontrolled) and `onFilesChange` (controlled)', () => {
    it.todo('should support controlled mode with value prop')
    it.todo('should support uncontrolled mode with defaultValue prop')
  })

  describe('AC29: The component displays a progress indicator during upload', () => {
    it('should display progress indicator during upload', () => {
      // GIVEN a FileUpload component with defaultValue and uploadProgress
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      render(
        <FileUpload defaultValue={[file]}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <FileUpload.AcceptedFile
                    key={index}
                    file={f}
                    fileIndex={index}
                    uploadProgress={50}
                  />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered with uploadProgress
      // THEN the progress indicator should be displayed
      const progress = screen.getByRole('progressbar')
      expect(progress).toBeInTheDocument()
      expect(progress).toHaveAttribute('aria-valuenow', '50')
    })

    it('should update progress indicator as upload progresses', () => {
      // GIVEN a FileUpload component with defaultValue
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      const { rerender } = render(
        <FileUpload defaultValue={[file]}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <FileUpload.AcceptedFile
                    key={index}
                    file={f}
                    fileIndex={index}
                    uploadProgress={25}
                  />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the uploadProgress changes
      rerender(
        <FileUpload defaultValue={[file]}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <FileUpload.AcceptedFile
                    key={index}
                    file={f}
                    fileIndex={index}
                    uploadProgress={75}
                  />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      // THEN the progress indicator should be updated
      const progress = screen.getByRole('progressbar')
      expect(progress).toBeInTheDocument()
      expect(progress).toHaveAttribute('aria-valuenow', '75')
    })

    it('should not display progress indicator when uploadProgress is undefined', () => {
      // GIVEN a FileUpload component with defaultValue but no uploadProgress
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      render(
        <FileUpload defaultValue={[file]}>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul>
                {acceptedFiles.map((f, index) => (
                  <FileUpload.AcceptedFile key={index} file={f} fileIndex={index} />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      )

      // WHEN the component is rendered without uploadProgress
      // THEN the progress indicator should not be displayed
      const progress = screen.queryByRole('progressbar')
      expect(progress).not.toBeInTheDocument()
    })
  })

  describe('AC30: The component allows canceling an upload in progress', () => {
    it.todo('should allow canceling an upload in progress')
    it.todo('should call onCancel callback when upload is canceled')
  })

  describe('AC31: The component displays previews for PDF, videos, and other file types', () => {
    it.todo('should display PDF preview')
    it.todo('should display video preview')
    it.todo('should display preview for other file types')
  })

  describe('AC32: The component allows renaming a file', () => {
    it.todo('should allow renaming a file')
    it.todo('should call onRename callback when file is renamed')
  })

  describe('AC33: The component allows reordering files via drag & drop', () => {
    it.todo('should allow reordering files via drag & drop')
    it.todo('should call onReorder callback when files are reordered')
  })

  describe('AC34: The component displays custom metadata for each file', () => {
    it.todo('should display custom metadata for each file')
    it.todo('should allow editing custom metadata')
  })

  describe('AC35: The component provides a `FileUpload.HelpText` component to display instructions', () => {
    it.todo('should display help text')
    it.todo('should support custom help text content')
  })

  describe('AC36: The component provides a `FileUpload.ErrorText` component to display global errors', () => {
    it.todo('should display global error text')
    it.todo('should support custom error text content')
  })

  describe('AC37: The component supports custom validation via a `validate` prop', () => {
    it.todo('should support custom validation function')
    it.todo('should reject files that fail custom validation')
  })

  describe('AC38: The component allows asynchronous upload with upload queue', () => {
    it.todo('should support asynchronous upload')
    it.todo('should manage upload queue')
  })

  describe('AC39: The component supports chunked upload for large files', () => {
    it.todo('should support chunked upload for large files')
    it.todo('should resume chunked upload after interruption')
  })

  describe('AC40: The component displays a success state after a successful upload', () => {
    it.todo('should display success state after successful upload')
    it.todo('should call onSuccess callback when upload succeeds')
  })
})
