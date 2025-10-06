import { FileUpload as Root } from './FileUpload'
import { Trigger } from './FileUploadTrigger'

export const FileUpload: typeof Root & {
  Trigger: typeof Trigger
} = Object.assign(Root, {
  Trigger,
})

FileUpload.displayName = 'FileUpload'
Trigger.displayName = 'FileUpload.Trigger'
