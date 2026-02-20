import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { HTMLAttributes, Ref } from 'react'

export interface DividerContentProps
  extends HTMLAttributes<HTMLSpanElement>,
    useRender.ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement>
}

const contentClassName = 'group-data-[writing-mode=vertical-lr]:[writing-mode:vertical-lr]'

export const DividerContent = ({
  children,
  render,
  ref,
  className,
  ...props
}: DividerContentProps) => {
  const defaultProps = {
    'data-spark-component': 'divider-content',
    className: cx(contentClassName, className),
    children,
  }

  const element = useRender({
    defaultTagName: 'span',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'span'>(defaultProps, props),
  })

  if (!children && !render) return null

  if (render) {
    return element
  }

  return (
    <span
      data-spark-component="divider-content"
      ref={ref}
      className={cx(contentClassName, className)}
      {...props}
    >
      {children}
    </span>
  )
}

DividerContent.displayName = 'Divider.Content'
