import deepmerge from 'deepmerge'

import NOT_IMPLEMENTED from './utils/not-implemented'
import { appendParams } from './utils/append-params'
import { Client } from './client'

const isClientInstance = client => {
  if (client instanceof Client) {
    return true
  }
  return false
}

const getDefaultOptions = client => {
  switch (client.getRequestType()) {
    case 'json':
      return {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    default:
      throw 'Request type not allowed'
  }
}

const request = (client, method) => {
  const appendToURI = Client.appendToURI.bind(null, client)
  const DEFAULT_OPTIONS = getDefaultOptions(client)
  const HTTP_METHOD = { method }

  return (uri, options = {}) => {
    return fetch(
      appendToURI(!!uri ? uri : ''),
      deepmerge.all([DEFAULT_OPTIONS, client.options.request, options, HTTP_METHOD])
    )
  }
}

export const getHTTPMethods = client => {
  if (!isClientInstance(client)) {
    throw 'Please specify a Client to get the http methods.'
  }

  const clientRequest = request.bind(null, client)

  return {
    post: (uri, data = {}, options = {}) =>
      clientRequest('POST')(uri, deepmerge(options, { body: JSON.stringify(data) })),
    get: (uri, params = {}, options = {}) =>
      clientRequest('GET')(appendParams(uri, params), options),
    upload: NOT_IMPLEMENTED,
    patch: clientRequest('PATCH'),
    put: clientRequest('PUT'),
    delete: clientRequest('DELETE'),
  }
}

export default {
  getHTTPMethods,
}
