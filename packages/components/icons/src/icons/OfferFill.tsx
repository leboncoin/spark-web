import React from 'react'

import { IconProps } from '../Types'

export const OfferFill = ({
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
    data-title="OfferFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m21.42,13.4L10.48,2.41c-.16-.17-.33-.25-.49-.33-.16-.08-.33-.08-.58-.08l-5.35.83c-.33,0-.58.17-.82.33-.25.33-.41.66-.41.83l-.82,5.54c0,.17,0,.41.08.58.08.17.16.33.33.41l10.95,10.99c.33.33.82.5,1.32.5s.91-.17,1.32-.5l5.51-5.54c.33-.33.49-.83.49-1.32-.08-.41-.25-.83-.58-1.24Zm-13.58-3.97c-.82,0-1.48-.66-1.48-1.49s.66-1.49,1.48-1.49,1.48.66,1.48,1.49-.66,1.49-1.48,1.49Z"/>',
    }}
  />
)

OfferFill.displayName = 'OfferFill'

export const tags = ['OfferFill', '']
