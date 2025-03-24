import fs from 'fs'
import path from 'path'

const matchFileRoutes = (base = process.cwd(), pattern, accumulator) => {
  const files = fs.readdirSync(base)
  let result = accumulator || []

  // Convert glob pattern to regex
  const regexPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/\?/g, '.')

  const regex = new RegExp(`^${regexPattern}$`)

  files.forEach(function (file) {
    const newBase = path.join(base, file)
    if (fs.statSync(newBase).isDirectory()) {
      result = matchFileRoutes(newBase, pattern, result)
    } else {
      const relativePath = newBase.replace(`${process.cwd()}/`, '')
      if (regex.test(relativePath)) {
        result.push(newBase)
      }
    }
  })

  return result
}

export default matchFileRoutes
