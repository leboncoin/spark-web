import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { cx } from 'class-variance-authority'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { useAvatarContext } from './context'

export interface AvatarActionProps extends useRender.ComponentProps<'button'> {
  angle?: number
  ariaLabel: string
}

export const AvatarAction = ({
  className,
  children,
  render,
  angle = 135,
  ariaLabel,
  ...props
}: AvatarActionProps) => {
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
  const hasCustomRender = !!render

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'avatar-action',
    style: {
      position: 'absolute',
      ...(shape === 'circle' ? { left: `${position.x}px`, top: `${position.y}px` } : {}),
      ...(shape === 'square' ? { right: '0px', bottom: '0px' } : {}),
    },
    className: cx(
      'z-raised',
      shape === 'circle' ? '-translate-x-1/2 -translate-y-1/2' : 'translate-x-1/4 translate-y-1/4',
      { 'shadow-sm': !hasCustomRender },
      className
    ),
    'aria-label': ariaLabel,
    title: ariaLabel,
    ...(!hasCustomRender ? { size: 'sm', intent: 'support', design: 'contrast' } : {}),
    children: children ?? (
      <Icon size="sm">
        <PenOutline />
      </Icon>
    ),
  }

  const element = useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps<'button'>(defaultProps, props),
  })

  if (!render) {
    return (
      <IconButton
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
          'shadow-sm',
          className
        )}
        aria-label={ariaLabel}
        title={ariaLabel}
        size="sm"
        intent="support"
        design="contrast"
        {...props}
      >
        {children ?? (
          <Icon size="sm">
            <PenOutline />
          </Icon>
        )}
      </IconButton>
    )
  }

  return element
}

AvatarAction.displayName = 'AvatarAction'
