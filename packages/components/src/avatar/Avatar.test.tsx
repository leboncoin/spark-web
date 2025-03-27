import { ShareOutline } from '@spark-ui/icons/ShareOutline'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    expect(screen.getByRole('img', { name: 'John Doe' })).toBeInTheDocument()
  })

  describe('Polymorphism', () => {
    it('should render as a link when Avatar.User has asChild prop with an anchor', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User asChild>
            <a href="#">
              <Avatar.Placeholder />
              <Avatar.Image src="avatar.png" />
            </a>
          </Avatar.User>
        </Avatar>
      )

      const link = screen.getByRole('link', { name: 'John Doe' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '#')
    })

    it('should render as a button when Avatar.User has asChild prop with a button', async () => {
      const onClick = vi.fn()
      render(
        <Avatar username="John Doe">
          <Avatar.User asChild>
            <button type="button" onClick={onClick}>
              <Avatar.Placeholder />
              <Avatar.Image src="avatar.png" />
            </button>
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

      expect(screen.getByRole('img', { name: 'John Doe (Online)' })).toBeInTheDocument()
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

    it('should render with custom action button using asChild', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
          <Avatar.Action ariaLabel="Edit account" asChild>
            <Button size="sm" intent="info" design="outlined">
              Edit
            </Button>
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
    it('should render with circle design by default', () => {
      render(
        <Avatar username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
        </Avatar>
      )

      const userElement = screen.getByRole('img', { name: 'John Doe' }).parentElement
      expect(userElement).toHaveClass('default:rounded-full')
    })

    it('should render with square design when specified', () => {
      render(
        <Avatar username="John Doe" design="square">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src="avatar.png" />
          </Avatar.User>
        </Avatar>
      )

      const userElement = screen.getByRole('img', { name: 'John Doe' }).parentElement
      expect(userElement).toHaveClass('default:rounded-md')
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
})
