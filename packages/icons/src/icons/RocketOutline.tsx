import React from 'react'

import { IconProps } from '../Types'

export const RocketOutline = ({
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
    data-title="RocketOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="M19.64 2.04c1.38-.27 2.59.97 2.32 2.38l-.18.91c-.57 2.92-1.96 5.59-3.99 7.69l.04 3.52c.01 1.14-.61 2.18-1.61 2.7l-1.92.98c-1.23.63-2.73.13-3.36-1.11l-1.07-2.12-2.68-2.72-2.08-1.08c-1.23-.64-1.72-2.16-1.1-3.42l.97-1.95c.51-1.02 1.54-1.65 2.66-1.64l3.48.04c2.09-2.06 4.75-3.47 7.64-4.02l.88-.17ZM6.7 11.65l2.62-3.33-1.71-.02c-.33 0-.63.18-.78.48l-.97 1.95s-.04.09-.04.14c-.02.18.07.36.23.45l.64.33Zm4.57 3.78-2.54-2.58 4.55-5.77c1.68-1.42 3.69-2.39 5.86-2.81l.76-.14-.15.79c-.42 2.16-1.37 4.17-2.74 5.85l-5.73 4.67Zm1.19 2.06.33.65c.09.17.26.26.44.24.05 0 .1-.02.14-.04l1.92-.98c.29-.15.48-.46.47-.79l-.02-1.73-3.28 2.66ZM8.4 18.75c0-1.79-1.43-3.25-3.2-3.25s-3.2 1.45-3.2 3.25v3.25h3.2c1.77 0 3.2-1.45 3.2-3.25Zm-3.2-1.14c.62 0 1.12.51 1.12 1.14s-.5 1.14-1.12 1.14h-1.12v-1.14c0-.63.5-1.14 1.12-1.14Z"/>',
    }}
  />
)

RocketOutline.displayName = 'RocketOutline'

export const tags = ['RocketOutline', '']
