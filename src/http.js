import deepmerge from 'deepmerge'

import { appendParams } from './utils/append-params'
import { Client } from './client'

const getDefaultOptions = client => {
  switch (client.getRequestType()) {
    case 'json':
      return {
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      }
    default:
      throw new Error('Request type not allowed')
  }
}

const nextFunction = (resolve, requestData) => (newRequestData = requestData) =>
  resolve(newRequestData)

const executeBeforeMiddleware = (client, requestData) =>
  client.before().reduce(
    (previous, current) =>
      previous.then(
        (response = {}) =>
          new Promise((resolve, reject) => {
            const mergedData = deepmerge.all([requestData, response])
            current(nextFunction(resolve, mergedData), reject, mergedData)
          })
      ),
    Promise.resolve(requestData)
  )

const executeAfterMiddleware = (client, requestData) =>
  client
    .after()
    .reduce(
      (previous, current) => previous.then(response => current(response, requestData)),
      fetch(requestData.uri, requestData.options)
    )

const request = (client, method) => {
  const appendToURI = Client.appendToURI.bind(null, client)
  const DEFAULT_OPTIONS = getDefaultOptions(client)
  const HTTP_METHOD = { method }

  return async (uri, options = {}) => {
    const finalURI = appendToURI(uri || '')
    const { signal } = options
    const finalOptions = deepmerge.all([
      DEFAULT_OPTIONS,
      client.options.request,
      options,
      HTTP_METHOD,
    ])
    if (method === 'UPLOAD') {
      finalOptions.method = 'POST'
      finalOptions.headers['content-type'] = undefined
    }
    if (signal) {
      finalOptions.signal = signal
    }
    let updatedRequestData = null
    try {
      updatedRequestData = await executeBeforeMiddleware(client, {
        method,
        options: finalOptions,
        uri: finalURI,
      })
    } catch (e) {
      return Promise.reject(e)
    }
    return executeAfterMiddleware(client, updatedRequestData)
  }
}

export const getHTTPMethods = client => {
  const clientRequest = request.bind(null, client)

  return {
    post: (uri, data = {}, options = {}) =>
      clientRequest('POST')(uri, deepmerge(options, { body: JSON.stringify(data) })),
    get: (uri, params = {}, options = {}) =>
      clientRequest('GET')(appendParams(uri, params), options),
    patch: (uri, data = {}, options = {}) =>
      clientRequest('PATCH')(uri, deepmerge(options, { body: JSON.stringify(data) })),
    upload: (uri, data = {}, options = {}) =>
      clientRequest('UPLOAD')(uri, deepmerge(options, { body: data })),
    put: (uri, data = {}, options = {}) =>
      clientRequest('PUT')(uri, deepmerge(options, { body: JSON.stringify(data) })),
    delete: (uri, data = {}, options = {}) =>
      clientRequest('DELETE')(uri, deepmerge(options, { body: JSON.stringify(data) })),
  }
}

export default {
  getHTTPMethods,
}
