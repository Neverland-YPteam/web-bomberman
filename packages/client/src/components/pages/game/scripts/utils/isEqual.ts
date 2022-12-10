import { type TPlainObject, isPlainObject } from './isPlainObject'

const isArrayOrObject = (value: unknown): value is [] | TPlainObject => {
  return isPlainObject(value) || Array.isArray(value)
}

export const isEqual = (lhs: TPlainObject, rhs: TPlainObject) => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key]

    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue
      }

      return false
    }

    if (value !== rightValue) {
      return false
    }
  }

  return true
}
