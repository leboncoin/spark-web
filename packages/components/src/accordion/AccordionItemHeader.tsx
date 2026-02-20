import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { Ref } from 'react'

export interface AccordionItemHeaderProps extends useRender.ComponentProps<'h3'> {
  ref?: Ref<HTMLHeadingElement>
}

export const ItemHeader = ({
  children,
  className,
  ref,
  render,
  ...others
}: AccordionItemHeaderProps) => {
  const defaultProps: useRender.ElementProps<'h3'> & Record<string, unknown> = {
    'data-spark-component': 'accordion-item-header',
    className: cx('rounded-[inherit]', className),
  }

  return useRender({
    defaultTagName: 'h3',
    render,
    ref,
    props: mergeProps<'h3'>(defaultProps, { ...others, children }),
  })
}

ItemHeader.displayName = 'Accordion.ItemHeader'
