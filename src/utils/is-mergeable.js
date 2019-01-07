import isPlainObject from 'is-plain-object'

export const isMergeableObject = param => {
  if (param.constructor.name === 'FormData') {
    return false
  }
  return isPlainObject(param)
}
