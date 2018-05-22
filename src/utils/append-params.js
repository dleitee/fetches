import normalizeURL from 'normalize-url'

import compactObject from './compact-object'
import buildQueryString from './build-query-string'

const appendParams = (url, cleanParams) => {
  if (cleanParams && Object.keys(cleanParams).length) {
    return `${url}?${buildQueryString(cleanParams)}`
  }
  return url
}

export default (url, params, options) =>
  normalizeURL(appendParams(url, compactObject(params)), options)
