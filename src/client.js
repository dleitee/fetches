import deepmerge from 'deepmerge'

import normalizeURL from './utils/normalize-url'

const DEFAULT_OPTIONS = {
  uri: {
    removeTrailingSlash: false,
  },
}

export class Client {
  constructor(uri, options = {}) {
    this.options = deepmerge(DEFAULT_OPTIONS, options)
    this.uri = normalizeURL(uri)(this.options.uri)
  }

  getURI() {
    return this.uri
  }
}

export const createClient = (uri, options) => {
  return new Client(uri, options)
}

export default {
  createClient,
}
