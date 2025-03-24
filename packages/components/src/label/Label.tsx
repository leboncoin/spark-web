import { cx } from 'class-variance-authority'
import { Label as RadixLabel } from 'radix-ui'
import { Ref } from 'react'

export type LabelProps = RadixLabel.LabelProps & {
  ref?: Ref<HTMLLabelElement>
}

export const Label = ({ className, ref, ...others }: LabelProps) => {
  return (
    <RadixLabel.Label
      ref={ref}
      data-spark-component="label"
      className={cx('text-body-1', className)}
      {...others}
    />
  )
}

Label.displayName = 'Label'
