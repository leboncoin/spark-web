export function sliceArrayWithIndex(arr: any[], index: number, length: number) {
  const relativeElements = (length - 1) / 2

  let start = Math.max(0, index - relativeElements)
  let end = Math.min(arr.length, index + relativeElements + 1)

  if (end - start < length) {
    start = Math.max(0, Math.min(start, arr.length - length))
    end = Math.min(arr.length, start + length)
  }

  return arr.slice(start, end)
}
