import { Slot } from '../slot'

export function useRenderSlot(asChild: boolean, defaultTag: string) {
  const Component = asChild ? Slot : defaultTag

  return asChild ? ({ ...props }) => <Component {...props} /> : undefined
}
