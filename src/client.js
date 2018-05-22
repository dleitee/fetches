import deepmerge from 'deepmerge'

import NOT_IMPLEMENTED from './utils/not-implemented'
import normalizeURL from './utils/normalize-url'

const DEFAULT_OPTIONS = {
  requestType: 'json',
  request: {},
  uri: {
    removeTrailingSlash: false,
  },
}

export class Client {
  constructor(uri, options = {}) {
    this.options = deepmerge(DEFAULT_OPTIONS, options)
    this.uri = normalizeURL(uri)(this.options.uri)

    if (this.options.requestType !== DEFAULT_OPTIONS.requestType) {
      NOT_IMPLEMENTED()
    }
    this.requestType = this.options.requestType
  }

  getURI() {
    return this.uri
  }

  static appendToURI(client, uri = '') {
    return normalizeURL([client.getURI(), uri])(client.options.uri)
  }

  getRequestType() {
    return this.requestType
  }
}

export const createClient = (uri, options) => {
  return new Client(uri, options)
}

export default {
  createClient,
}
