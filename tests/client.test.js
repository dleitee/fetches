import { createClient, Client } from '../src/client'

describe('Client Module', () => {
  test('client module must have the method createClient', () => {
    expect(createClient).toBeDefined()
  })
  test('createClient should return a Client object', () => {
    const uri = 'http://example.com/api/v1/'
    expect(createClient(uri)).toBeInstanceOf(Client)
  })
  test('The first param of createClient should be an URI', () => {
    const uri = 'http://example.com/api/v1/'
    const client = createClient(uri)
    expect(client.getURI()).toBe(uri)
  })
  test('The URI should be normalized by default', () => {
    const uri = 'http://example.com/api/v1'
    const normalizedURI = 'http://example.com/api/v1/'
    const client = createClient(uri)
    expect(client.getURI()).toBe(normalizedURI)
  })
  test('The URI can be an array as well', () => {
    const uri = ['http://example.com', 'api', '/v1/']
    const normalizedURI = 'http://example.com/api/v1/'
    const client = createClient(uri)
    expect(client.getURI()).toBe(normalizedURI)
  })
  test('The uri options are the same options of normalize-url module', () => {
    const uri = 'http://example.com/api/v1/#index'
    const normalizedURI = 'http://example.com/api/v1/#index'
    const options = {
      uri: {
        stripFragment: false,
        removeTrailingSlash: true,
      },
    }
    const client = createClient(uri, options)
    expect(client.getURI()).toBe(normalizedURI)
  })
  test('The appendAfterMiddleware should append a middleware at the end of middleware list and return a new client', () => {
    const uri = 'http://example.com/api/v1/#index'
    const mid1 = () => 1
    const mid2 = () => 2
    const client = createClient(uri, {
      after: [mid1],
    })
    expect(client.after()).toContain(mid1)
    const newClient = client.appendAfterMiddleware(mid2)
    expect(client.after()).not.toContain(mid2)
    expect(newClient.after()[0]).toBe(mid1)
    expect(newClient.after()[1]).toBe(mid2)
  })
  test('The appendBeforeMiddleware should append a middleware at the end of middleware list and return a new client', () => {
    const uri = 'http://example.com/api/v1/#index'
    const mid1 = () => 1
    const mid2 = () => 2
    const client = createClient(uri, {
      before: [mid1],
    })
    expect(client.before()).toContain(mid1)
    const newClient = client.appendBeforeMiddleware(mid2)
    expect(client.before()).not.toContain(mid2)
    expect(newClient.before()[0]).toBe(mid1)
    expect(newClient.before()[1]).toBe(mid2)
  })
})
