import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const Donation = React.forwardRef(
  (
    { title, fill = 'currentColor', stroke = 'none', ...props }: IconProps,
    ref: Ref<SVGSVGElement>
  ) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      data-title="Donation"
      {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
      dangerouslySetInnerHTML={{
        __html:
          (title === undefined ? '' : `<title>${title}</title>`) +
          '<path fill-rule="evenodd" d="m23.88,14.79h0s0-.01,0-.01c-.23-.62-.69-1.14-1.3-1.42-.08-.04-.16-.07-.24-.1v-4.48h.05c.5,0,.95-.4.95-.94v-3.45c0-.49-.41-.94-.95-.94h-2.27c.04-.17.07-.35.07-.53,0-1.34-1.17-2.41-2.54-2.41-.92,0-1.61.29-2.15.73-.35.29-.64.64-.88,1-.24-.36-.53-.71-.88-.99-.54-.44-1.23-.71-2.15-.71-1.4,0-2.54,1.05-2.54,2.41,0,.18.02.36.07.53h-2.24c-.5,0-.95.4-.95.94v3.45c0,.49.41.94.95.94h.05v4.73c-.14.03-.28.07-.42.11h0s-.78.25-.78.25c-.09-.41-.46-.75-.93-.75H.95c-.5,0-.95.4-.95.94v8.47c0,.49.41.94.95.94h3.86c.45,0,.86-.32.94-.78l7.45.78h.51c1.19,0,2.35-.39,3.28-1.15h0s6.08-4.87,6.08-4.87h0c.81-.66,1.13-1.71.81-2.69Zm-3.45-1.45l-3.3,1.27v-5.83h3.3v4.56Zm-6.45,1.44V5.3h1.27v10.01c-.17-.12-.36-.23-.57-.31h0s-.69-.23-.69-.23Zm.12,2h0c.06.02.09.05.11.1.02.03.03.07,0,.16-.04.09-.13.14-.2.13l-4.62-.43h0c-.5-.04-.97.33-1.01.84-.04.49.33.95.84,1h0s4.63.44,4.63.44h.17c.87,0,1.65-.53,1.95-1.36.08-.2.12-.42.12-.63l5.17-1.99c.19-.07.34-.06.47,0,.17.08.28.2.34.36.07.24,0,.5-.2.67l-6.08,4.87c-.7.56-1.58.82-2.44.71h0s-7.59-.79-7.59-.79v-5l1.35-.44c.87-.29,1.81-.29,2.68,0l4.3,1.38Zm7.33-11.44v1.59h-4.3v-1.59h4.3Zm-3.81-1.86l-1.56-.02c.2-.31.37-.54.55-.71.25-.24.54-.36,1.01-.36.41,0,.66.27.66.56,0,.25-.24.53-.66.53h0Zm-6.04-1.09c.47,0,.76.13,1.01.36.19.17.36.41.56.73h-1.6c-.41,0-.65-.27-.66-.52.02-.29.3-.56.68-.56Zm-3.76,2.94h4.28v1.59h-4.28v-1.59Zm4.28,3.45v5.4l-1.73-.56h0c-.5-.17-1.04-.26-1.56-.3v-4.55h3.3ZM3.86,21.62h-1.98v-6.61h1.98v6.61Z"/>',
      }}
    />
  )
)

Donation.displayName = 'Donation'

export const tags = ['Donation', '']
