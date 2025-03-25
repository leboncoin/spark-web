import { camelCase } from 'camel-case'

export default ({ name }) => {
  const hookName = camelCase(name)

  return `import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ${hookName} } from './${hookName}'

describe('${hookName}', () => {
  it('should be defined', () => {
    expect(${hookName}).toBeDefined()
  })
})
`
}
