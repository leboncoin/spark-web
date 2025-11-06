/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FileUpload } from '.'

describe('FileUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render file upload trigger', () => {
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </FileUpload>
      )

      expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument()
      expect(
        document.querySelector('[data-spark-component="file-upload-trigger"]')
      ).toBeInTheDocument()
    })

    it('should render files preview', () => {
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument()
    })

    it('should render dropzone', () => {
      render(
        <FileUpload>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
        </FileUpload>
      )

      const dropzone = screen.getByRole('button', { name: 'Drop files here' })
      expect(dropzone).toBeInTheDocument()
      expect(dropzone).toHaveAttribute('tabIndex', '0')
    })

    it('should render files preview with default items when files are present', () => {
      const files = [
        new File(['content'], 'test.jpg', { type: 'image/jpeg' }),
        new File(['content'], 'document.pdf', { type: 'application/pdf' }),
      ]

      render(
        <FileUpload defaultValue={files}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      expect(screen.getByText('test.jpg')).toBeInTheDocument()
      expect(screen.getByText('document.pdf')).toBeInTheDocument()
      expect(
        document.querySelector('[data-spark-component="file-upload-files-preview"]')
      ).toBeInTheDocument()
    })

    it('should not render files preview when no files are present', () => {
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      expect(
        document.querySelector('[data-spark-component="file-upload-files-preview"]')
      ).not.toBeInTheDocument()
    })
  })

  describe('File selection', () => {
    it('should add files when files are selected via input', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).toBeInTheDocument()

      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.png', { type: 'image/png' })

      await userEvent.upload(input, [file1, file2])

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file2.png')).toBeInTheDocument()
    })

    it('should append files when multiple selections are made', async () => {
      const onFilesChange = vi.fn()
      const initialFile = new File(['content'], 'initial.jpg', { type: 'image/jpeg' })

      render(
        <FileUpload defaultValue={[initialFile]} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const newFile = new File(['new content'], 'new.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, newFile)

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalled()
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(2)
        expect(lastCall?.[0]?.[0]?.name).toBe('initial.jpg')
        expect(lastCall?.[0]?.[1]?.name).toBe('new.jpg')
      })
    })
  })

  describe('File removal', () => {
    it('should remove file when delete button is clicked', async () => {
      const user = userEvent.setup()
      const onFilesChange = vi.fn()
      const files = [
        new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }),
        new File(['content2'], 'file2.png', { type: 'image/png' }),
        new File(['content3'], 'file3.pdf', { type: 'application/pdf' }),
      ]

      render(
        <FileUpload defaultValue={files} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const deleteButtons = screen.getAllByLabelText('Delete file')
      expect(deleteButtons).toHaveLength(3)

      const deleteButton = deleteButtons[1]
      if (deleteButton) {
        await user.click(deleteButton)
      }

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalled()
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(2)
        expect(lastCall?.[0]?.[0]?.name).toBe('file1.jpg')
        expect(lastCall?.[0]?.[1]?.name).toBe('file3.pdf')
      })

      expect(screen.queryByText('file2.png')).not.toBeInTheDocument()
      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file3.pdf')).toBeInTheDocument()
    })

    it('should remove all files when all delete buttons are clicked', async () => {
      const user = userEvent.setup()
      const onFilesChange = vi.fn()
      const files = [
        new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }),
        new File(['content2'], 'file2.png', { type: 'image/png' }),
      ]

      render(
        <FileUpload defaultValue={files} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      let deleteButtons = screen.getAllByLabelText('Delete file')
      expect(deleteButtons).toHaveLength(2)

      // Remove first file
      const firstButton = deleteButtons[0]
      if (firstButton) {
        await user.click(firstButton)
      }

      // Wait for first deletion to complete
      await waitFor(() => {
        expect(screen.queryByText('file1.jpg')).not.toBeInTheDocument()
      })

      // Remove second file (now at index 0)
      deleteButtons = screen.getAllByLabelText('Delete file')
      const secondButton = deleteButtons[0]
      if (secondButton) {
        await user.click(secondButton)
      }

      await waitFor(() => {
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(0)
      })

      expect(
        document.querySelector('[data-spark-component="file-upload-files-preview"]')
      ).not.toBeInTheDocument()
    })
  })

  describe('Default value', () => {
    it('should initialize with default files', () => {
      const files = [
        new File(['content'], 'default1.jpg', { type: 'image/jpeg' }),
        new File(['content'], 'default2.pdf', { type: 'application/pdf' }),
      ]

      render(
        <FileUpload defaultValue={files}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      expect(screen.getByText('default1.jpg')).toBeInTheDocument()
      expect(screen.getByText('default2.pdf')).toBeInTheDocument()
    })
  })

  describe('onFilesChange callback', () => {
    it('should call onFilesChange when files are added', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, file)

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalledTimes(1)
        expect(onFilesChange).toHaveBeenCalledWith([file])
      })
    })

    it('should call onFilesChange when files are removed', async () => {
      const user = userEvent.setup()
      const onFilesChange = vi.fn()
      const files = [
        new File(['content'], 'file1.jpg', { type: 'image/jpeg' }),
        new File(['content'], 'file2.png', { type: 'image/png' }),
      ]

      render(
        <FileUpload defaultValue={files} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const deleteButtons = screen.getAllByLabelText('Delete file')
      const deleteButton = deleteButtons[0]
      if (deleteButton) {
        await user.click(deleteButton)
      }

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalled()
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(1)
        expect(lastCall?.[0]?.[0]?.name).toBe('file2.png')
      })
    })
  })

  describe('Dropzone', () => {
    it('should trigger file selection when dropzone is clicked', async () => {
      const user = userEvent.setup()
      const inputClick = vi.fn()

      render(
        <FileUpload>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      input.click = inputClick

      const dropzone = screen.getByRole('button', { name: 'Drop files here' })
      await user.click(dropzone)

      expect(inputClick).toHaveBeenCalled()
    })

    it('should trigger file selection when Enter key is pressed on dropzone', async () => {
      const user = userEvent.setup()
      const inputClick = vi.fn()

      render(
        <FileUpload>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      input.click = inputClick

      const dropzone = screen.getByRole('button', { name: 'Drop files here' })
      dropzone.focus()
      await user.keyboard('{Enter}')

      expect(inputClick).toHaveBeenCalled()
    })

    it('should add files when files are dropped', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload onFilesChange={onFilesChange}>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const dropzone = screen.getByRole('button', { name: 'Drop files here' })
      const file1 = new File(['content1'], 'dropped1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'dropped2.png', { type: 'image/png' })

      // Simulate drag and drop by directly calling the drop handler
      const dropEvent = new Event('drop', { bubbles: true }) as any
      dropEvent.dataTransfer = {
        files: [file1, file2],
      }
      dropzone.dispatchEvent(dropEvent)

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalled()
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(2)
        expect(lastCall?.[0]?.[0]?.name).toBe('dropped1.jpg')
        expect(lastCall?.[0]?.[1]?.name).toBe('dropped2.png')
      })

      expect(screen.getByText('dropped1.jpg')).toBeInTheDocument()
      expect(screen.getByText('dropped2.png')).toBeInTheDocument()
    })
  })

  describe('Custom rendering', () => {
    it('should render custom file preview using renderFile', () => {
      const files = [
        new File(['content'], 'custom1.jpg', { type: 'image/jpeg' }),
        new File(['content'], 'custom2.pdf', { type: 'application/pdf' }),
      ]

      render(
        <FileUpload defaultValue={files}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview
            renderFile={(file, index) => (
              <li key={`${file.name}-${index}`} data-testid={`custom-file-${index}`}>
                Custom: {file.name}
              </li>
            )}
          />
        </FileUpload>
      )

      expect(screen.getByTestId('custom-file-0')).toHaveTextContent('Custom: custom1.jpg')
      expect(screen.getByTestId('custom-file-1')).toHaveTextContent('Custom: custom2.pdf')
    })

    it('should render custom empty state using renderEmpty', () => {
      render(
        <FileUpload>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview
            renderEmpty={() => <div data-testid="empty-state">No files uploaded yet</div>}
          />
        </FileUpload>
      )

      expect(screen.getByTestId('empty-state')).toBeInTheDocument()
      expect(screen.getByTestId('empty-state')).toHaveTextContent('No files uploaded yet')
    })

    it('should not render empty state when files are present', () => {
      const files = [new File(['content'], 'test.jpg', { type: 'image/jpeg' })]

      render(
        <FileUpload defaultValue={files}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview
            renderEmpty={() => <div data-testid="empty-state">No files uploaded yet</div>}
          />
        </FileUpload>
      )

      expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
    })
  })

  describe('Trigger', () => {
    it('should trigger file selection when trigger button is clicked', async () => {
      const user = userEvent.setup()
      const inputClick = vi.fn()

      render(
        <FileUpload>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      input.click = inputClick

      const trigger = screen.getByRole('button', { name: 'Upload Files' })
      await user.click(trigger)

      expect(inputClick).toHaveBeenCalled()
    })

    it('should render trigger with asChild prop', () => {
      render(
        <FileUpload>
          <FileUpload.Trigger asChild>
            <button type="button">Custom Trigger</button>
          </FileUpload.Trigger>
        </FileUpload>
      )

      expect(screen.getByRole('button', { name: 'Custom Trigger' })).toBeInTheDocument()
    })
  })

  describe('Multiple prop', () => {
    it('should allow multiple files by default', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).toHaveAttribute('multiple')

      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.png', { type: 'image/png' })

      await userEvent.upload(input, [file1, file2])

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file2.png')).toBeInTheDocument()
    })

    it('should not allow multiple files when multiple is false', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload multiple={false} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).not.toHaveAttribute('multiple')

      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.png', { type: 'image/png' })

      await userEvent.upload(input, [file1, file2])

      await waitFor(() => {
        // Only the first file should be added
        expect(onFilesChange).toHaveBeenCalledWith([file1])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.queryByText('file2.png')).not.toBeInTheDocument()
    })

    it('should replace existing file when multiple is false and new file is selected', async () => {
      const onFilesChange = vi.fn()
      const initialFile = new File(['content'], 'initial.jpg', { type: 'image/jpeg' })

      render(
        <FileUpload multiple={false} defaultValue={[initialFile]} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      expect(screen.getByText('initial.jpg')).toBeInTheDocument()

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const newFile = new File(['new content'], 'new.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, newFile)

      await waitFor(() => {
        // The new file should replace the initial file
        expect(onFilesChange).toHaveBeenCalledWith([newFile])
      })

      expect(screen.queryByText('initial.jpg')).not.toBeInTheDocument()
      expect(screen.getByText('new.jpg')).toBeInTheDocument()
    })

    it('should replace existing file when multiple is false and files are dropped', async () => {
      const onFilesChange = vi.fn()
      const initialFile = new File(['content'], 'initial.jpg', { type: 'image/jpeg' })

      render(
        <FileUpload multiple={false} defaultValue={[initialFile]} onFilesChange={onFilesChange}>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      expect(screen.getByText('initial.jpg')).toBeInTheDocument()

      const dropzone = screen.getByRole('button', { name: 'Drop files here' })
      const file1 = new File(['content1'], 'dropped1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'dropped2.png', { type: 'image/png' })

      // Simulate drag and drop
      const dropEvent = new Event('drop', { bubbles: true }) as any
      dropEvent.dataTransfer = {
        files: [file1, file2],
      }
      dropzone.dispatchEvent(dropEvent)

      await waitFor(() => {
        // Only the first dropped file should replace the initial file
        expect(onFilesChange).toHaveBeenCalled()
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(1)
        expect(lastCall?.[0]?.[0]?.name).toBe('dropped1.jpg')
      })

      expect(screen.queryByText('initial.jpg')).not.toBeInTheDocument()
      expect(screen.getByText('dropped1.jpg')).toBeInTheDocument()
      expect(screen.queryByText('dropped2.png')).not.toBeInTheDocument()
    })
  })

  describe('Accept prop', () => {
    it('should accept all files when accept is not provided', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).not.toHaveAttribute('accept')

      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.pdf', { type: 'application/pdf' })

      await userEvent.upload(input, [file1, file2])

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file2.pdf')).toBeInTheDocument()
    })

    it('should filter files by MIME type wildcard', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload accept="image/*" onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).toHaveAttribute('accept', 'image/*')

      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.png', { type: 'image/png' })
      const file3 = new File(['content3'], 'file3.pdf', { type: 'application/pdf' })

      await userEvent.upload(input, [file1, file2, file3])

      await waitFor(() => {
        // Only image files should be accepted
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file2.png')).toBeInTheDocument()
      expect(screen.queryByText('file3.pdf')).not.toBeInTheDocument()
    })

    it('should filter files by exact MIME type', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload accept="image/png,application/pdf" onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).toHaveAttribute('accept', 'image/png,application/pdf')

      const file1 = new File(['content1'], 'file1.png', { type: 'image/png' })
      const file2 = new File(['content2'], 'file2.pdf', { type: 'application/pdf' })
      const file3 = new File(['content3'], 'file3.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, [file1, file2, file3])

      await waitFor(() => {
        // Only PNG and PDF files should be accepted
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2])
      })

      expect(screen.getByText('file1.png')).toBeInTheDocument()
      expect(screen.getByText('file2.pdf')).toBeInTheDocument()
      expect(screen.queryByText('file3.jpg')).not.toBeInTheDocument()
    })

    it('should filter files by extension', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload accept=".pdf,.doc,.jpg" onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).toHaveAttribute('accept', '.pdf,.doc,.jpg')

      const file1 = new File(['content1'], 'file1.pdf', { type: 'application/pdf' })
      const file2 = new File(['content2'], 'file2.doc', { type: 'application/msword' })
      const file3 = new File(['content3'], 'file3.jpg', { type: 'image/jpeg' })
      const file4 = new File(['content4'], 'file4.png', { type: 'image/png' })

      await userEvent.upload(input, [file1, file2, file3, file4])

      await waitFor(() => {
        // Only files with .pdf, .doc, or .jpg extensions should be accepted
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2, file3])
      })

      expect(screen.getByText('file1.pdf')).toBeInTheDocument()
      expect(screen.getByText('file2.doc')).toBeInTheDocument()
      expect(screen.getByText('file3.jpg')).toBeInTheDocument()
      expect(screen.queryByText('file4.png')).not.toBeInTheDocument()
    })

    it('should filter files by mixed MIME types and extensions', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload accept="image/*,.pdf,.doc" onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).toHaveAttribute('accept', 'image/*,.pdf,.doc')

      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.pdf', { type: 'application/pdf' })
      const file3 = new File(['content3'], 'file3.doc', { type: 'application/msword' })
      const file4 = new File(['content4'], 'file4.txt', { type: 'text/plain' })

      await userEvent.upload(input, [file1, file2, file3, file4])

      await waitFor(() => {
        // Images, PDFs, and DOC files should be accepted
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2, file3])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file2.pdf')).toBeInTheDocument()
      expect(screen.getByText('file3.doc')).toBeInTheDocument()
      expect(screen.queryByText('file4.txt')).not.toBeInTheDocument()
    })

    it('should filter files when dropped on dropzone', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload accept="image/*" onFilesChange={onFilesChange}>
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const dropzone = screen.getByRole('button', { name: 'Drop files here' })
      const file1 = new File(['content1'], 'dropped1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'dropped2.pdf', { type: 'application/pdf' })

      // Simulate drag and drop
      const dropEvent = new Event('drop', { bubbles: true }) as any
      dropEvent.dataTransfer = {
        files: [file1, file2],
      }
      dropzone.dispatchEvent(dropEvent)

      await waitFor(() => {
        // Only image files should be accepted
        expect(onFilesChange).toHaveBeenCalled()
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(1)
        expect(lastCall?.[0]?.[0]?.name).toBe('dropped1.jpg')
      })

      expect(screen.getByText('dropped1.jpg')).toBeInTheDocument()
      expect(screen.queryByText('dropped2.pdf')).not.toBeInTheDocument()
    })

    it('should handle case-insensitive extension matching', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload accept=".PDF,.JPG" onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file1 = new File(['content1'], 'file1.PDF', { type: 'application/pdf' })
      const file2 = new File(['content2'], 'file2.jpg', { type: 'image/jpeg' })
      const file3 = new File(['content3'], 'file3.JPG', { type: 'image/jpeg' })

      await userEvent.upload(input, [file1, file2, file3])

      await waitFor(() => {
        // All files should be accepted (case-insensitive)
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2, file3])
      })

      expect(screen.getByText('file1.PDF')).toBeInTheDocument()
      expect(screen.getByText('file2.jpg')).toBeInTheDocument()
      expect(screen.getByText('file3.JPG')).toBeInTheDocument()
    })
  })

  describe('MaxFiles prop', () => {
    it('should limit the number of files when maxFiles is set', async () => {
      const onFilesChange = vi.fn()

      render(
        <FileUpload maxFiles={2} onFilesChange={onFilesChange}>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.png', { type: 'image/png' })
      const file3 = new File(['content3'], 'file3.pdf', { type: 'application/pdf' })

      await userEvent.upload(input, [file1, file2, file3])

      await waitFor(() => {
        // Only first 2 files should be added
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file2.png')).toBeInTheDocument()
      expect(screen.queryByText('file3.pdf')).not.toBeInTheDocument()
    })

    it('should call onMaxFilesReached when limit is exceeded', async () => {
      const onMaxFilesReached = vi.fn()
      const onFilesChange = vi.fn()

      render(
        <FileUpload
          maxFiles={2}
          onMaxFilesReached={onMaxFilesReached}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.png', { type: 'image/png' })
      const file3 = new File(['content3'], 'file3.pdf', { type: 'application/pdf' })

      await userEvent.upload(input, [file1, file2, file3])

      await waitFor(() => {
        // 3 files attempted, 2 accepted, 1 rejected
        expect(onMaxFilesReached).toHaveBeenCalledWith(2, 1)
      })
    })

    it('should reject all files when already at max', async () => {
      const onMaxFilesReached = vi.fn()
      const onFilesChange = vi.fn()
      const initialFiles = [
        new File(['content1'], 'initial1.jpg', { type: 'image/jpeg' }),
        new File(['content2'], 'initial2.png', { type: 'image/png' }),
      ]

      render(
        <FileUpload
          maxFiles={2}
          defaultValue={initialFiles}
          onMaxFilesReached={onMaxFilesReached}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      expect(screen.getByText('initial1.jpg')).toBeInTheDocument()
      expect(screen.getByText('initial2.png')).toBeInTheDocument()

      const initialCallCount = onFilesChange.mock.calls.length
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const newFile = new File(['content3'], 'new.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, newFile)

      await waitFor(() => {
        expect(onMaxFilesReached).toHaveBeenCalledWith(2, 1)
      })

      // onFilesChange should not be called again when files are rejected
      expect(onFilesChange).toHaveBeenCalledTimes(initialCallCount)
      expect(screen.queryByText('new.jpg')).not.toBeInTheDocument()
      // Initial files should still be present
      expect(screen.getByText('initial1.jpg')).toBeInTheDocument()
      expect(screen.getByText('initial2.png')).toBeInTheDocument()
    })

    it('should work with drag and drop', async () => {
      const onMaxFilesReached = vi.fn()
      const onFilesChange = vi.fn()

      render(
        <FileUpload
          maxFiles={2}
          onMaxFilesReached={onMaxFilesReached}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const dropzone = screen.getByRole('button', { name: 'Drop files here' })
      const file1 = new File(['content1'], 'dropped1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'dropped2.png', { type: 'image/png' })
      const file3 = new File(['content3'], 'dropped3.pdf', { type: 'application/pdf' })

      // Simulate drag and drop
      const dropEvent = new Event('drop', { bubbles: true }) as any
      dropEvent.dataTransfer = {
        files: [file1, file2, file3],
      }
      dropzone.dispatchEvent(dropEvent)

      await waitFor(() => {
        // 3 files attempted, 2 accepted, 1 rejected
        expect(onMaxFilesReached).toHaveBeenCalledWith(2, 1)
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(2)
      })

      expect(screen.getByText('dropped1.jpg')).toBeInTheDocument()
      expect(screen.getByText('dropped2.png')).toBeInTheDocument()
      expect(screen.queryByText('dropped3.pdf')).not.toBeInTheDocument()
    })

    it('should work with multiple=false', async () => {
      const onMaxFilesReached = vi.fn()
      const onFilesChange = vi.fn()

      render(
        <FileUpload
          multiple={false}
          maxFiles={1}
          onMaxFilesReached={onMaxFilesReached}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, file1)

      await waitFor(() => {
        expect(onFilesChange).toHaveBeenCalledWith([file1])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()

      // Try to add another file
      const file2 = new File(['content2'], 'file2.png', { type: 'image/png' })

      await userEvent.upload(input, file2)

      await waitFor(() => {
        expect(onMaxFilesReached).toHaveBeenCalledWith(1, 1)
        // File should be replaced (multiple=false), but maxFiles should prevent it
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(1)
        expect(lastCall?.[0]?.[0]?.name).toBe('file1.jpg')
      })

      expect(screen.queryByText('file2.png')).not.toBeInTheDocument()
    })

    it('should work with accept prop', async () => {
      const onMaxFilesReached = vi.fn()
      const onFilesChange = vi.fn()

      render(
        <FileUpload
          accept="image/*"
          maxFiles={2}
          onMaxFilesReached={onMaxFilesReached}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['content2'], 'file2.png', { type: 'image/png' })
      const file3 = new File(['content3'], 'file3.pdf', { type: 'application/pdf' })
      const file4 = new File(['content4'], 'file4.gif', { type: 'image/gif' })

      await userEvent.upload(input, [file1, file2, file3, file4])

      await waitFor(() => {
        // Only image files should be accepted, and only first 2 should be added
        expect(onFilesChange).toHaveBeenCalledWith([file1, file2])
        // 4 files attempted, accept filters to 3 images, maxFiles=2 accepts 2, so 1 rejected
        expect(onMaxFilesReached).toHaveBeenCalledWith(2, 1)
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.getByText('file2.png')).toBeInTheDocument()
      expect(screen.queryByText('file3.pdf')).not.toBeInTheDocument()
      expect(screen.queryByText('file4.gif')).not.toBeInTheDocument()
    })
  })

  describe('File size validation', () => {
    it('should filter files by maxFileSize', async () => {
      const onFileSizeError = vi.fn()
      const onFilesChange = vi.fn()
      const maxFileSize = 1024 // 1 KB

      render(
        <FileUpload
          maxFileSize={maxFileSize}
          onFileSizeError={onFileSizeError}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' }) // Small file
      const file2 = new File(['x'.repeat(2000)], 'file2.jpg', { type: 'image/jpeg' }) // Large file (> 1KB)

      await userEvent.upload(input, [file1, file2])

      await waitFor(() => {
        // Only the small file should be accepted
        expect(onFilesChange).toHaveBeenCalledWith([file1])
        expect(onFileSizeError).toHaveBeenCalled()
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.queryByText('file2.jpg')).not.toBeInTheDocument()
    })

    it('should call onFileSizeError when file exceeds maxFileSize', async () => {
      const onFileSizeError = vi.fn()
      const onFilesChange = vi.fn()
      const maxFileSize = 1024 // 1 KB

      render(
        <FileUpload
          maxFileSize={maxFileSize}
          onFileSizeError={onFileSizeError}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const largeFile = new File(['x'.repeat(2000)], 'large.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, largeFile)

      await waitFor(() => {
        expect(onFileSizeError).toHaveBeenCalledWith(
          largeFile,
          expect.stringContaining('is too large')
        )
        expect(onFileSizeError).toHaveBeenCalledWith(
          largeFile,
          expect.stringContaining('Maximum size is')
        )
      })
    })

    it('should filter files by minFileSize', async () => {
      const onFileSizeError = vi.fn()
      const onFilesChange = vi.fn()
      const minFileSize = 100 // 100 bytes

      render(
        <FileUpload
          minFileSize={minFileSize}
          onFileSizeError={onFileSizeError}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const smallFile = new File(['x'], 'small.jpg', { type: 'image/jpeg' }) // Very small file
      const largeFile = new File(['x'.repeat(200)], 'large.jpg', { type: 'image/jpeg' }) // Large enough file

      await userEvent.upload(input, [smallFile, largeFile])

      await waitFor(() => {
        // Only the large enough file should be accepted
        expect(onFilesChange).toHaveBeenCalledWith([largeFile])
        expect(onFileSizeError).toHaveBeenCalled()
      })

      expect(screen.queryByText('small.jpg')).not.toBeInTheDocument()
      expect(screen.getByText('large.jpg')).toBeInTheDocument()
    })

    it('should call onFileSizeError when file is smaller than minFileSize', async () => {
      const onFileSizeError = vi.fn()
      const onFilesChange = vi.fn()
      const minFileSize = 100 // 100 bytes

      render(
        <FileUpload
          minFileSize={minFileSize}
          onFileSizeError={onFileSizeError}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const smallFile = new File(['x'], 'small.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, smallFile)

      await waitFor(() => {
        expect(onFileSizeError).toHaveBeenCalledWith(
          smallFile,
          expect.stringContaining('is too small')
        )
        expect(onFileSizeError).toHaveBeenCalledWith(
          smallFile,
          expect.stringContaining('Minimum size is')
        )
      })
    })

    it('should filter files by both minFileSize and maxFileSize', async () => {
      const onFileSizeError = vi.fn()
      const onFilesChange = vi.fn()
      const minFileSize = 100 // 100 bytes
      const maxFileSize = 1024 // 1 KB

      render(
        <FileUpload
          minFileSize={minFileSize}
          maxFileSize={maxFileSize}
          onFileSizeError={onFileSizeError}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const tooSmall = new File(['x'], 'small.jpg', { type: 'image/jpeg' })
      const valid = new File(['x'.repeat(200)], 'valid.jpg', { type: 'image/jpeg' })
      const tooLarge = new File(['x'.repeat(2000)], 'large.jpg', { type: 'image/jpeg' })

      await userEvent.upload(input, [tooSmall, valid, tooLarge])

      await waitFor(() => {
        // Only the valid file should be accepted
        expect(onFilesChange).toHaveBeenCalledWith([valid])
        expect(onFileSizeError).toHaveBeenCalledTimes(2)
      })

      expect(screen.queryByText('small.jpg')).not.toBeInTheDocument()
      expect(screen.getByText('valid.jpg')).toBeInTheDocument()
      expect(screen.queryByText('large.jpg')).not.toBeInTheDocument()
    })

    it('should work with drag and drop', async () => {
      const onFileSizeError = vi.fn()
      const onFilesChange = vi.fn()
      const maxFileSize = 1024 // 1 KB

      render(
        <FileUpload
          maxFileSize={maxFileSize}
          onFileSizeError={onFileSizeError}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Dropzone>Drop files here</FileUpload.Dropzone>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const dropzone = screen.getByRole('button', { name: 'Drop files here' })
      const file1 = new File(['content1'], 'dropped1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['x'.repeat(2000)], 'dropped2.jpg', { type: 'image/jpeg' })

      // Simulate drag and drop
      const dropEvent = new Event('drop', { bubbles: true }) as any
      dropEvent.dataTransfer = {
        files: [file1, file2],
      }
      dropzone.dispatchEvent(dropEvent)

      await waitFor(() => {
        // Only the small file should be accepted
        expect(onFilesChange).toHaveBeenCalled()
        const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1]
        expect(lastCall?.[0]).toHaveLength(1)
        expect(lastCall?.[0]?.[0]?.name).toBe('dropped1.jpg')
        expect(onFileSizeError).toHaveBeenCalled()
      })

      expect(screen.getByText('dropped1.jpg')).toBeInTheDocument()
      expect(screen.queryByText('dropped2.jpg')).not.toBeInTheDocument()
    })

    it('should work with accept prop', async () => {
      const onFileSizeError = vi.fn()
      const onFilesChange = vi.fn()
      const maxFileSize = 1024 // 1 KB

      render(
        <FileUpload
          accept="image/*"
          maxFileSize={maxFileSize}
          onFileSizeError={onFileSizeError}
          onFilesChange={onFilesChange}
        >
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
          <FileUpload.FilesPreview />
        </FileUpload>
      )

      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      const file1 = new File(['content1'], 'file1.jpg', { type: 'image/jpeg' })
      const file2 = new File(['x'.repeat(2000)], 'file2.jpg', { type: 'image/jpeg' })
      const file3 = new File(['content3'], 'file3.pdf', { type: 'application/pdf' })

      await userEvent.upload(input, [file1, file2, file3])

      await waitFor(() => {
        // Only the small image file should be accepted (PDF is filtered by accept, large image by size)
        expect(onFilesChange).toHaveBeenCalledWith([file1])
      })

      expect(screen.getByText('file1.jpg')).toBeInTheDocument()
      expect(screen.queryByText('file2.jpg')).not.toBeInTheDocument()
      expect(screen.queryByText('file3.pdf')).not.toBeInTheDocument()
    })
  })
})
