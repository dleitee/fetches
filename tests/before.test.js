import nock from 'nock'

import { createClient, Client } from '../src/client'
import { getHTTPMethods } from '../src/http'

describe('Before Middleware', () => {
  afterAll(() => {
    nock.cleanAll()
  })

  const uri = ['http://example.com', 'api', '/v1/']
  const data = { name: 'Joaquim ' }
  const options = { opt: 'option' }

  test('each before middleware should receive three args: next, cancel and requestData', () => {
    const beforeFunc = (next, cancel, requestData) => {
      expect(next).toBeInstanceOf(Function)
      expect(next).toBeDefined()
      expect(cancel).toBeInstanceOf(Function)
      expect(cancel).toBeDefined()
      expect(requestData).toBeInstanceOf(Object)
      expect(requestData).toBeDefined()
      expect(requestData.method).toBe('POST')
      expect(requestData.options.opt).toBe(options.opt)
      expect(requestData.options.body).toBe(JSON.stringify(data))
      expect(requestData.options.headers.Authorization).toBe('Token a')
      expect(requestData.uri).toBe('http://example.com/api/v1/test/')
    }
    const client = createClient(uri, {
      before: [beforeFunc],
      request: {
        headers: {
          Authorization: 'Token a',
        },
      },
    })
    const http = getHTTPMethods(client)
    http.post('test', data, options)
  })

  test('the arguments of the next() should be forwarded to the next before middleware through the requestData argument', () => {
    const beforeFuncOne = (next, cancel, requestData) => {
      expect(requestData.options.opt).toBe(options.opt)
      next({
        options: {
          opt: 'OPTION',
        },
      })
    }
    const beforeFuncTwo = (next, cancel, requestData) => {
      expect(requestData.options.opt).toBe(options.opt.toUpperCase())
      next()
    }
    const client = createClient(uri, {
      before: [beforeFuncOne, beforeFuncTwo],
      request: {
        headers: {
          Authorization: 'Token a',
        },
      },
    })
    const http = getHTTPMethods(client)
    http.post('test', data, options)
  })

  test("the arguments of the next() should always be forwarded until the fetch's call", async () => {
    nock('http://example.com/api/v1/test/')
      .post('/')
      .reply(200, function reply() {
        expect(this.req.headers.authorization[0]).toBe('Token b')
        return {}
      })
    const beforeFuncOne = next => {
      next({
        options: {
          headers: {
            Authorization: 'Token b',
          },
        },
      })
    }

    const beforeFuncTwo = next => next()

    const client = createClient(uri, {
      before: [beforeFuncOne, beforeFuncTwo],
      request: {
        headers: {
          Authorization: 'Token a',
        },
      },
    })
    const http = getHTTPMethods(client)
    await http.post('test', data, options)
  })
})
