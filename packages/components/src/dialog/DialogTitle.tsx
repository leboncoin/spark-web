import { cx } from 'class-variance-authority'
import { Dialog as RadixDialog } from 'radix-ui'
import { Ref } from 'react'

export type TitleProps = RadixDialog.DialogTitleProps & {
  ref?: Ref<HTMLHeadingElement>
}

export const Title = ({ className, ref, ...others }: TitleProps) => {
  return (
    <RadixDialog.Title
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
