import { ScrollingList as Root } from './ScrollingList'
import { ScrollingListControls as Controls } from './ScrollingListControls'
import { ScrollingListItem as Item } from './ScrollingListItem'
import { ScrollingListItems as Items } from './ScrollingListItems'
import { ScrollingListNextButton as NextButton } from './ScrollingListNextButton'
import { ScrollingListPrevButton as PrevButton } from './ScrollingListPrevButton'
import { ScrollingListSkipButton as SkipButton } from './ScrollingListSkipButton'

/**
 * A horizontal scrollable list component with optional snap points and navigation controls.
 */
export const ScrollingList: typeof Root & {
  Controls: typeof Controls
  NextButton: typeof NextButton
  PrevButton: typeof PrevButton
  Item: typeof Item
  Items: typeof Items
  SkipButton: typeof SkipButton
} = Object.assign(Root, {
  Controls,
  NextButton,
  PrevButton,
  Item,
  Items,
  SkipButton,
})

ScrollingList.displayName = 'ScrollingList'
