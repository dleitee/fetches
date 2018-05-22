import deepmerge from 'deepmerge'

import NOT_IMPLEMENTED from './utils/not-implemented'
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
  const appendToURI = Client.appendToURI.bind(this, client)
  const DEFAULT_OPTIONS = getDefaultOptions(client)

  return (uri, options = {}) => {
    return fetch(appendToURI(uri), deepmerge(DEFAULT_OPTIONS, client.options.request, options))
  }
}

export const getHTTPMethods = client => {
  if (!isClientInstance(client)) {
    throw 'Please specify a Client to get the http methods.'
  }

  const clientRequest = request.bind(this, client)

  return {
    post: clientRequest('POST'),
    get: clientRequest('GET'),
    upload: NOT_IMPLEMENTED,
    patch: clientRequest('PATCH'),
    put: clientRequest('PUT'),
    delete: clientRequest('DELETE'),
  }
}

export default {
  getHTTPMethods,
}
