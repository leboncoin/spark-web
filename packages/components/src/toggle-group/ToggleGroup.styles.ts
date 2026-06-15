import { cx } from 'class-variance-authority'

export const rootStyles = ({ className }: { className?: string }) => {
  return cx('gap-none inline-flex', className)
}
