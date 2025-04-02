import { designs, intents, shapes, sizes } from './constants'

type Picks<T extends object, PickedItems extends (keyof T)[], Acc = {}> = PickedItems extends [
  infer Head,
  ...infer Rest,
]
  ? Rest extends (keyof T)[]
    ? Head extends keyof T
      ? Picks<T, Rest, Acc & Pick<T, Head>>
      : Acc
    : Acc
  : Acc

type Size = (typeof sizes)[number]
type SizeLookup = Record<Size, string[]>

type Intent = (typeof intents)[number]
type IntentLookup = Record<Intent, string[]>

type Design = (typeof designs)[number]
type DesignLookup = Record<Design, string[]>

type Shape = (typeof shapes)[number]
type ShapeLookup = Record<Shape, string[]>

interface VariantLookup {
  design: DesignLookup
  intent: IntentLookup
  shape: ShapeLookup
  size: SizeLookup
}

export type {
  Size,
  SizeLookup,
  Intent,
  IntentLookup,
  Design,
  DesignLookup,
  Shape,
  ShapeLookup,
  Picks,
  VariantLookup,
}
