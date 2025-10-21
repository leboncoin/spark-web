import { FileUpload as Root } from './FileUpload'
import { Dropzone } from './FileUploadDropzone'
import { FilesPreview } from './FileUploadFilesPreview'
import { Item } from './FileUploadItem'
import { ItemDeleteTrigger } from './FileUploadItemDeleteTrigger'
import { ItemFileName } from './FileUploadItemFileName'
import { ItemSizeText } from './FileUploadItemSizeText'
import { PreviewImage } from './FileUploadPreviewImage'
import { Trigger } from './FileUploadTrigger'

export const FileUpload: typeof Root & {
  Trigger: typeof Trigger
  Dropzone: typeof Dropzone
  FilesPreview: typeof FilesPreview
  Item: typeof Item
  ItemFileName: typeof ItemFileName
  ItemSizeText: typeof ItemSizeText
  ItemDeleteTrigger: typeof ItemDeleteTrigger
  PreviewImage: typeof PreviewImage
} = Object.assign(Root, {
  Trigger,
  Dropzone,
  FilesPreview,
  Item,
  ItemFileName,
  ItemSizeText,
  ItemDeleteTrigger,
  PreviewImage,
})

FileUpload.displayName = 'FileUpload'
Trigger.displayName = 'FileUpload.Trigger'
Dropzone.displayName = 'FileUpload.Dropzone'
FilesPreview.displayName = 'FileUpload.FilesPreview'
Item.displayName = 'FileUpload.Item'
ItemFileName.displayName = 'FileUpload.ItemFileName'
ItemSizeText.displayName = 'FileUpload.ItemSizeText'
ItemDeleteTrigger.displayName = 'FileUpload.ItemDeleteTrigger'
PreviewImage.displayName = 'FileUpload.PreviewImage'
