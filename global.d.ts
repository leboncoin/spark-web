/// <reference types="@testing-library/jest-dom" />

type ExcludeNull<T> = {
  [K in keyof T]: Exclude<T[K], null>
}
