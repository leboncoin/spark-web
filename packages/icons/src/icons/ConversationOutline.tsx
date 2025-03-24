import React from 'react'

import { IconProps } from '../Types'

export const ConversationOutline = ({
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
    data-title="ConversationOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m13.01,15.3h-3.83s-2.92,0-2.92,0l-2.66,2.01c-.31.23-.71.26-1.05.09-.33-.17-.55-.52-.55-.9V6.37c0-2.42,1.95-4.38,4.34-4.37h6.75c2.35,0,4.27,1.89,4.27,4.27v4.67c-.02,2.41-1.95,4.36-4.34,4.36Zm-7.09-2.02h1.25s5.85,0,5.85,0c1.29,0,2.34-1.04,2.34-2.34v-4.67c0-1.26-1-2.26-2.26-2.26h-6.77c-1.29,0-2.34,1.05-2.34,2.36v8.1l1.33-.99c.18-.13.38-.2.6-.2Z"/><path d="m19.04,9.56v-2.25h0c1.71.59,2.95,2.21,2.95,4.13v9.56c0,.38-.21.73-.55.9-.34.17-.75.13-1.05-.09l-2.54-1.91h-6.33c-1.88,0-3.47-1.21-4.07-2.91h2.25c.43.53,1.08.88,1.81.88h6.66c.22,0,.43.08.6.2l1.2.91v-7.54c0-.77-.38-1.45-.94-1.88Z"/>',
    }}
  />
)

ConversationOutline.displayName = 'ConversationOutline'

export const tags = ['ConversationOutline', '']
