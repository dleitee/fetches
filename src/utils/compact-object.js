const isUndefined = value => typeof value === 'undefined'

export default raw => raw && Object.keys(raw)
  .filter(key => !isUndefined(raw[key]))
  .reduce((obj, key) => ({
    ...obj,
    [key]: raw[key],
  }), {})
