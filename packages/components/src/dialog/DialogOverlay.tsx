import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

export interface OverlayProps extends Omit<ComponentProps<typeof BaseDialog.Backdrop>, 'render'> {
  ref?: Ref<HTMLDivElement>
}

export const Overlay = ({ className, ...props }: OverlayProps) => {
  return (
    <BaseDialog.Backdrop
      data-spark-component="dialog-overlay"
      className={state =>
        cx(
          'z-overlay size-screen fixed inset-0',
          'bg-overlay/dim-1',
          'data-starting-style:animate-fade-in',
          'data-ending-style:animate-fade-out',
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
}

Overlay.displayName = 'Dialog.Overlay'
