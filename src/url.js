import isArray from 'is-array'
import isString from 'is-string'

const replaceUrlWithVars = (url, variables = {}) => {
  const regexVariables = /:[-|_|\w]+/g
  const arrayVariables = url.match(regexVariables) || []
  return arrayVariables.reduce((previous, current) => {
    const value = variables[current.replace(':', '')] || current
    return previous.replace(current, value)
  }, url)
}

const joinPathArray = paths => paths.join('/')

export const createUrl = (paths, variables) => {
  if (isString(paths)) {
    return replaceUrlWithVars(paths, variables)
  }
  if (isArray(paths)) {
    return replaceUrlWithVars(joinPathArray(paths), variables)
  }
}

export default {
  createUrl,
}
