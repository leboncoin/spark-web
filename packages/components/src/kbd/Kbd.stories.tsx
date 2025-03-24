import { Meta, StoryFn } from '@storybook/react'

import { Kbd } from '.'

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['others'],
}

export default meta

export const Default: StoryFn = _args => (
  <div className="gap-lg flex flex-col">
    <div className="gap-lg flex flex-row flex-nowrap justify-between">
      <Kbd>esc</Kbd>
      <Kbd>F1</Kbd>
      <Kbd>F2</Kbd>
      <Kbd>F3</Kbd>
      <Kbd>F4</Kbd>
      <Kbd>F5</Kbd>
      <Kbd>F6</Kbd>
      <Kbd>F7</Kbd>
      <Kbd>F8</Kbd>
      <Kbd>F9</Kbd>
      <Kbd>F10</Kbd>
      <Kbd>F11</Kbd>
      <Kbd>F12</Kbd>
      <Kbd>eject</Kbd>
    </div>
    <div className="gap-lg flex flex-row flex-nowrap justify-between">
      <Kbd>§</Kbd>
      <Kbd>1</Kbd>
      <Kbd>2</Kbd>
      <Kbd>3</Kbd>
      <Kbd>4</Kbd>
      <Kbd>5</Kbd>
      <Kbd>6</Kbd>
      <Kbd>7</Kbd>
      <Kbd>8</Kbd>
      <Kbd>9</Kbd>
      <Kbd>0</Kbd>
      <Kbd>-</Kbd>
      <Kbd>=</Kbd>
      <Kbd>backspace</Kbd>
    </div>
    <div className="gap-lg flex flex-row flex-nowrap justify-between">
      <Kbd>tab</Kbd>
      <Kbd>Q</Kbd>
      <Kbd>W</Kbd>
      <Kbd>E</Kbd>
      <Kbd>R</Kbd>
      <Kbd>T</Kbd>
      <Kbd>Y</Kbd>
      <Kbd>U</Kbd>
      <Kbd>O</Kbd>
      <Kbd>P</Kbd>
      <Kbd>[</Kbd>
      <Kbd>]</Kbd>
      <Kbd>enter</Kbd>
    </div>
    <div className="gap-lg flex flex-row flex-nowrap justify-between">
      <Kbd>caps lock</Kbd>
      <Kbd>A</Kbd>
      <Kbd>S</Kbd>
      <Kbd>D</Kbd>
      <Kbd>F</Kbd>
      <Kbd>G</Kbd>
      <Kbd>H</Kbd>
      <Kbd>J</Kbd>
      <Kbd>K</Kbd>
      <Kbd>L</Kbd>
      <Kbd>;</Kbd>
      <Kbd>{"'"}</Kbd>
      <Kbd>\</Kbd>
      <Kbd>enter</Kbd>
    </div>
    <div className="gap-lg flex flex-row flex-nowrap justify-between">
      <Kbd>shift</Kbd>
      <Kbd>`</Kbd>
      <Kbd>Z</Kbd>
      <Kbd>X</Kbd>
      <Kbd>C</Kbd>
      <Kbd>V</Kbd>
      <Kbd>B</Kbd>
      <Kbd>N</Kbd>
      <Kbd>M</Kbd>
      <Kbd>,</Kbd>
      <Kbd>.</Kbd>
      <Kbd>/</Kbd>
      <Kbd>right shift</Kbd>
    </div>
    <div className="gap-lg flex flex-row flex-nowrap justify-between">
      <Kbd>fn</Kbd>
      <Kbd>control</Kbd>
      <Kbd>option</Kbd>
      <Kbd>command</Kbd>
      <Kbd>space</Kbd>
      <Kbd>command</Kbd>
      <Kbd>option</Kbd>
      <Kbd>←</Kbd>
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>→</Kbd>
    </div>
  </div>
)

export const Demos: StoryFn = _args => (
  <div className="gap-lg flex flex-col">
    <div>
      <Kbd>command</Kbd> + <Kbd>tab</Kbd>
    </div>
    <div>
      <Kbd>command</Kbd> + <Kbd>option</Kbd> + <Kbd>esc</Kbd>
    </div>
    <div>
      <Kbd>fn</Kbd> + <Kbd>F1</Kbd>
    </div>
    <div>
      <Kbd>command</Kbd> + <Kbd>+</Kbd>
    </div>
  </div>
)

export const ShiftPlusH: StoryFn = _args => (
  <>
    <Kbd>shift</Kbd> + <Kbd>H</Kbd>
  </>
)

export const ShiftThenH: StoryFn = _args => (
  <>
    <Kbd>shift</Kbd> then <Kbd>H</Kbd>
  </>
)

export const ShiftOrH: StoryFn = _args => (
  <>
    <Kbd>shift</Kbd> or <Kbd>H</Kbd>
  </>
)

export const OptionPlusScroll: StoryFn = _args => (
  <>
    <Kbd>option</Kbd> + <span className="font-bold">🖱️ SCROLL</span>
  </>
)
