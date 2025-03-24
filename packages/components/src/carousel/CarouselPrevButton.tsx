import { ArrowVerticalLeft } from '@spark-ui/icons/ArrowVerticalLeft'

import { Icon } from '../icon'
import { IconButton, IconButtonProps } from '../icon-button'
import { useCarouselContext } from './Carousel'

export const CarouselPrevButton = ({
  'aria-label': ariaLabel,
  ...buttonProps
}: IconButtonProps) => {
  const ctx = useCarouselContext()

  return (
    <IconButton
      {...ctx.getPrevTriggerProps()}
      intent="surface"
      design="filled"
      className="pointer-events-auto cursor-pointer shadow-sm disabled:invisible"
      aria-label={ariaLabel}
      {...buttonProps}
    >
      <Icon>
        <ArrowVerticalLeft />
      </Icon>
    </IconButton>
  )
}

CarouselPrevButton.displayName = 'Carousel.PrevButton'
