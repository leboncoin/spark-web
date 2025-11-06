import { Button } from '@spark-ui/components/button'
import { Icon } from '@spark-ui/components/icon'
import { IconButton } from '@spark-ui/components/icon-button'
import { TextLink } from '@spark-ui/components/text-link'
import { Export } from '@spark-ui/icons/Export'
import { Meta, StoryFn } from '@storybook/react-vite'

import { FileUpload } from '.'

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
    <FileUpload>
      <FileUpload.Trigger>
        <Icon>
          <Export />
        </Icon>
        Upload
      </FileUpload.Trigger>

      <FileUpload.FilesPreview />
    </FileUpload>
  )
}

export const Dropzone: StoryFn = () => {
  return (
    <FileUpload>
      <FileUpload.Dropzone>
        <Icon size="lg">
          <Export />
        </Icon>
        <div className="text-subhead">
          <p>Drag and drop a file or</p>

          <FileUpload.Trigger>browse my files</FileUpload.Trigger>
        </div>
        <p className="text-caption text-on-surface/dim-1">.png, .jpg up to 5MB</p>
      </FileUpload.Dropzone>
      <FileUpload.FilesPreview />
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

        <FileUpload.FilesPreview />
      </FileUpload>
      <FileUpload>
        <FileUpload.Trigger asChild>
          <IconButton aria-label="Upload">
            <Icon>
              <Export />
            </Icon>
          </IconButton>
        </FileUpload.Trigger>

        <FileUpload.FilesPreview />
      </FileUpload>
    </div>
  )
}

export const WithCustomFileRender: StoryFn = () => {
  return (
    <FileUpload>
      <FileUpload.Dropzone>
        <Button asChild>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </Button>
      </FileUpload.Dropzone>

      <FileUpload.FilesPreview
        className="flex flex-row flex-wrap"
        renderFile={(file, index) => (
          <li className="size-sz-160 border-sm border-outline relative overflow-hidden rounded-lg">
            <FileUpload.PreviewImage file={file} fallback="📄" className="size-full" />

            <FileUpload.ItemDeleteTrigger
              fileIndex={index}
              design="filled"
              intent="surface"
              className="top-md right-md absolute"
              aria-label="Delete file"
            />
          </li>
        )}
        renderEmpty={() => (
          <div className="py-md text-caption text-on-surface/dim-2 text-center">
            No files uploaded yet
          </div>
        )}
      />
    </FileUpload>
  )
}

export const WithDefaultFiles: StoryFn = () => {
  // Create sample files for demonstration
  const defaultFiles = [
    new File([''], 'landscape.jpg', { type: 'image/jpeg' }),
    new File([''], 'document.pdf', { type: 'application/pdf' }),
    new File([''], 'spreadsheet.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
  ]

  return (
    <FileUpload defaultValue={defaultFiles}>
      <FileUpload.Dropzone>
        <Button asChild>
          <FileUpload.Trigger>Upload Files</FileUpload.Trigger>
        </Button>
      </FileUpload.Dropzone>

      <FileUpload.FilesPreview />
    </FileUpload>
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

      <FileUpload.FilesPreview
        renderFile={(file, index) => (
          <FileUpload.Item className="gap-md bg-accent-container">
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
        )}
        renderEmpty={() => (
          <div className="py-md text-caption text-on-surface/dim-2 text-center">
            No files uploaded yet
          </div>
        )}
      />
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

        <FileUpload.FilesPreview
          renderFile={(file, index) => (
            <FileUpload.Item className="gap-md bg-accent-container">
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
          )}
          renderEmpty={() => (
            <div className="py-md text-caption text-on-surface/dim-2 text-center">
              No files uploaded yet. Upload some files to test focus management.
            </div>
          )}
        />
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

      <FileUpload.FilesPreview
        renderFile={(file, index) => (
          <FileUpload.Item className="gap-md bg-accent-container">
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
        )}
        renderEmpty={() => (
          <div className="py-md text-caption text-on-surface/dim-2 text-center">
            No files uploaded yet. Upload some files to test focus management.
          </div>
        )}
      />
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

        <FileUpload.FilesPreview
          renderFile={(file, index) => (
            <FileUpload.Item className="gap-md bg-accent-container">
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
          )}
        />

        {Array.from({ length: maxPhotos }).map((_, idx) => (
          <div
            key={idx}
            className="z-dropdown size-sz-144 border-sm border-outline pointer-events-none flex items-center justify-center rounded-lg"
          >
            Photo {idx + 1}
          </div>
        ))}
      </div>
      <FileUpload.FilesPreview />
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
        <div className="text-subhead">
          <p>Drag and drop a file or</p>

          <FileUpload.Trigger>browse my files</FileUpload.Trigger>
        </div>
        <p className="text-caption text-on-surface/dim-1">Select a single file</p>
      </FileUpload.Dropzone>
      <FileUpload.FilesPreview />
    </FileUpload>
  )
}
