import { FileUpload as Root, type FileUploadFileError, type RejectedFile } from './FileUpload'
import { AcceptedFile } from './FileUploadAcceptedFile'
import { Context } from './FileUploadContext'
import { Dropzone } from './FileUploadDropzone'
import { Item } from './FileUploadItem'
import { ItemDeleteTrigger } from './FileUploadItemDeleteTrigger'
import { ItemFileName } from './FileUploadItemFileName'
import { ItemSizeText } from './FileUploadItemSizeText'
import { PreviewImage } from './FileUploadPreviewImage'
import { RejectedFile as RejectedFileComponent } from './FileUploadRejectedFile'
import { RejectedFileDeleteTrigger } from './FileUploadRejectedFileDeleteTrigger'
import { Trigger } from './FileUploadTrigger'

export type { RejectedFile, FileUploadFileError }

export const FileUpload: typeof Root & {
  Trigger: typeof Trigger
  Dropzone: typeof Dropzone
  Context: typeof Context
  Item: typeof Item
  ItemFileName: typeof ItemFileName
  ItemSizeText: typeof ItemSizeText
  ItemDeleteTrigger: typeof ItemDeleteTrigger
  PreviewImage: typeof PreviewImage
  AcceptedFile: typeof AcceptedFile
  RejectedFile: typeof RejectedFileComponent
  RejectedFileDeleteTrigger: typeof RejectedFileDeleteTrigger
} = Object.assign(Root, {
  Trigger,
  Dropzone,
  Context,
  Item,
  ItemFileName,
  ItemSizeText,
  ItemDeleteTrigger,
  PreviewImage,
  AcceptedFile,
  RejectedFile: RejectedFileComponent,
  RejectedFileDeleteTrigger,
})

FileUpload.displayName = 'FileUpload'
Trigger.displayName = 'FileUpload.Trigger'
Dropzone.displayName = 'FileUpload.Dropzone'
Context.displayName = 'FileUpload.Context'
Item.displayName = 'FileUpload.Item'
ItemFileName.displayName = 'FileUpload.ItemFileName'
ItemSizeText.displayName = 'FileUpload.ItemSizeText'
ItemDeleteTrigger.displayName = 'FileUpload.ItemDeleteTrigger'
PreviewImage.displayName = 'FileUpload.PreviewImage'
AcceptedFile.displayName = 'FileUpload.AcceptedFile'
RejectedFileComponent.displayName = 'FileUpload.RejectedFile'
RejectedFileDeleteTrigger.displayName = 'FileUpload.RejectedFileDeleteTrigger'
