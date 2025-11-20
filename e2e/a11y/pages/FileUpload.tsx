import { FileUpload } from '@spark-ui/components/file-upload'
import React from 'react'

export const A11yFileUpload = () => (
  <section>
    <FileUpload>
      <FileUpload.Dropzone>
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
                deleteButtonAriaLabel={`Delete ${file.name}`}
              />
            ))}
          </ul>
        )}
      </FileUpload.Context>
    </FileUpload>
  </section>
)
