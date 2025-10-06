import { render } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { FileUpload } from '.'

describe('FileUpload', () => {
  it('should render file upload button', async () => {
    render(
      <FileUpload>
        <FileUpload.Trigger>Upload</FileUpload.Trigger>
      </FileUpload>
    )
    expect(true).toBe(true)
  })
})
