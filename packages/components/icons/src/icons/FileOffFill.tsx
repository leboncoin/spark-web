import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const FileOffFill = React.forwardRef(
  (
    { title, fill = 'currentColor', stroke = 'none', ...props }: IconProps,
    ref: Ref<SVGSVGElement>
  ) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
      dangerouslySetInnerHTML={{
        __html:
          (title === undefined ? '' : `<title>${title}</title>`) +
          '<path d="M6.94356 3.75 10.5629 7.3375H12.9464C13.3878 7.3375 13.7409 7.6875 13.7409 8.125 13.7409 8.65 13.2996 9 12.9464 9H12.2402L14.712 11.45H17.0072C17.4486 11.45 17.8017 11.8 17.8017 12.2375 17.8017 12.675 17.4486 13.025 17.0072 13.025H16.301L21.8625 18.5375V9.525C21.8625 9.35 21.7742 9.0875 21.5977 9L14.8003 2.2625C14.712 2.0875 14.4472 2 14.2706 2H7.47322C6.85528 2 6.32561 2.175 5.88422 2.6125 5.88422 2.6125 5.88422 2.6125 5.79595 2.7L6.94356 3.75ZM22.7453 21.6 3.32417 2.35C3.05933 2 2.52967 2 2.26483 2.35 1.91172 2.7 1.91172 3.1375 2.26483 3.4875L5.26628 6.4625V19.0625C5.26628 19.5875 5.53111 20.2 5.88422 20.55 6.32561 20.9875 6.85528 21.1625 7.38494 21.1625H19.6556C19.7438 21.1625 19.9204 21.1625 20.0087 21.1625L21.5977 22.7375C21.7742 22.9125 21.9508 23 22.1273 23 22.3039 23 22.5687 22.9125 22.657 22.7375 23.0984 22.3875 23.0984 21.8625 22.7453 21.6ZM10.2098 11.45H10.2981L11.8871 13.025H10.1216C9.68017 13.025 9.32706 12.675 9.32706 12.2375 9.41533 11.8 9.76844 11.45 10.2098 11.45ZM10.2098 17.1375C9.76844 17.1375 9.41533 16.7875 9.41533 16.35 9.41533 15.9125 9.76844 15.5625 10.2098 15.5625H14.4472L16.0362 17.1375H10.2098Z"/>',
      }}
    />
  )
)

FileOffFill.displayName = 'FileOffFill'

export const tags = ['file-off-fill', 'account']
