import { pathThatSvg } from 'path-that-svg'

const optimize = async svgString => {
  return await pathThatSvg(svgString)
}

export default optimize
