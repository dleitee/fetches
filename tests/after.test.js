import nock from 'nock'

import { createClient } from '../src/client'
import { getHTTPMethods } from '../src/http'

describe('After Middleware', () => {
  afterAll(() => {
    nock.cleanAll()
  })

  const uri = ['http://example.com', 'api', '/v1/']
  const data = { name: 'Joaquim ' }
  const options = { opt: 'option' }

  test('each after middleware should receive three args: response and requestData', () => {
    const afterFunc = (response, requestData) => {
      expect(requestData).toBeInstanceOf(Object)
      expect(requestData).toBeDefined()
      expect(requestData.method).toBe('POST')
      expect(requestData.options.opt).toBe(options.opt)
      expect(requestData.options.body).toBe(JSON.stringify(data))
      expect(requestData.options.headers.Authorization).toBe('Token a')
      expect(requestData.uri).toBe('http://example.com/api/v1/test/')
      expect(response).toBeDefined()
    }
    const client = createClient(uri, {
      after: [afterFunc],
      request: {
        headers: {
          Authorization: 'Token a',
        },
      },
    })
    const http = getHTTPMethods(client)
    http.post('test', data, options)
  })

  test('the after middlewares should return a Promise', async () => {
    nock('http://example.com/api/v1/test/')
      .post('/')
      .reply(200, () => ({
        name: 'Joaquim',
      }))
    const afterFunc = response => response.json()

    const client = createClient(uri, {
      after: [afterFunc],
      request: {
        headers: {
          Authorization: 'Token a',
        },
      },
    })
    const http = getHTTPMethods(client)
    const response = await http.post('test', data, options)
    expect(response.name).toBe('Joaquim')
  })

  test('the middleware should be able to run multiple functions', async () => {
    nock('http://example.com/api/v1/test/')
      .post('/')
      .reply(200, () => ({
        name: 'Joaquim',
      }))
    const afterFunc = response => response.json()

    const delayFunc = response =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(response)
        }, 500)
      })

    const client = createClient(uri, {
      after: [delayFunc, afterFunc],
      request: {
        headers: {
          Authorization: 'Token a',
        },
      },
    })
    const http = getHTTPMethods(client)
    const response = await http.post('test', data, options)
    expect(response.name).toBe('Joaquim')
  })

  test('the middleware should be able to reject a request and consequently cancel the next middlewares', async () => {
    nock('http://example.com/api/v1/test/')
      .post('/')
      .reply(200, () => ({
        name: 'Joaquim',
      }))

    const fn = jest.fn()
    const afterFunc = response => {
      fn()
      return response.json()
    }

    const delayFunc = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Error'))
        }, 500)
      })

    const client = createClient(uri, {
      after: [delayFunc, afterFunc],
      request: {
        headers: {
          Authorization: 'Token a',
        },
      },
    })
    const http = getHTTPMethods(client)
    try {
      await http.post('test', data, options)
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
    expect(fn).toHaveBeenCalledTimes(0)
  })
})
