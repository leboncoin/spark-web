import { ComponentPropsWithoutRef, PropsWithChildren, Ref } from 'react'

export type KbdProps = ComponentPropsWithoutRef<'div'> & {
  ref?: Ref<HTMLElement>
}

export const Kbd = ({ className, ref, ...props }: PropsWithChildren<KbdProps>) => {
  return (
    <kbd
      ref={ref}
      className={[
        'border-sm border-b-md border-outline bg-neutral-container pe-md ps-md text-caption rounded-sm font-mono leading-4 font-bold whitespace-nowrap',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
