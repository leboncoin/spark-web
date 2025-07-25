/// <reference types="@testing-library/jest-dom" />

type ExcludeNull<T> = {
  [K in keyof T]: Exclude<T[K], null>
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}
