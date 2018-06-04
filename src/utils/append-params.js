import compactObject from './compact-object'
import buildQueryString from './build-query-string'

export const appendParams = (url = '', params = {}) => {
  const cleanParams = compactObject(params)
  if (cleanParams && Object.keys(cleanParams).length) {
    return `${url || ''}?${buildQueryString(cleanParams)}`
  }
  return url || ''
}

export default appendParams
