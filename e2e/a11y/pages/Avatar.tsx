import { Avatar } from '@spark-ui/components/avatar'
import React from 'react'

const localImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU1RTUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0E1QTVBNSIgZm9udC1zaXplPSI0MCI+QTwvdGV4dD48L3N2Zz4='

export const A11yAvatar = () => (
  <section>
    <Avatar size="xl" username="John Doe">
      <Avatar.User>
        <Avatar.Placeholder />
        <Avatar.Image src={localImage} />
      </Avatar.User>
      <Avatar.Action ariaLabel="Edit account" />
    </Avatar>
    <Avatar size="xl" isOnline username="John Doe" onlineText="Online">
      <Avatar.User>
        <Avatar.Placeholder />
        <Avatar.Image src={localImage} />
      </Avatar.User>
      <Avatar.OnlineBadge />
    </Avatar>
  </section>
)
