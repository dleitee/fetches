import client, { createClient, Client } from '../src/client'

describe('Client Module', () => {
  test('client module must have the method createClient', () => {
    expect(client.createClient).toBeDefined()
    expect(createClient).toBeDefined()
  })
  test('createClient should return a Client object', () => {
    expect(createClient()).toBeInstanceOf(Client)
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
    console.log(client.getURI())
    expect(client.getURI()).toBe(normalizedURI)
  })
})
