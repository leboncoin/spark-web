import { cx } from 'class-variance-authority'

import { Badge, BadgeProps } from '../badge'
import { useAvatarContext } from './context'

interface AvatarOnlineBadgeProps extends BadgeProps {
  angle?: number
}

export const AvatarOnlineBadge = ({ angle = 135, ...props }: AvatarOnlineBadgeProps) => {
  const { isOnline, pixelSize, design, onlineText, size } = useAvatarContext()

  if (!isOnline) return null

  function getBadgePosition(circleSize: number) {
    const angleRad = ((90 - angle) * Math.PI) / 180
    const circleRadius = circleSize / 2

    return {
      x: circleRadius + circleRadius * Math.cos(angleRad),
      y: circleRadius - circleRadius * Math.sin(angleRad),
    }
  }

  const badgePosition = getBadgePosition(pixelSize)
  const badgeSize = ['lg', 'xl', '2xl'].includes(size) ? 'md' : 'sm'

  return (
    <Badge
      role="status"
      aria-label={onlineText}
      size={badgeSize}
      intent="success"
      style={{
        ...(design === 'circle'
          ? { left: `${badgePosition.x}px`, top: `${badgePosition.y}px` }
          : { right: '0px', bottom: '0px' }),
      }}
      className={cx(
        'absolute',
        design === 'circle'
          ? '-translate-x-1/2 -translate-y-1/2'
          : 'translate-x-1/4 translate-y-1/4'
      )}
      {...props}
    />
  )
}

AvatarOnlineBadge.displayName = 'AvatarOnlineBadge'
