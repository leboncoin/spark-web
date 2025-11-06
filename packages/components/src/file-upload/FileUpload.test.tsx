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
})
