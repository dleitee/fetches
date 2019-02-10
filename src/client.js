import deepmerge from 'deepmerge'

import NOT_IMPLEMENTED from './utils/not-implemented'
import normalizeURL from './utils/normalize-url'
import { isMergeableObject } from './utils/is-mergeable'

const DEFAULT_OPTIONS = {
  requestType: 'json',
  request: {},
  uri: {
    removeTrailingSlash: false,
  },
  before: [],
  after: [],
}

export class Client {
  constructor(uri, options = {}) {
    this.options = deepmerge(DEFAULT_OPTIONS, options, {
      isMergeableObject,
    })
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

  before() {
    return this.options.before
  }

  after() {
    return this.options.after
  }

  appendBeforeMiddleware(middleware) {
    const options = deepmerge(
      this.options,
      {
        before: [...this.options.before, middleware],
      },
      {
        isMergeableObject,
      }
    )
    return new Client(this.getURI(), options)
  }

  appendAfterMiddleware(middleware) {
    const options = deepmerge(
      this.options,
      {
        after: [...this.options.after, middleware],
      },
      {
        isMergeableObject,
      }
    )
    return new Client(this.getURI(), options)
  }
}

export const createClient = (uri, options) => new Client(uri, options)

export default {
  createClient,
}
