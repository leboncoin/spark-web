/* eslint-disable max-lines */
import { ShareOutline } from '@spark-ui/icons/ShareOutline'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../button'
import { Icon } from '../icon'
import { Avatar } from '.'

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 64,
  '2xl': 96,
} as const

describe('Avatar', () => {
  it('should render', () => {
    render(
      <Avatar username="John Doe">
        <Avatar.User>
          <Avatar.Placeholder />
          <Avatar.Image src="avatar.png" />
        </Avatar.User>
      </Avatar>
    )

    expect(document.querySelector('[data-spark-component="avatar"]')).toBeInTheDocument()
    expect(screen.getByAltText('John Doe')).toBeInTheDocument()
  })

  describe('Polymorphism', () => {
    it('should render as a link when Avatar.User has render prop with an anchor', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User render={<a href="#" />}>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
        </Avatar>
      )

      const link = screen.getByRole('link', { name: 'John Doe' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '#')
    })

    it('should render as a button when Avatar.User has render prop with a button', async () => {
      const onClick = vi.fn()
      render(
        <Avatar username="John Doe">
          <Avatar.User render={<button type="button" onClick={onClick} />}>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
        </Avatar>
      )

      const button = screen.getByRole('button', { name: 'John Doe' })
      expect(button).toBeInTheDocument()
      await userEvent.click(button)
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Online Badge', () => {
    it('should display online badge when isOnline is true', () => {
      render(
        <Avatar username="John Doe" isOnline onlineText="Online">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
          <Avatar.OnlineBadge />
        </Avatar>
      )

      expect(screen.getByRole('status', { name: 'Online' })).toBeInTheDocument()
    })

    it('should not display online badge when isOnline is false', () => {
      render(
        <Avatar username="John Doe" isOnline={false} onlineText="Online">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
          <Avatar.OnlineBadge />
        </Avatar>
      )

      expect(screen.queryByRole('status', { name: 'Online' })).not.toBeInTheDocument()
    })

    it('should include online status in accessible name when online', () => {
      render(
        <Avatar username="John Doe" isOnline onlineText="Online">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
          <Avatar.OnlineBadge />
        </Avatar>
      )

      expect(screen.getByTitle('John Doe (Online)')).toBeInTheDocument()
    })
  })

  describe('Action', () => {
    it('should render with default action button', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
          <Avatar.Action ariaLabel="Edit account" />
        </Avatar>
      )

      expect(screen.getByRole('button', { name: 'Edit account' })).toBeInTheDocument()
    })

    it('should render with custom action button using render', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
          <Avatar.Action
            ariaLabel="Edit account"
            render={<Button size="sm" intent="info" design="outlined" />}
          >
            Edit
          </Avatar.Action>
        </Avatar>
      )

      expect(screen.getByRole('button', { name: 'Edit account' })).toBeInTheDocument()
    })

    it('should render with custom icon in action button', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
          <Avatar.Action ariaLabel="Share account">
            <Icon>
              <ShareOutline />
            </Icon>
          </Avatar.Action>
        </Avatar>
      )

      expect(screen.getByRole('button', { name: 'Share account' })).toBeInTheDocument()
    })
  })

  describe('Design', () => {
    it('should render with circle shape by default', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
        </Avatar>
      )

      // const userElement = screen.getByRole('img', { name: 'John Doe' }).parentElement
      expect(screen.getByTitle('John Doe')).toHaveClass('default:rounded-full')
    })

    it('should render with square shape when specified', () => {
      render(
        <Avatar username="John Doe" shape="square">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
        </Avatar>
      )

      expect(screen.getByTitle('John Doe')).toHaveClass('default:rounded-md')
    })

    it('should render with all available sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

      sizes.forEach(size => {
        const { container } = render(
          <Avatar username="John Doe" size={size}>
            <Avatar.User>
              <Avatar.Placeholder />
              <Avatar.Image src="avatar.png" />
            </Avatar.User>
          </Avatar>
        )

        const avatarElement = container.firstChild as HTMLElement
        expect(avatarElement).toHaveStyle({
          width: `${sizeMap[size]}px`,
          height: `${sizeMap[size]}px`,
        })
      })
    })
  })

  describe('Placeholder', () => {
    it('should display first letter of username by default', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
          </Avatar.User>
        </Avatar>
      )

      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('should display custom content in placeholder when provided', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder>Custom</Avatar.Placeholder>
          </Avatar.User>
        </Avatar>
      )

      expect(screen.getByText('Custom')).toBeInTheDocument()
    })
  })

  describe('Avatar.Image', () => {
    it('should not render image when src is undefined', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src={undefined} />
          </Avatar.User>
        </Avatar>
      )

      expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument()
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('should not render image when src is null', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src={null as unknown as string} />
          </Avatar.User>
        </Avatar>
      )

      expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument()
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('should hide image when src changes', async () => {
      const TestComponent = () => {
        const [imageSrc, setImageSrc] = useState('avatar1.png')

        return (
          <>
            <button onClick={() => setImageSrc('avatar2.png')}>Change src</button>
            <Avatar username="John Doe">
              <Avatar.User>
                <Avatar.Placeholder />
                <Avatar.Image src={imageSrc} />
              </Avatar.User>
            </Avatar>
          </>
        )
      }

      render(<TestComponent />)

      const image = screen.getByAltText('John Doe') as HTMLImageElement

      // Simulate image load
      await act(async () => {
        image.dispatchEvent(new Event('load', { bubbles: true }))
      })

      await waitFor(() => {
        expect(image).toHaveClass('block')
      })

      // Change src by clicking button
      await userEvent.click(screen.getByRole('button', { name: 'Change src' }))

      // Image should be hidden while loading new src
      await waitFor(() => {
        expect(image).toHaveClass('hidden')
      })
    })

    it('should hide image when image fails to load', async () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="invalid-image.png" />
          </Avatar.User>
        </Avatar>
      )

      const image = screen.getByAltText('John Doe') as HTMLImageElement

      // Simulate image load success first
      await act(async () => {
        image.dispatchEvent(new Event('load', { bubbles: true }))
      })

      await waitFor(() => {
        expect(image).toHaveClass('block')
      })

      // Simulate image error
      await act(async () => {
        image.dispatchEvent(new Event('error', { bubbles: true }))
      })

      // Image should be hidden after error
      await waitFor(() => {
        expect(image).toHaveClass('hidden')
      })
    })

    it('should show image when src is valid and loads successfully', async () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
        </Avatar>
      )

      const image = screen.getByAltText('John Doe') as HTMLImageElement

      // Initially hidden
      expect(image).toHaveClass('hidden')

      // Simulate image load
      await act(async () => {
        image.dispatchEvent(new Event('load', { bubbles: true }))
      })

      // Image should be visible after load
      await waitFor(() => {
        expect(image).toHaveClass('block')
      })
    })

    it('should call user-provided onLoad callback when image loads', async () => {
      const onLoadMock = vi.fn()
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" onLoad={onLoadMock} />
          </Avatar.User>
        </Avatar>
      )

      const image = screen.getByAltText('John Doe') as HTMLImageElement

      await act(async () => {
        image.dispatchEvent(new Event('load', { bubbles: true }))
      })

      await waitFor(() => {
        expect(onLoadMock).toHaveBeenCalledTimes(1)
        expect(image).toHaveClass('block')
      })
    })

    it('should call user-provided onError callback when image fails to load', async () => {
      const onErrorMock = vi.fn()
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="invalid-image.png" onError={onErrorMock} />
          </Avatar.User>
        </Avatar>
      )

      const image = screen.getByAltText('John Doe') as HTMLImageElement

      await act(async () => {
        image.dispatchEvent(new Event('error', { bubbles: true }))
      })

      await waitFor(() => {
        expect(onErrorMock).toHaveBeenCalledTimes(1)
        expect(image).toHaveClass('hidden')
      })
    })
  })
})
