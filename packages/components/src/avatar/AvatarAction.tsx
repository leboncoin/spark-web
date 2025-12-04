import { PenOutline } from '@spark-ui/icons/PenOutline'
import { cx } from 'class-variance-authority'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { Slot } from '../slot'
import { useAvatarContext } from './context'

export interface AvatarActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  angle?: number
  ariaLabel: string
}

export const AvatarAction = ({
  className,
  children,
  asChild,
  angle = 135,
  ariaLabel,
  ...props
}: AvatarActionProps) => {
  const Comp = asChild ? Slot : IconButton
  const { pixelSize, shape } = useAvatarContext()

  function getBadgePosition(circleSize: number) {
    const angleRad = ((90 - angle) * Math.PI) / 180
    const circleRadius = circleSize / 2

    return {
      x: circleRadius + circleRadius * Math.cos(angleRad),
      y: circleRadius - circleRadius * Math.sin(angleRad),
    }
  }

  const position = getBadgePosition(pixelSize)

  const isCustomElement = asChild

  return (
    <Comp
      data-spark-component="avatar-action"
      style={{
        position: 'absolute',
        ...(shape === 'circle' ? { left: `${position.x}px`, top: `${position.y}px` } : {}),
        ...(shape === 'square' ? { right: '0px', bottom: '0px' } : {}),
      }}
      className={cx(
        'z-raised',
        shape === 'circle'
          ? '-translate-x-1/2 -translate-y-1/2'
          : 'translate-x-1/4 translate-y-1/4',
        { 'shadow-sm': !isCustomElement },
        className
      )}
      aria-label={ariaLabel}
      title={ariaLabel}
      {...(!isCustomElement ? { size: 'sm', intent: 'support', design: 'contrast' } : {})}
      {...props}
    >
      {children || (
        <Icon size="sm">
          <PenOutline />
        </Icon>
      )}
    </Comp>
  )
}

AvatarAction.displayName = 'AvatarAction'
