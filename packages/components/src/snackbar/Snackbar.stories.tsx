import { FavoriteFill } from '@spark-ui/icons/FavoriteFill'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { addSnackbar, type AddSnackbarArgs, Snackbar } from '.'

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['overlays'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=55280-12883&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const designs: ExcludeNull<AddSnackbarArgs>['design'][] = ['filled', 'tinted']

const intents: ExcludeNull<AddSnackbarArgs>['intent'][] = [
  'success',
  'alert',
  'error',
  'info',
  'neutral',
  'main',
  'basic',
  'support',
  'accent',
  'inverse',
]

export const Default: StoryObj = {
  render: () => {
    return (
      <div>
        <Snackbar />

        <Button onClick={() => addSnackbar({ message: "You're done!" })}>Display snackbar</Button>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
const handleClick = () => addSnackbar({ message: "You're done!" })\n
return (
  <div>
    <Snackbar />
  
    <Button onClick={handleClick}>Display snackbar</Button>
  </div>
)
         `,
      },
    },
  },
}

export const Design: StoryObj = {
  render: () => {
    return (
      <div>
        <Snackbar />

        <div className="gap-xl grid grid-cols-2 md:grid-cols-3">
          {designs.map(design => (
            <Button key={design} onClick={() => addSnackbar({ message: "You're done!", design })}>
              {`Display ${design}${design === 'filled' ? ' (default)' : ''} snackbar`}
            </Button>
          ))}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
const handleClick = () => addSnackbar({ message: "You're done!", design })\n
return (
  <div>
    <Snackbar />
  
    <Button onClick={handleClick}>Display snackbar</Button>
  </div>
)
         `,
      },
    },
  },
}

export const Intent: StoryObj = {
  render: () => {
    return (
      <div>
        <Snackbar />

        <div className="gap-xl grid grid-cols-2 md:grid-cols-3">
          {intents.map(intent => (
            <Button
              key={intent}
              {...(intent === 'inverse'
                ? {
                    intent: 'neutral',
                  }
                : {
                    intent: intent === 'error' ? 'danger' : intent,
                  })}
              onClick={() => addSnackbar({ message: "You're done!", intent })}
            >
              {`Display ${intent}${intent === 'neutral' ? ' (default)' : ''} snackbar`}
            </Button>
          ))}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
const handleClick = () => addSnackbar({ message: "You're done!", intent })\n
return (
  <div>
    <Snackbar />
  
    <Button onClick={handleClick}>Display snackbar</Button>
  </div>
)
         `,
      },
    },
  },
}

export const Icon: StoryObj = {
  render: () => {
    return (
      <div>
        <Snackbar />

        <Button
          onClick={() =>
            addSnackbar({
              message: "You're done!",
              icon: <FavoriteFill />,
            })
          }
        >
          Display snackbar
        </Button>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
const handleClick = () => addSnackbar({ message: "You're done!", icon: <FavoriteFill /> })\n
return (
  <div>
    <Snackbar />
  
    <Button onClick={handleClick}>Display snackbar</Button>
  </div>
)
         `,
      },
    },
  },
}

export const Close: StoryObj = {
  render: () => {
    return (
      <div>
        <Snackbar />

        <Button
          onClick={() =>
            addSnackbar({
              message: "You're done!",
              isClosable: true,
              onClose: () => console.log('Snackbar closed!'),
            })
          }
        >
          Display snackbar
        </Button>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
const handleClick = () => addSnackbar({
  message: "You're done!",
  isClosable: true,
  onClose: () => console.log('Snackbar closed!'),
})\n
return (
  <div>
    <Snackbar />
  
    <Button onClick={handleClick}>Display snackbar</Button>
  </div>
)
         `,
      },
    },
  },
}

export const QAWithNewLineAction: StoryFn = _args => (
  <div>
    <Snackbar />

    <div className="gap-xl grid grid-cols-1 md:grid-cols-2">
      <Button
        onClick={() =>
          addSnackbar({
            message:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora voluptatum cupiditate ut natus distinctio illum modi, id mollitia sequi dolorem nostrum autem suscipit eius sapiente vitae ipsum amet doloribus praesentium.',
            actionLabel: 'Undo',
            onAction: () => console.log('Undone'),
            icon: <FavoriteFill />,
            isClosable: true,
            timeout: null,
          })
        }
      >
        Display snackbar
      </Button>

      <Button
        onClick={() =>
          addSnackbar({
            message:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora voluptatum cupiditate ut natus distinctio illum modi, id mollitia sequi dolorem nostrum autem suscipit eius sapiente vitae ipsum amet doloribus praesentium.',
            actionLabel: 'Undo',
            onAction: () => console.log('Undone'),
            icon: <FavoriteFill />,
            isClosable: true,
            actionOnNewline: true,
            timeout: null,
          })
        }
      >
        Display snackbar with action on new line
      </Button>
    </div>
  </div>
)

export const Action: StoryObj = {
  render: () => {
    return (
      <div>
        <Snackbar />

        <div className="gap-xl grid grid-cols-1 md:grid-cols-2">
          <Button
            onClick={() =>
              addSnackbar({
                message:
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora voluptatum cupiditate ut natus distinctio illum.',
                actionLabel: 'Undo',
                onAction: () => console.log('Undone'),
              })
            }
          >
            Display snackbar with action (default)
          </Button>

          <Button
            onClick={() =>
              addSnackbar({
                message:
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora voluptatum cupiditate ut natus distinctio illum.',
                actionLabel: 'Undo',
                onAction: () => console.log('Undone'),
                actionOnNewline: true,
              })
            }
          >
            Display snackbar with action on a new line
          </Button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
const handleClick = () => addSnackbar({
  message: "You're done!",
  actionLabel: 'Undo',
  onAction: () => console.log('Undone'),
  actionOnNewline,
})\n
return (
  <div>
    <Snackbar>
      <Snackbar.Item>
        <Snackbar.ItemClose aria-label="Close" />
      </Snackbar.Item>
    </Snackbar>
  
    <Button onClick={handleClick}>Display snackbar</Button>
  </div>
)
         `,
      },
    },
  },
}

export const AdvancedActionClose: StoryObj = {
  render: () => (
    <div>
      <Snackbar />

      <Button
        onClick={() =>
          addSnackbar({
            message: "You're done!",
            intent: 'success',
            isClosable: true,
          })
        }
      >
        Display snackbar
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
const handleClick = () => addSnackbar({
  message: "You're done!",
  intent: 'success',
})\n
return (
  <div>
    <Snackbar>
      <Snackbar.Item>
        <Snackbar.ItemClose aria-label="Close" />
      </Snackbar.Item>
    </Snackbar>

    <Button onClick={handleClick}>Display snackbar</Button>
  </div>
)
       `,
      },
    },
  },
}
