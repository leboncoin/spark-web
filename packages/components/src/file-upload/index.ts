import {
  type FileAcceptDetails,
  type FileChangeDetails,
  type FileRejectDetails,
  FileUpload as Root,
  type FileUploadFileError,
  type RejectedFile,
} from './FileUpload'
import { AcceptedFile } from './FileUploadAcceptedFile'
import { Context } from './FileUploadContext'
import { Dropzone } from './FileUploadDropzone'
import { ItemDeleteTrigger } from './FileUploadItemDeleteTrigger'
import { PreviewImage } from './FileUploadPreviewImage'
import { RejectedFile as RejectedFileComponent } from './FileUploadRejectedFile'
import { RejectedFileDeleteTrigger } from './FileUploadRejectedFileDeleteTrigger'
import { Trigger } from './FileUploadTrigger'

export type {
  FileAcceptDetails,
  FileChangeDetails,
  FileRejectDetails,
  RejectedFile,
  FileUploadFileError,
}

export const FileUpload: typeof Root & {
  Trigger: typeof Trigger
  Dropzone: typeof Dropzone
  Context: typeof Context
  ItemDeleteTrigger: typeof ItemDeleteTrigger
  PreviewImage: typeof PreviewImage
  AcceptedFile: typeof AcceptedFile
  RejectedFile: typeof RejectedFileComponent
  RejectedFileDeleteTrigger: typeof RejectedFileDeleteTrigger
} = Object.assign(Root, {
  // Main input components
  Trigger,
  Dropzone,
  // Context components
  Context,
  AcceptedFile,
  RejectedFile: RejectedFileComponent,
  // Helpers for custom renders
  PreviewImage,
  ItemDeleteTrigger,
  RejectedFileDeleteTrigger,
})

FileUpload.displayName = 'FileUpload'
Trigger.displayName = 'FileUpload.Trigger'
Dropzone.displayName = 'FileUpload.Dropzone'
Context.displayName = 'FileUpload.Context'
ItemDeleteTrigger.displayName = 'FileUpload.ItemDeleteTrigger'
PreviewImage.displayName = 'FileUpload.PreviewImage'
AcceptedFile.displayName = 'FileUpload.AcceptedFile'
RejectedFileComponent.displayName = 'FileUpload.RejectedFile'
RejectedFileDeleteTrigger.displayName = 'FileUpload.RejectedFileDeleteTrigger'
