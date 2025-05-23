import React from 'react'

import { IconProps } from '../Types'

export const AttachFile = ({
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
    data-title="AttachFile"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m7.07,3.31c.84-.84,1.99-1.31,3.18-1.31h3.49c1.19,0,2.34.47,3.18,1.31.84.84,1.32,1.97,1.32,3.15v11.77c0,.55-.45,1-1.01,1s-1.01-.45-1.01-1V6.46c0-.65-.26-1.28-.73-1.74s-1.1-.72-1.76-.72h-3.49c-.66,0-1.29.26-1.76.72s-.73,1.09-.73,1.74v11.77c0,.47.19.92.52,1.25.33.33.79.52,1.26.52h1.4c.47,0,.93-.19,1.26-.52.33-.33.52-.78.52-1.25V7.85c0-.1-.04-.2-.11-.27-.07-.07-.17-.11-.27-.11h-.7c-.1,0-.2.04-.27.11-.07.07-.11.17-.11.27v7.62c0,.55-.45,1-1.01,1s-1.01-.45-1.01-1v-7.62c0-.63.25-1.24.7-1.69.45-.45,1.06-.7,1.7-.7h.7c.64,0,1.25.25,1.7.7.45.45.7,1.05.7,1.69v10.38c0,1-.4,1.96-1.11,2.67-.71.71-1.68,1.1-2.69,1.1h-1.4c-1.01,0-1.98-.4-2.69-1.1-.71-.71-1.11-1.67-1.11-2.67V6.46c0-1.18.47-2.32,1.32-3.15Z"/>',
    }}
  />
)

AttachFile.displayName = 'AttachFile'

export const tags = ['AttachFile', '']
