import { Slot } from '../slot'

export function useRenderSlot(asChild: boolean) {
  return asChild ? ({ ...props }: object) => <Slot {...props} /> : undefined
}
