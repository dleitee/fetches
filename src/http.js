import { Client } from './client'

const NOT_IMPLEMENTED = () => {
  throw 'This method was not implemented yet'
}

const isClientInstance = client => {
  if (!(client instanceof Client)) {
    throw 'Please specify a Client to get the http methods.'
  }
}

export const getHTTPMethods = client =>
  isClientInstance(client) || {
    post: NOT_IMPLEMENTED,
    get: NOT_IMPLEMENTED,
    upload: NOT_IMPLEMENTED,
    patch: NOT_IMPLEMENTED,
    put: NOT_IMPLEMENTED,
    remove: NOT_IMPLEMENTED,
  }

export default {
  getHTTPMethods,
}
