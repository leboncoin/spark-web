import { Meta, StoryFn } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'

import { Slot, Slottable } from '.'

const meta: Meta<typeof Slot> = {
  title: 'Components/Slot',
  component: Slot,
  tags: ['others'],
}

export default meta

const useDOMElementString = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<null | T>(null)
  const [, set] = useState(false)
  useEffect(() => {
    set(true)
  }, [])
  const stringElement = ref.current?.outerHTML

  return [stringElement, ref] as const
}

export const Default: StoryFn = _args => {
  const [element, ref] = useDOMElementString<HTMLAnchorElement>()

  return (
    <div className="flex flex-col">
      <Slot data-slot="slot" data-collision="slot">
        <a data-child="child" data-collision="child" href="/" ref={ref}>
          Link
        </a>
      </Slot>
      <div>{element}</div>
    </div>
  )
}

export const SlotNChild: StoryFn = _args => {
  const [element, ref] = useDOMElementString<HTMLAnchorElement>()

  return (
    <div className="flex flex-col">
      <Slot data-slot="slot" data-collision="slot">
        <a data-child="child" data-collision="child" href="/" ref={ref}>
          Link
        </a>
      </Slot>
      <div>{element}</div>
    </div>
  )
}

export const Handlers: StoryFn = _args => {
  const onSlotClick = () => console.log('slot click')
  const onChildClick = () => console.log('child click')

  return (
    <Slot onClick={onSlotClick}>
      <button onClick={onChildClick}>child button</button>
    </Slot>
  )
}

export const ClassNames: StoryFn = _args => {
  const [element, ref] = useDOMElementString<HTMLAnchorElement>()

  return (
    <div className="flex flex-col">
      <Slot className="slotClassName">
        <a href="/" className="childrenClassName" ref={ref}>
          Link
        </a>
      </Slot>
      <div>{element}</div>
    </div>
  )
}

export const Style: StoryFn = _args => {
  const [element, ref] = useDOMElementString<HTMLDivElement>()

  return (
    <div className="flex flex-col">
      <Slot style={{ backgroundColor: 'lightgreen', width: '100%' }}>
        <div style={{ backgroundColor: 'lightblue', height: 200 }} ref={ref} />
      </Slot>
      <div>{element}</div>
    </div>
  )
}

export const Ref: StoryFn = _args => {
  const [, setRendered] = useState(false)
  const slotRef = useRef<HTMLElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setRendered(true)
  }, [])
  const [{ current: slotCurrent }, { current: childCurrent }] = [slotRef, childRef]

  return (
    <div className="flex flex-col">
      <Slot ref={slotRef}>
        <div ref={childRef}>child inner-text</div>
      </Slot>
      <div className="flex flex-col">
        <div>slotCurrent: {slotCurrent?.outerHTML}</div>
        <div>childCurrent: {childCurrent?.outerHTML}</div>
      </div>
    </div>
  )
}

export const Append = () => (
  <div className="flex flex-col">
    slottable
    <Slot data-prop="slotted">
      <Slottable>
        <ul className="list-disc"></ul>
      </Slottable>
      <li>1</li>
      <li>2</li>
    </Slot>
  </div>
)
