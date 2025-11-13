/* eslint-disable max-lines */
import { Button } from '@spark-ui/components/button'
import { Icon } from '@spark-ui/components/icon'
import { IconButton } from '@spark-ui/components/icon-button'
import { Tag } from '@spark-ui/components/tag'
import { TextLink } from '@spark-ui/components/text-link'
import { Export } from '@spark-ui/icons/Export'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useEffect, useRef, useState } from 'react'

import { FileUpload, type FileUploadFileError } from '.'

const meta: Meta<typeof FileUpload> = {
  title: 'Experimental/FileUpload',
  component: FileUpload,
  tags: ['data-entry'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Spark-Component-Specs?node-id=59809-7264&t=W6FxPCamO7mFQu07-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  return (
    <div className="gap-lg flex flex-row">
      <div className="gap-lg flex flex-1 flex-col">
        <Tag>Trigger</Tag>
        <FileUpload>
          <FileUpload.Trigger>
            <Icon>
              <Export />
            </Icon>
            Upload
          </FileUpload.Trigger>

          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul className="gap-md my-md flex default:flex-col">
                {acceptedFiles.map((file, index) => (
                  <FileUpload.AcceptedFile
                    key={`${file.name}-${file.size}-${index}`}
                    file={file}
                    fileIndex={index}
                  />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      </div>
      <div className="gap-lg flex flex-1 grow flex-col">
        <Tag>Trigger + Dropzone</Tag>
        <FileUpload>
          <FileUpload.Dropzone>
            <Icon size="lg">
              <Export />
            </Icon>
            <div className="text-subhead gap-md flex flex-col">
              <p>Drag and drop a file or</p>

              <FileUpload.Trigger>browse my files</FileUpload.Trigger>
            </div>
            <p className="text-caption text-on-surface/dim-1">.png, .jpg up to 5MB</p>
          </FileUpload.Dropzone>
          <FileUpload.Context>
            {({ acceptedFiles }) => (
              <ul className="gap-md my-md flex default:flex-col">
                {acceptedFiles.map((file, index) => (
                  <FileUpload.AcceptedFile
                    key={`${file.name}-${file.size}-${index}`}
                    file={file}
                    fileIndex={index}
                  />
                ))}
              </ul>
            )}
          </FileUpload.Context>
        </FileUpload>
      </div>
    </div>
  )
}

export const Dropzone: StoryFn = () => {
  return (
    <FileUpload>
      <FileUpload.Dropzone>
        <Icon size="lg">
          <Export />
        </Icon>
        <div className="text-subhead gap-md flex flex-col">
          <p>Drag and drop a file or</p>

          <FileUpload.Trigger>browse my files</FileUpload.Trigger>
        </div>
        <p className="text-caption text-on-surface/dim-1">.png, .jpg up to 5MB</p>
      </FileUpload.Dropzone>
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <ul className="gap-md my-md flex default:flex-col">
            {acceptedFiles.map((file, index) => (
              <FileUpload.AcceptedFile
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                fileIndex={index}
              />
            ))}
          </ul>
        )}
      </FileUpload.Context>
    </FileUpload>
  )
}

export const CustomTrigger: StoryFn = () => {
  return (
    <div>
      <FileUpload>
        <TextLink asChild>
          <FileUpload.Trigger unstyled>As a link</FileUpload.Trigger>
        </TextLink>

        <FileUpload.Context>
          {({ acceptedFiles }) => (
            <ul className="gap-md my-md flex default:flex-col">
              {acceptedFiles.map((file, index) => (
                <FileUpload.AcceptedFile
                  key={`${file.name}-${file.size}-${index}`}
                  file={file}
                  fileIndex={index}
                />
              ))}
            </ul>
          )}
        </FileUpload.Context>
      </FileUpload>
      <FileUpload>
        <FileUpload.Trigger asChild>
          <IconButton aria-label="Upload">
            <Icon>
              <Export />
            </Icon>
          </IconButton>
        </FileUpload.Trigger>

        <FileUpload.Context>
          {({ acceptedFiles }) => (
            <ul className="gap-md my-md flex default:flex-col">
              {acceptedFiles.map((file, index) => (
                <FileUpload.AcceptedFile
                  key={`${file.name}-${file.size}-${index}`}
                  file={file}
                  fileIndex={index}
                />
              ))}
            </ul>
          )}
        </FileUpload.Context>
      </FileUpload>
    </div>
  )
}

export const WithCustomFileRender: StoryFn = () => {
  // Helper function to create image files with real SVG data
  const createImageFile = (name: string, svgContent: string): File => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })

    return new File([blob], name, { type: 'image/svg+xml' })
  }

  // Create sample image files with real SVG data for demonstration
  const landscapeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="landscapeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#87CEEB;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#landscapeGrad)"/>
    <ellipse cx="400" cy="450" rx="300" ry="100" fill="#90EE90" opacity="0.8"/>
    <circle cx="150" cy="150" r="60" fill="#FFD700" opacity="0.9"/>
    <polygon points="200,200 250,100 300,200" fill="#8B4513"/>
    <polygon points="250,100 300,50 350,100" fill="#228B22"/>
  </svg>`

  const portraitSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <defs>
      <linearGradient id="portraitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FF6B9D;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#C44569;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8B2E5C;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="600" height="800" fill="url(#portraitGrad)"/>
    <circle cx="300" cy="250" r="80" fill="#FFE5B4"/>
    <ellipse cx="300" cy="400" rx="120" ry="180" fill="#FFB6C1"/>
    <rect x="250" y="550" width="100" height="200" rx="10" fill="#8B4513"/>
  </svg>`

  const defaultFiles = [
    createImageFile('landscape.svg', landscapeSvg),
    createImageFile('portrait.svg', portraitSvg),
  ]

  return (
    <FileUpload defaultValue={defaultFiles}>
      <FileUpload.Dropzone>
        <Button asChild>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </Button>
      </FileUpload.Dropzone>

      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.length === 0 ? (
            <div className="py-md text-caption text-on-surface/dim-2 text-center">
              No files uploaded yet
            </div>
          ) : (
            <ul className="gap-md my-md flex flex-row flex-wrap">
              {acceptedFiles.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}-${index}`}
                  className="size-sz-160 relative overflow-hidden rounded-lg shadow-md"
                >
                  <FileUpload.PreviewImage file={file} fallback="📄" className="size-full" />

                  <FileUpload.ItemDeleteTrigger
                    fileIndex={index}
                    design="filled"
                    intent="surface"
                    className="top-md right-md absolute"
                    aria-label="Delete file"
                  />

                  <Tag asChild className="bottom-md absolute left-1/2 -translate-x-1/2">
                    <FileUpload.ItemFileName>{file.name}</FileUpload.ItemFileName>
                  </Tag>
                </li>
              ))}
            </ul>
          )
        }
      </FileUpload.Context>
    </FileUpload>
  )
}

export const WithDefaultFiles: StoryFn = () => {
  // Create sample files for demonstration with different sizes to showcase all units
  const defaultFiles = [
    new File([new ArrayBuffer(500)], 'small.txt', { type: 'text/plain' }), // 500 bytes
    new File([new ArrayBuffer(1024 * 1.5)], 'medium.jpg', { type: 'image/jpeg' }), // 1.5 KB
    new File([new ArrayBuffer(1024 * 1024 * 2.3)], 'large.pdf', { type: 'application/pdf' }), // 2.3 MB
    new File([new ArrayBuffer(1024 * 1024 * 1024 * 1.8)], 'huge.mp4', {
      type: 'video/mp4',
    }), // 1.8 GB
  ]

  return (
    <FileUpload defaultValue={defaultFiles}>
      <FileUpload.Dropzone>
        <Button asChild>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </Button>
      </FileUpload.Dropzone>

      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <ul className="gap-md my-md flex default:flex-col">
            {acceptedFiles.map((file, index) => (
              <FileUpload.AcceptedFile
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                fileIndex={index}
              />
            ))}
          </ul>
        )}
      </FileUpload.Context>
    </FileUpload>
  )
}

export const Controlled: StoryFn = () => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="gap-lg flex flex-col">
      <div className="gap-md flex flex-col">
        <p className="text-body-2">
          In controlled mode, the component's files are managed by external state via the{' '}
          <code className="text-caption bg-surface-container px-xs py-xxs rounded-sm">value</code>{' '}
          prop. Use{' '}
          <code className="text-caption bg-surface-container px-xs py-xxs rounded-sm">
            onFilesChange
          </code>{' '}
          to update your state when files are added or removed.
        </p>
        <div className="gap-sm flex">
          <Button
            onClick={() => {
              const newFile = new File(['content'], `file-${Date.now()}.txt`, {
                type: 'text/plain',
              })
              setFiles(prev => [...prev, newFile])
            }}
          >
            Add File Programmatically
          </Button>
          <Button
            onClick={() => {
              setFiles([])
            }}
            design="outlined"
          >
            Clear All Files
          </Button>
        </div>
        <p className="text-caption text-on-surface/dim-2">
          Current files count: <strong>{files.length}</strong>
        </p>
      </div>

      <FileUpload value={files} onFilesChange={setFiles}>
        <FileUpload.Dropzone>
          <Button asChild>
            <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
          </Button>
        </FileUpload.Dropzone>

        <FileUpload.Context>
          {({ acceptedFiles }) => (
            <ul className="gap-md my-md flex default:flex-col">
              {acceptedFiles.map((file, index) => (
                <FileUpload.AcceptedFile
                  key={`${file.name}-${file.size}-${index}`}
                  file={file}
                  fileIndex={index}
                />
              ))}
            </ul>
          )}
        </FileUpload.Context>
      </FileUpload>
    </div>
  )
}

export const CustomDeleteButton: StoryFn = () => {
  return (
    <FileUpload>
      <FileUpload.Dropzone>
        <Button asChild>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </Button>
      </FileUpload.Dropzone>

      <FileUpload.Context>
        {({ acceptedFiles, formatFileSize, locale }) =>
          acceptedFiles.length === 0 ? (
            <div className="py-md text-caption text-on-surface/dim-2 text-center">
              No files uploaded yet
            </div>
          ) : (
            <ul className="gap-md my-md flex default:flex-col">
              {acceptedFiles.map((file, index) => (
                <FileUpload.Item
                  key={`${file.name}-${file.size}-${index}`}
                  className="gap-md bg-accent-container"
                >
                  <FileUpload.PreviewImage file={file} fallback="📄" />
                  <div className="flex-1">
                    <FileUpload.ItemFileName className="text-on-accent-container font-medium">
                      {file.name}
                    </FileUpload.ItemFileName>
                    <FileUpload.ItemSizeText className="text-on-accent-container/dim-2">
                      {formatFileSize(file.size, locale)}
                    </FileUpload.ItemSizeText>
                  </div>
                  <FileUpload.ItemDeleteTrigger
                    fileIndex={index}
                    design="filled"
                    intent="danger"
                    size="md"
                    aria-label={`Remove ${file.name}`}
                  />
                </FileUpload.Item>
              ))}
            </ul>
          )
        }
      </FileUpload.Context>
    </FileUpload>
  )
}

export const FocusTest: StoryFn = () => {
  return (
    <div className="space-y-lg">
      <h3 className="text-heading-3">Test de gestion du focus</h3>
      <p className="text-body-2 text-on-surface/dim-2">
        Uploadez plusieurs fichiers, puis supprimez-les avec Tab + Enter pour tester la gestion du
        focus. Le focus devrait aller sur le bouton suivant, ou sur le précédent si c'est le
        dernier.
      </p>

      <FileUpload>
        <FileUpload.Dropzone>
          <Button asChild>
            <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
          </Button>
        </FileUpload.Dropzone>

        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.length === 0 ? (
              <div className="py-md text-caption text-on-surface/dim-2 text-center">
                No files uploaded yet. Upload some files to test focus management.
              </div>
            ) : (
              <ul className="gap-md my-md flex default:flex-col">
                {acceptedFiles.map((file, index) => (
                  <FileUpload.Item
                    key={`${file.name}-${file.size}-${index}`}
                    className="gap-md bg-accent-container"
                  >
                    <FileUpload.PreviewImage file={file} fallback="📄" />
                    <div className="flex-1">
                      <FileUpload.ItemFileName className="text-on-accent-container font-medium">
                        {file.name} (index: {index})
                      </FileUpload.ItemFileName>
                      <FileUpload.ItemSizeText className="text-on-accent-container/dim-2">
                        {`${(file.size / 1024).toFixed(1)} KB`}
                      </FileUpload.ItemSizeText>
                    </div>
                    <FileUpload.ItemDeleteTrigger
                      fileIndex={index}
                      design="filled"
                      intent="danger"
                      size="md"
                      aria-label={`Remove ${file.name}`}
                    />
                  </FileUpload.Item>
                ))}
              </ul>
            )
          }
        </FileUpload.Context>
      </FileUpload>
    </div>
  )
}

export const FocusManagement: StoryFn = () => {
  return (
    <FileUpload>
      <FileUpload.Dropzone>
        <Button asChild>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </Button>
      </FileUpload.Dropzone>

      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.length === 0 ? (
            <div className="py-md text-caption text-on-surface/dim-2 text-center">
              No files uploaded yet. Upload some files to test focus management.
            </div>
          ) : (
            <ul className="gap-md my-md flex default:flex-col">
              {acceptedFiles.map((file, index) => (
                <FileUpload.Item
                  key={`${file.name}-${file.size}-${index}`}
                  className="gap-md bg-accent-container"
                >
                  <FileUpload.PreviewImage file={file} fallback="📄" />
                  <div className="flex-1">
                    <FileUpload.ItemFileName className="text-on-accent-container font-medium">
                      {file.name}
                    </FileUpload.ItemFileName>
                    <FileUpload.ItemSizeText className="text-on-accent-container/dim-2">
                      {`${(file.size / 1024).toFixed(1)} KB`}
                    </FileUpload.ItemSizeText>
                  </div>
                  <FileUpload.ItemDeleteTrigger
                    fileIndex={index}
                    design="filled"
                    intent="danger"
                    size="md"
                    aria-label={`Remove ${file.name}`}
                  />
                </FileUpload.Item>
              ))}
            </ul>
          )
        }
      </FileUpload.Context>
    </FileUpload>
  )
}

export const PhotosGallery: StoryFn = () => {
  const maxPhotos = 5
  const remainingPhotos = maxPhotos

  return (
    <FileUpload>
      <FileUpload.Dropzone unstyled className="bg-success absolute inset-0" />

      <div className="gap-xl flex flex-wrap">
        <div className="z-dropdown size-sz-144 border-sm border-outline flex items-center justify-center rounded-lg">
          Add {remainingPhotos} pictures
        </div>

        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.length > 0 && (
              <ul className="gap-md my-md flex default:flex-col">
                {acceptedFiles.map((file, index) => (
                  <FileUpload.Item
                    key={`${file.name}-${file.size}-${index}`}
                    className="gap-md bg-accent-container"
                  >
                    <FileUpload.PreviewImage file={file} fallback="📄" />
                    <div className="flex-1">
                      <FileUpload.ItemFileName className="text-on-accent-container font-medium">
                        {file.name}
                      </FileUpload.ItemFileName>
                      <FileUpload.ItemSizeText className="text-on-accent-container/dim-2">
                        {`${(file.size / 1024).toFixed(1)} KB`}
                      </FileUpload.ItemSizeText>
                    </div>
                    <FileUpload.ItemDeleteTrigger
                      fileIndex={index}
                      className="text-error hover:text-error-hovered focus-visible:u-outline"
                      aria-label="Delete file"
                    />
                  </FileUpload.Item>
                ))}
              </ul>
            )
          }
        </FileUpload.Context>

        {Array.from({ length: maxPhotos }).map((_, idx) => (
          <div
            key={idx}
            className="z-dropdown size-sz-144 border-sm border-outline pointer-events-none flex items-center justify-center rounded-lg"
          >
            Photo {idx + 1}
          </div>
        ))}
      </div>
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <ul className="gap-md my-md flex default:flex-col">
            {acceptedFiles.map((file, index) => (
              <FileUpload.AcceptedFile
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                fileIndex={index}
              />
            ))}
          </ul>
        )}
      </FileUpload.Context>
    </FileUpload>
  )
}

export const SingleFile: StoryFn = () => {
  return (
    <FileUpload multiple={false}>
      <FileUpload.Dropzone>
        <Icon size="lg">
          <Export />
        </Icon>
        <div className="text-subhead gap-md flex flex-col">
          <p>Drag and drop a file or</p>

          <FileUpload.Trigger>browse my files</FileUpload.Trigger>
        </div>
        <p className="text-caption text-on-surface/dim-1">Select a single file</p>
      </FileUpload.Dropzone>
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <ul className="gap-md my-md flex default:flex-col">
            {acceptedFiles.map((file, index) => (
              <FileUpload.AcceptedFile
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                fileIndex={index}
              />
            ))}
          </ul>
        )}
      </FileUpload.Context>
    </FileUpload>
  )
}

export const Disabled: StoryFn = () => {
  const defaultFiles = [
    new File([new ArrayBuffer(1024 * 500)], 'landscape.jpg', { type: 'image/jpeg' }), // ~500 KB
    new File([new ArrayBuffer(1024 * 200)], 'document.pdf', { type: 'application/pdf' }), // ~200 KB
  ]

  return (
    <FileUpload disabled defaultValue={defaultFiles}>
      <FileUpload.Dropzone>
        <Icon size="lg">
          <Export />
        </Icon>
        <div className="text-subhead gap-md flex flex-col">
          <p>Drag and drop files or</p>

          <FileUpload.Trigger>browse my files</FileUpload.Trigger>
        </div>
        <p className="text-caption text-on-surface/dim-1">Disabled state</p>
      </FileUpload.Dropzone>
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <ul className="gap-md my-md flex default:flex-col">
            {acceptedFiles.map((file, index) => (
              <FileUpload.AcceptedFile
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                fileIndex={index}
              />
            ))}
          </ul>
        )}
      </FileUpload.Context>
    </FileUpload>
  )
}

export const ReadOnly: StoryFn = () => {
  const defaultFiles = [
    new File([new ArrayBuffer(1024 * 500)], 'landscape.jpg', { type: 'image/jpeg' }), // ~500 KB
    new File([new ArrayBuffer(1024 * 200)], 'document.pdf', { type: 'application/pdf' }), // ~200 KB
  ]

  return (
    <FileUpload readOnly defaultValue={defaultFiles}>
      <FileUpload.Dropzone>
        <Icon size="lg">
          <Export />
        </Icon>
        <div className="text-subhead gap-md flex flex-col">
          <p>Drag and drop files or</p>

          <FileUpload.Trigger>browse my files</FileUpload.Trigger>
        </div>
        <p className="text-caption text-on-surface/dim-1">Read-only state</p>
      </FileUpload.Dropzone>
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <ul className="gap-md my-md flex default:flex-col">
            {acceptedFiles.map((file, index) => (
              <FileUpload.AcceptedFile
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                fileIndex={index}
              />
            ))}
          </ul>
        )}
      </FileUpload.Context>
    </FileUpload>
  )
}

export const ErrorHandling: StoryFn = () => {
  const errorMessages: Record<FileUploadFileError, string> = {
    TOO_MANY_FILES: 'Too many files selected (max 3 allowed)',
    FILE_INVALID_TYPE: 'Invalid file type (only images and PDFs allowed)',
    FILE_TOO_LARGE: 'File too large (max 1MB)',
    FILE_TOO_SMALL: 'File too small (min 1KB)',
    FILE_INVALID: 'Invalid file',
    FILE_EXISTS: 'File already exists',
  }

  return (
    <FileUpload
      maxFiles={3}
      maxFileSize={1024 * 1024} // 1MB
      minFileSize={1024} // 1KB
      accept="image/*,application/pdf"
    >
      <FileUpload.Dropzone>
        <Icon size="lg">
          <Export />
        </Icon>
        <div className="text-subhead gap-md flex flex-col">
          <p>Drag and drop files or</p>

          <FileUpload.Trigger>Select Files</FileUpload.Trigger>
        </div>
        <p className="text-caption text-on-surface/dim-1">
          File Upload with Validation (max 3 files, 1KB-1MB, images/PDFs only)
        </p>
      </FileUpload.Dropzone>

      {/* Using Context with AcceptedFile and RejectedFile components */}
      <FileUpload.Context>
        {({ acceptedFiles, rejectedFiles, ...rest }) => {
          console.log(rest, acceptedFiles, rejectedFiles)

          return (
            <div className="mt-lg">
              {acceptedFiles.length ? (
                <ul className="gap-md my-md flex default:flex-col">
                  {acceptedFiles.map((file, index) => (
                    <FileUpload.AcceptedFile
                      key={`${file.name}-${file.size}-${index}`}
                      file={file}
                      fileIndex={index}
                    />
                  ))}
                </ul>
              ) : null}

              {rejectedFiles.length ? (
                <ul className="gap-md my-md flex default:flex-col">
                  {rejectedFiles.map((rejectedFile, index) => (
                    <FileUpload.RejectedFile
                      key={`rejected-${rejectedFile.file.name}-${rejectedFile.file.size}-${index}`}
                      rejectedFile={rejectedFile}
                      rejectedFileIndex={index}
                      renderError={error => errorMessages[error] || `❓ ${error}`}
                      data-status="rejected"
                    />
                  ))}
                </ul>
              ) : null}
            </div>
          )
        }}
      </FileUpload.Context>
    </FileUpload>
  )
}

export const WithProgress: StoryFn = () => {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({})
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const previousFilesLengthRef = useRef<number>(0)

  // Automatically trigger upload when files are added
  useEffect(() => {
    // Only start upload if new files were added (not on initial render)
    if (files.length > previousFilesLengthRef.current) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      // Initialize progress for new files only
      setUploadProgress(prev => {
        const initialProgress: Record<number, number> = { ...prev }
        files.forEach((_, index) => {
          // Only initialize progress for new files (those without progress)
          if (initialProgress[index] === undefined) {
            initialProgress[index] = 0
          }
        })

        return initialProgress
      })

      // Simulate upload progress
      intervalRef.current = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress: Record<number, number> = {}
          let allComplete = true

          files.forEach((_, index) => {
            const current = prev[index] ?? 0

            if (current < 100) {
              // Simulate variable upload speed (10-20% per interval)
              const increment = Math.random() * 10 + 10
              newProgress[index] = Math.min(current + increment, 100)
              allComplete = false
            } else {
              newProgress[index] = 100
            }
          })

          if (allComplete) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
          }

          return newProgress
        })
      }, 300)
    }

    previousFilesLengthRef.current = files.length

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [files])

  // Check if at least one file is uploading (progress < 100)
  const isUploading = files.some((_, index) => {
    const progress = uploadProgress[index]

    return progress !== undefined && progress < 100
  })

  return (
    <FileUpload onFilesChange={setFiles}>
      <FileUpload.Dropzone>
        <Icon size="lg">
          <Export />
        </Icon>
        <div className="text-subhead gap-md flex flex-col">
          <p>Drag and drop files or</p>

          <FileUpload.Trigger isLoading={isUploading} loadingText="Uploading files...">
            browse my files
          </FileUpload.Trigger>
        </div>
        <p className="text-caption text-on-surface/dim-1">
          Files will automatically start uploading with progress indicator
        </p>
      </FileUpload.Dropzone>
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <ul className="gap-md my-md flex default:flex-col">
            {acceptedFiles.map((file, index) => (
              <FileUpload.AcceptedFile
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                fileIndex={index}
                uploadProgress={uploadProgress[index]}
              />
            ))}
          </ul>
        )}
      </FileUpload.Context>
    </FileUpload>
  )
}
