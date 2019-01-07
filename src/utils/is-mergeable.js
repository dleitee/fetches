import isPlainObject from 'is-plain-object'

import { isFormData } from './is-form-data'

export const isMergeableObject = param => {
  if (isFormData(param)) {
    return false
  }
  return isPlainObject(param)
}
