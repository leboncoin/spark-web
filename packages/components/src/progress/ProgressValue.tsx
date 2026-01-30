import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cx } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren } from 'react'

export type ProgressValueProps = Omit<ComponentProps<typeof BaseProgress.Value>, 'render'>

export const ProgressValue = ({
  className,
  children,
  ...others
}: PropsWithChildren<ProgressValueProps>) => {
  return (
    <BaseProgress.Value
      data-spark-component="progress-value"
      className={cx('default:text-body-1 text-on-surface col-start-2 text-right', className)}
      {...others}
    >
      {children}
    </BaseProgress.Value>
  )
}

ProgressValue.displayName = 'Progress.Value'
