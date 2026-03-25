import React from 'react'

import { IconProps } from '../Types'

export const ArrowUp = ({
  title,
  fill = 'currentColor',
  stroke = 'none',
  ref,
  ...props
}: IconProps) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    data-title="ArrowUp"
    xmlns="http://www.w3.org/2000/svg"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M6.2764 8.53868C6.65583 8.9371 7.28383 8.95002 7.67908 8.56754L11.0079 5.34622L11.0079 21C11.0079 21.5523 11.4521 22 12 22C12.5479 22 12.9921 21.5523 12.9921 21L12.9921 5.34622L16.3209 8.56754C16.7162 8.95002 17.3442 8.9371 17.7236 8.53868C18.103 8.14027 18.0902 7.50724 17.695 7.12476L12.687 2.27861C12.3031 1.90713 11.6969 1.90713 11.313 2.27861L6.30502 7.12477C5.90978 7.50724 5.89696 8.14027 6.2764 8.53868Z"/>',
    }}
  />
)

ArrowUp.displayName = 'ArrowUp'

export const tags = ['ArrowUp', '']
