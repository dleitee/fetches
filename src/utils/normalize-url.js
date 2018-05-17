import isArray from 'is-array'
import isString from 'is-string'
import normalizeURL from 'normalize-url'

const hasHTTPProtocol = url => isString(url) && url.startsWith('http')

const appendURL = (...pieces) =>
  pieces.reduce((acc, current) => {
    if (isArray(current)) {
      return acc + appendURL.apply(this, current)
    }

    if (hasHTTPProtocol(current)) {
      return current
    }

    return `${acc}/${current}`
  }, '')

export default (...pieces) => (options = {}) => normalizeURL(`${appendURL(pieces)}/`, options)
