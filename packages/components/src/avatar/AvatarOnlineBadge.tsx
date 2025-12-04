import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef } from 'react'

import { useAvatarContext } from './context'

interface AvatarOnlineBadgeProps extends ComponentPropsWithoutRef<'div'> {
  angle?: number
}

export const AvatarOnlineBadge = ({ angle = 135, ...props }: AvatarOnlineBadgeProps) => {
  const { isOnline, pixelSize, shape, onlineText, size } = useAvatarContext()

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

  return (
    <div
      data-spark-component="avatar-online-badge"
      role="status"
      aria-label={onlineText}
      style={{
        ...(shape === 'circle'
          ? { left: `${badgePosition.x}px`, top: `${badgePosition.y}px` }
          : { right: '0px', bottom: '0px' }),
      }}
      className={cx(
        'bg-success outline-surface absolute rounded-full',
        shape === 'circle'
          ? '-translate-x-1/2 -translate-y-1/2'
          : 'translate-x-1/4 translate-y-1/4',
        ['lg', 'xl', '2xl'].includes(size) ? cx('size-sz-12 outline-4') : cx('size-sz-8 outline-2')
      )}
      {...props}
    />
  )
}

AvatarOnlineBadge.displayName = 'AvatarOnlineBadge'
