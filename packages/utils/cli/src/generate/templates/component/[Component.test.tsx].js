import { pascalCase } from 'pascal-case'

export default ({ name }) => {
  const componentName = pascalCase(name)

  return `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ${componentName} } from './${componentName}'

describe('${componentName}', () => {
  it('should render', () => {
    render(<${componentName}>Hello World!</${componentName}>)

    expect(screen.getByText('Hello World!')).toBeInTheDocument()
  })

  it('should trigger click event', async () => {
    const user = userEvent.setup()
    const clickEvent = vi.fn()

    // Given
    render(<div onClick={clickEvent}>Hello World!</div>)

    // When
    await user.click(screen.getByText('Hello World!'))

    // Then
    expect(clickEvent).toHaveBeenCalledTimes(1)
  })
})
`
}
