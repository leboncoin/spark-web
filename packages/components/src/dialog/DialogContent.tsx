import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref, useEffect } from 'react'

import { dialogContentStyles, type DialogContentStylesProps } from './DialogContent.styles'
import { useDialog } from './DialogContext'

const FULLSCREEN_BELOW_CLASS = {
  sm: 'max-sm:[--size:fullscreen]',
  md: 'max-md:[--size:fullscreen]',
  lg: 'max-lg:[--size:fullscreen]',
  xl: 'max-xl:[--size:fullscreen]',
  always: '[--size:fullscreen]',
} as const

export interface ContentProps
  extends Omit<ComponentProps<typeof BaseDialog.Popup>, 'render'>, DialogContentStylesProps {
  /**
   * When set to true, the content will adjust its width to fit the content rather than taking up the full available width.
   */
  isNarrow?: boolean
  ref?: Ref<HTMLDivElement>
  /**
   * Makes the dialog fullscreen at or below the given breakpoint, or always fullscreen when set to "always".
   * Prefer this over `size="fullscreen"`, which is deprecated.
   */
  fullscreenBelow?: keyof typeof FULLSCREEN_BELOW_CLASS
}

/**
 * The popup element that contains the dialog content. Renders a <div> element.
 */
export const Content = ({
  className,
  isNarrow = false,
  size = 'md',
  fullscreenBelow,
  ref,
  ...rest
}: ContentProps) => {
  const { setIsFullScreen } = useDialog()

  useEffect(() => {
    if (size === 'fullscreen') setIsFullScreen(true)

    return () => setIsFullScreen(false)
  }, [setIsFullScreen, size])

  const popup = (
    <BaseDialog.Popup
      ref={ref}
      data-spark-component="dialog-content"
      role="dialog"
      className={state =>
        cx(
          dialogContentStyles({
            isNarrow,
            size,
            className: typeof className === 'function' ? className(state) : className,
          })
        )
      }
      {...rest}
    />
  )

  if (fullscreenBelow) {
    return <div className={FULLSCREEN_BELOW_CLASS[fullscreenBelow]}>{popup}</div>
  }

  return popup
}

Content.displayName = 'Dialog.Content'
