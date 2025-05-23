import React from 'react'

import { IconProps } from '../Types'

export const ConversationFill = ({
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
    data-title="ConversationFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m16.93,5.69v5.35c0,2.03-1.63,3.69-3.62,3.69h-7.78c-.13,0-.22.05-.32.11-.04.02-.08.05-.13.07l-2.64,1.98c-.18.14-.43,0-.43-.22V5.69c0-2.03,1.63-3.69,3.62-3.69h7.78c1.99,0,3.53,1.57,3.53,3.69Z"/><path d="m18.56,11.03v-3.32c1.99.09,3.53,1.75,3.44,3.69v10.32c0,.22-.25.36-.43.22l-2.46-1.88c-.09-.09-.27-.18-.45-.18h-7.24c-1.99,0-3.53-1.57-3.62-3.5h5.52c2.9,0,5.25-2.4,5.25-5.35Z"/>',
    }}
  />
)

ConversationFill.displayName = 'ConversationFill'

export const tags = ['ConversationFill', '']
