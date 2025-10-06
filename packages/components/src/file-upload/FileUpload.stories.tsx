import { Meta, StoryFn } from '@storybook/react-vite'

import { Button } from '../button'
import { TextLink } from '../text-link'
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
    <div>
      <FileUpload>
        <Button asChild>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </Button>
      </FileUpload>

      <FileUpload>
        <TextLink asChild>
          <FileUpload.Trigger>Upload</FileUpload.Trigger>
        </TextLink>
      </FileUpload>
    </div>
  )
}
