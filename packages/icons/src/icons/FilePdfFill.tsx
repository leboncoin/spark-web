import React from 'react'

import { IconProps } from '../Types'

export const FilePdfFill = ({
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
    data-title="FilePdfFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="M11 13.5c.5-.2.9-.3 1.3-.4-.2-.3-.5-.5-.8-.9-.1.4-.3.9-.5 1.3ZM15.7 13.7h-.2c.1.1.2.1.2 0Z"/><path d="m21.9,8.7L13.6.4c-.2-.3-.5-.4-.8-.4H4.5c-.7,0-1.5.3-2,.8-.5.6-.8,1.3-.8,2v18.3c0,.7.3,1.5.8,2,.5.6,1.3.9,2,.9h15c.7,0,1.5-.3,2-.8s.8-1.3.8-2v-11.7c0-.3-.1-.6-.4-.8Zm-8.3,4c.7-.2,1.4-.3,1.9-.3s.9.1,1.2.3.7.5.7,1-.4.8-.7,1c-.4.2-.8.3-1.2.3-.8,0-1.5-.4-2.2-.9-1,.2-2.1.5-3,.9-.4.7-.7,1.3-1.1,1.7-.4.5-.8.9-1.5.9-.6,0-1.2-.5-1.2-1.2,0-.3.2-.6.4-.8.2-.2.4-.4.7-.6.5-.3,1.1-.6,1.8-.9.5-1,.9-2.1,1.3-3.2-.4-.9-.7-1.8-.7-2.6,0-.4.1-.7.3-1,.2-.2.6-.5,1-.5.5,0,.8.2,1,.5.2.3.3.6.3.9,0,.7-.2,1.6-.5,2.5.4.7.9,1.4,1.5,2Z"/><path d="m7.8,16.4c.1-.1.2-.2.3-.3-.1.1-.3.2-.3.3Z"/>',
    }}
  />
)

FilePdfFill.displayName = 'FilePdfFill'

export const tags = ['FilePdfFill', '']
