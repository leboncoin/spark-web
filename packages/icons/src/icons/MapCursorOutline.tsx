import React from 'react'

import { IconProps } from '../Types'

export const MapCursorOutline = ({
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
    data-title="MapCursorOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m21.94,3.83c.1.43.08.88-.07,1.3h0s-5.28,15.38-5.28,15.38c-.05.37-.21.72-.48.99-.32.32-.74.49-1.19.49s-.88-.18-1.19-.49c-.27-.27-.43-.61-.48-.98l-2.6-7.16-7.17-2.54c-.37-.05-.72-.21-.98-.48-.32-.32-.49-.74-.49-1.19s.18-.88.49-1.19c.27-.27.61-.44.99-.48l15.39-5.35c.42-.14.87-.17,1.3-.07.43.1.83.32,1.14.63.31.31.53.71.63,1.14Zm-1.96.65c.02-.07.03-.14.01-.2-.02-.07-.05-.13-.1-.18s-.11-.08-.18-.1c-.07-.02-.14-.01-.2,0,0,0,0,0,0,0l-14.76,5.14,7.01,2.48c.28.1.5.32.61.6l2.54,7.01,5.07-14.76s0,0,0,0Z"/>',
    }}
  />
)

MapCursorOutline.displayName = 'MapCursorOutline'

export const tags = ['MapCursorOutline', '']
