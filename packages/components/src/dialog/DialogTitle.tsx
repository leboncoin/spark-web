import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

export type TitleProps = ComponentProps<typeof BaseDialog.Title> & {
  ref?: Ref<HTMLHeadingElement>
}

export const Title = ({ className, ref, ...others }: TitleProps) => {
  return (
    <BaseDialog.Title
      data-spark-component="dialog-title"
      ref={ref}
      className={cx(
        'text-headline-1 text-on-surface',
        'group-has-data-[part=close]:pr-3xl',
        className
      )}
      {...others}
    />
  )
}

Title.displayName = 'Dialog.Title'
