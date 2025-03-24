import React from 'react'

import { IconProps } from '../Types'

export const TrashCloseFill = ({
  title,
  fill = 'currentColor',
  stroke = 'none',
  ref,
  ...props
}: IconProps) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    data-title="TrashCloseFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m19.9,6.15h-3.76c-.08-1.06-.47-2.11-1.25-2.85-.78-.81-1.88-1.3-3.05-1.3s-2.19.49-3.05,1.3c-.63.81-1.1,1.79-1.1,2.85h-3.76c-.55,0-.94.49-.94.98s.39.98.94.98h1.1v11.54c0,.65.23,1.22.7,1.71.31.41.86.65,1.49.65h9.39c.63,0,1.17-.24,1.64-.73.39-.41.7-1.06.7-1.71v-11.46h1.1c.55,0,.94-.41.94-.98s-.55-.98-1.1-.98Zm-9.7-1.46c.94-.98,2.5-.98,3.37,0,.39.41.63.89.7,1.46h-4.7c0-.57.23-1.06.63-1.46Zm4.77,11.54c.39.41.39.98,0,1.38-.16.16-.39.33-.63.33s-.47-.08-.63-.33l-1.72-1.79-1.72,1.79c-.16.16-.39.33-.63.33s-.47-.08-.63-.33c-.39-.41-.39-.98,0-1.38l1.72-1.79-1.72-1.79c-.39-.41-.39-.98,0-1.38.39-.41.94-.41,1.33,0l1.72,1.79,1.72-1.79c.39-.41.94-.41,1.33,0,.39.41.39.98,0,1.38l-1.88,1.79,1.72,1.79Z"/>',
    }}
  />
)

TrashCloseFill.displayName = 'TrashCloseFill'

export const tags = ['TrashCloseFill', '']
