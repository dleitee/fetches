import isPlainObject from 'is-plain-object'

export const isMergeableObject = param => {
  if (param instanceof FormData) {
    return false
  }
  return isPlainObject(param)
}
